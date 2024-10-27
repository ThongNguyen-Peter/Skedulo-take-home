export type Item = {
  startPx: number,
  endPx: number,
}

export const solution = (arr: Item[]) => {
  arr.sort((a, b) => a.startPx - b.startPx);

  const response: Item[] = []

  for(const item of arr) {
    if (response.length === 0 || response[response.length - 1].endPx < item.startPx) {
      
      response.push(item)
    } else {

      const maxEndPx = Math.max(response[response.length -1].endPx, item.endPx)
      response[response.length -1].endPx = maxEndPx
    }
  }

  return response
}

