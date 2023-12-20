import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  //This line uses lodash's chaining feature.
  //It starts a lodash chain with the array of items.
  return _(items).slice(startIndex).take(pageSize).value();
}
