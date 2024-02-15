export async function asyncMap<I, O>(
  array: I[],
  callbackfn: (item: I, index: number) => O | Promise<O>,
): Promise<O[]> {
  const result: O[] = [];

  for await (const [index, item] of array.entries()) {
    result.push(await callbackfn(item, index));
  }

  return result;
}
