import _cloneDeep from 'lodash/cloneDeep'

export const orderFieldSet = (schema) => {
  if (schema.type === 'object' && Array.isArray(schema.order)) {
    const cloneProperties = _cloneDeep(schema.properties)

    // 没有排序的 schema 放在排序的后面
    const temp = Object.keys(cloneProperties).filter(key => {
      if (schema.order.every(item => key !== item)) {
        console.warn(`order 没有配置 ${key}，请检查配置`)
        return true
      }
      return false
    })
    const newOrder = schema.order.concat(temp)

    schema.properties = {}
    newOrder.forEach(key => {
      if (key && cloneProperties[key]) {
        schema.properties[key] = cloneProperties[key]
      } else {
        console.warn(`properties 中没有 key 为『${key}』的属性`)
      }
    })
  }
}
