import createDebugger from "debug";
import { FilterQuery } from "mongodb";
import { Agenda } from ".";
const debug = createDebugger("agenda:enable");

/**
 * Enables any jobs matching the passed MongoDB query by setting the `disabled` flag to `false`
 * @name Agenda#enable
 * @function
 * @param query MongoDB query to use when enabling
 * @caller client code, Agenda.purge(), Job.remove()
 * @returns {Promise<Number>} A promise that contains the number of removed documents when fulfilled.
 */
export const enable = async function (
  this: Agenda,
  query: FilterQuery<unknown> = {}
): Promise<number> {
  debug("attempting to enable all jobs matching query", query);
  try {
    const { result } = await this._collection.updateMany(query, {
      $set: { disabled: false },
    });
    debug("%s jobs enabled", result.n);
    return result.n;
  } catch (error) {
    debug("error trying to mark jobs as `enabled`");
    throw error;
  }
};
