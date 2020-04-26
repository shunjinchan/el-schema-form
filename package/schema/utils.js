import _isPlainObject from 'lodash/isPlainObject'
import _get from 'lodash/get'
import _cloneDeep from 'lodash/cloneDeep'

export const getSchema = (schema, model) => {
  if (schema.type === 'array') {
    return getArraySchema(schema, model)
  } else if (schema.type === 'object') {
    return getObjectSchema(schema)
  }
  return null
}

export const getObjectSchema = schema => {
  let objectSchema = null

  if (_isPlainObject(schema.properties)) {
    objectSchema = schema.properties
  } else {
    throw new Error('properties must be object')
  }

  return objectSchema
}

export const getArraySchema = (schema, model) => {
  let arraySchema = null

  if (_isPlainObject(schema.items)) {
    // 当items为对象时，items就是additionalItems
    const val = _get(model, schema.prop)
    schema.additionalItems = _cloneDeep(schema.items)
    schema.items = val.map(() => _cloneDeep(schema.additionalItems))
    arraySchema = schema.items
  } else if (Array.isArray(schema.items)) {
    // 有 additionalItems，需特殊处理
    // 如果 model 中有值，没有配置对应的 ui schema，则使用 additionalItems
    if (_isPlainObject(schema.additionalItems)) {
      const val = _get(model, schema.prop)
      val.forEach((val, index) => {
        if (!schema.items[index]) {
          schema.items[index] = _cloneDeep(schema.additionalItems)
        }
      })
      arraySchema = schema.items
    } else {
      arraySchema = schema.items
    }
  } else {
    throw new Error('items must be object or array')
  }

  return arraySchema
}

/**
 * @param {string} type schema 配置中的type属性值
 * @returns {boolean}
 */
export const isFieldset = type => {
  return ['array', 'object'].some(item => item === type)
}

/**
 * 处理表单模式，表单与控件组拥有两种模式，禁用与只读，不可同时为 true
 * @param {{}} schema
 * @param {{}} formItem
 */
export const cookMode = (schema, formItem) => {
  if (schema.disabled === true && schema.readOnly === true) {
    throw new Error('disabled 与 readOnly 不可同时为 true')
  }

  if (schema.disabled === true) {
    if (formItem.component) {
      formItem.field.disabled = true
    }
    if (isFieldset(formItem.type)) {
      formItem.disabled = true
    }
  }

  if (schema.readOnly === true) {
    if (formItem.component) {
      formItem.field.readOnly = true
    }
    if (isFieldset(formItem.type)) {
      formItem.readOnly = true
    }
  }
}

/**
 * 计算出 schema 对应的 prop 值，对应 model 中属性的访问路径
 * @param {{}} schema
 * @param {string} key 数组索引或对象属性key
 * @param {string} acc 累加值
 */
export const calculateProp = (schema, key, acc) => {
  let prop = ''
  if (schema.type === 'object') {
    prop = acc + (acc ? `.${key}` : key)
  } else if (schema.type === 'array') {
    prop = acc + `[${key}]`
  }
  return prop
}
