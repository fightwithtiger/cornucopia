export function flatten(data: any) {
  const result: any = []
  function flattenHelper(arr: any) {
    arr.forEach((item: any) => {
      if (Array.isArray(item)) {
        flattenHelper(item)
      } else {
        result.push(item)
      }
    })
  }

  flattenHelper(data)

  return result
}
