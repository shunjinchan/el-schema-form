export const hasDuplicates = array => {
  return array.some((elt, index) => {
    return array.indexOf(elt) !== index
  })
}
