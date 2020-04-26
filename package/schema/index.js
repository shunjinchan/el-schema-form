import _get from 'lodash/get'
import _each from 'lodash/each'
import _cloneDeep from 'lodash/cloneDeep'
import _isPlainObject from 'lodash/isPlainObject'
import { getSchema, isFieldset, cookMode, calculateProp } from './utils.js'
import { orderFieldSet } from './fieldset.js'
import { cookLabel, cookField, setDefaultComponent } from './form-item.js'

/**
 * @param {{}} schema
 * @param {{}} model
 * @returns {{}}
 */
export const generateFormSchemaUsingSchema = (schema, model, disabled) => {
  const cloneSchema = {
    'ui-version': 1,
    ..._cloneDeep(schema),
    disabled
  }

  const cookSchema = (schema, acc) => {
    // 为 object 的 properties 排序
    orderFieldSet(schema)

    let tempSchema = getSchema(schema, model)
    _each(tempSchema, (formItem, key) => {
      if (!formItem) return

      // form item 是动态组件，动态组件不需要做处理，全部交由使用者自行处理
      if (typeof formItem.render === 'function') return

      // 更新 form item 配置的 prop 值，便于更新 model
      const prop = calculateProp(schema, key, acc)
      formItem.prop = prop

      // 检验 model 里的配置是否齐全，当某个 schema 没有找到 model 中对应的配置时，删除该 schema
      if (typeof _get(model, formItem.prop) === 'undefined') {
        delete tempSchema[key]
        console.error(`model.${formItem.prop} cannot be undefined`)
        return
      }

      // 不是控件组，就默认认为是 form item
      if (!isFieldset(formItem.type)) {
        // 如果不是控件组，且 component 没有声明，则默认为 input
        if (typeof formItem.component === 'undefined') {
          setDefaultComponent(formItem)
        }
        cookField(formItem)
        cookLabel(formItem)
      }

      cookMode(schema, formItem)

      if (isFieldset(formItem.type)) {
        cookSchema(formItem, formItem.prop) // 处理多级嵌套
      }
    })
  }

  if (cloneSchema['ui-version'] >= 2) {
    if (
      cloneSchema.type !== 'object' ||
      !_isPlainObject(cloneSchema.properties)
    ) {
      throw new Error(
        "schema prime attributes type must be 'object', and properties must be object"
      )
    }
  }

  cookSchema(cloneSchema, '')

  return cloneSchema
}
