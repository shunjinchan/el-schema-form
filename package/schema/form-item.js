export const cookLabel = (formItem) => {
  // title 是 JSON Schema 规范的属性
  // 对应到 form item 的 label
  // label 优先
  if (
    typeof formItem.title !== 'undefined' &&
    typeof formItem.label === 'undefined'
  ) {
    formItem.label = formItem.title
    delete formItem.title
  }
}

export const cookField = (formItem) => {
  formItem.field = { ...formItem.field }
}

export const setDefaultComponent = (formItem) => {
  formItem.component = 'input'
}
