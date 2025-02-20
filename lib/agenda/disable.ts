import createDebugger from "debug";
import { FilterQuery } from "mongodb";
import { Agenda } from ".";
const debug = createDebugger("agenda:disable");

/**
 * Disables any jobs matching the passed MongoDB query by setting the `disabled` flag to `true`
 * @name Agenda#disable
 * @function
 * @param query MongoDB query to use when enabling
 * @returns {Promise<number>} Resolved with the number of disabled job instances.
 */
export const disable = async function (
  this: Agenda,
  query: FilterQuery<unknown> = {}
): Promise<number> {
  debug("attempting to disable all jobs matching query", query);
  try {
    const { result } = await this._collection.updateMany(query, {
      $set: { disabled: true },
    });
    debug("%s jobs disabled", result.n);
    return result.n;
  } catch (error) {
    debug("error trying to mark jobs as `disabled`");
    throw error;
  }
};
