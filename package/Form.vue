<template>
  <div class="el-schema-form">
    <el-form
      v-if="formSchema"
      ref="form"
      :model="model"
      v-bind="innerConfig"
      :disabled="formDisabled"
      @validate="_handleValidate"
    >
      <template v-for="(rowItem, rowIndex) in innerLayout">
        <div class="el-schema-form-row" :key="rowIndex">
          <h3 v-if="rowItem.title" class="el-schema-form-row-title">
            {{ rowItem.title }}
          </h3>
          <el-row v-bind="{ gutter: 0, ...rowItem.rowAttrs }">
            <el-col
              v-for="(colItem, colIndex) in rowItem.col"
              :key="colIndex"
              v-bind="{ span: 24, ...colItem.colAttrs }"
            >
              <h4 v-if="colItem.title" class="el-schema-form-col-title">
                {{ colItem.title }}
              </h4>
              <template v-if="_colHasFields(colItem)">
                <el-schema-form-item
                  :schema="_filterFields(colItem.fields)"
                  :model="model"
                  :form-config="innerConfig"
                  @move-up="_handleMoveUp"
                  @move-down="_handleMoveDown"
                  @add-field="_handleAddField"
                  @remove-field="_handleRemoveField"
                  @update-field="val => $emit('change', val)"
                >
                </el-schema-form-item>
              </template>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-form>

    <slot></slot>
    <div class="el-schema-form-ft" v-if="submitButton || cancelButton">
      <el-button
        v-if="cancelButton"
        v-bind="innerCancelButton"
        @click="$emit('cancel')"
      >
        {{ innerCancelButton.text }}
      </el-button>
      <el-button
        v-if="submitButton"
        v-bind="innerSubmitButton"
        @click="_submit"
      >
        {{ innerSubmitButton.text }}
      </el-button>
      <!-- <el-button
        v-if="resetButton"
        v-bind="innerResetButton"
        @click="
          () => {
            _reset();
            $emit('reset');
          }
        "
      >
        {{ innerResetButton.text }}
      </el-button> -->
    </div>
  </div>
</template>

<script>
import _each from 'lodash/each'
import _cloneDeep from 'lodash/cloneDeep'
import _isPlainObject from 'lodash/isPlainObject'
import { hasDuplicates } from './utils.js'
import { generateFormSchemaUsingSchema } from './schema/index.js'
import { isFieldset } from './schema/utils.js'
import validator from './validator/index.js'
import ElSchemaFormItem from './Item.vue'

export default {
  name: 'el-schema-form',

  provide () {
    return {
      autoUpdate: this.autoUpdate
    }
  },

  components: {
    ElSchemaFormItem
  },

  props: {
    /**
     * 表单配置
     */
    config: {
      type: Object,
      default: () => null
    },

    /**
     * 表单值
     */
    model: {
      type: Object,
      required: true
    },

    /**
     * ui 配置模式
     */
    schema: {
      type: [Object],
      required: true,
      validator (value) {
        if (value.type === 'object' && _isPlainObject(value.properties)) {
          return true
        }
        return false
      }
    },

    /**
     * 表单布局
     */
    layout: {
      type: Array,
      default: () => []
    },

    /**
     * 是否自动更新 model，默认为 true
     * 当 model 是计算属性时，需要自己监听组件的 change 事件更新 model
     */
    autoUpdate: {
      type: Boolean,
      default: true
    },

    submitButton: {
      type: [Object, Boolean]
    },

    cancelButton: {
      type: [Object, Boolean]
    }
  },

  data () {
    return {
      formSchema: null,
      resetButton: false
    }
  },

  computed: {
    innerConfig () {
      return {
        size: this.$ELEMENT.size,
        ...this.config,
        disabled: this.formDisabled
      }
    },

    formDisabled () {
      if (this.config && typeof this.config.disabled === 'boolean') {
        return this.config.disabled
      }
      if (this.schema && typeof this.schema.disabled === 'boolean') {
        return this.schema.disabled
      }
      return false
    },

    /**
     * 如果需要配置布局，row 与 col 都是必不可少的，row 中配置的 fields 是没作用的，必须配置到 col.fields  中
     * 布局只针对model的一级属性生效，如有更深层级的属性将会随着一级属性变化
     */
    innerLayout () {
      if (!this.layout || this.layout.length === 0) {
        const fields = []

        _each(this.formSchema.properties, (value, key) =>
          fields.push(value.prop)
        )

        return [
          // row config
          // 默认只有一行
          {
            // title: '',
            // rowAttrs: {},
            // col config
            // 默认只有一列，且当前列拥有所有的表单项
            col: [
              {
                // title: '',
                colAttrs: {
                  span: 24
                },
                fields: fields
              }
            ]
          }
        ]
      }

      let fields = []

      this.layout.forEach(row => {
        row.col.forEach(item => {
          fields = [...fields, ...item.fields]
        })
      })

      if (hasDuplicates(fields)) {
        throw new Error(
          `请检查 layout 的 fields，存在重复使用的情况，${fields}`
        )
      }

      return this.layout
    },

    innerSubmitButton () {
      return {
        type: 'primary',
        text: '提交',
        size: this.innerConfig.size,
        ...this.submitButton
      }
    },

    innerResetButton () {
      return {
        text: '重置',
        size: this.innerConfig.size,
        ...this.resetButton
      }
    },

    innerCancelButton () {
      return {
        text: '取消',
        size: this.innerConfig.size,
        ...this.cancelButton
      }
    }
  },

  watch: {
    schema: {
      handler (newSchema) {
        this.updateSchema(newSchema, this.model)
      },
      deep: true
    }
  },

  mounted () {
    this.updateSchema()
  },

  methods: {
    /**
     * @param {{}} schema
     */
    _handleAddField (schema) {
      this.$emit('add', schema)
    },

    /**
     * @param {{}} schema
     * @param {number} index
     */
    _handleRemoveField (schema, index) {
      this.$emit('remove', schema, Number(index))
    },

    /**
     * @param {{}} schema
     * @param {number} index
     */
    _handleMoveUp (schema, index) {
      this.$emit('move-up', schema, Number(index))
    },

    /**
     * @param {{}} schema
     * @param {number} index
     */
    _handleMoveDown (schema, index) {
      this.$emit('move-down', schema, Number(index))
    },

    /**
     * @param {[]} fields
     * @return {{}}
     */
    _filterFields (fields) {
      const newFields = {}
      const cloneFields = _cloneDeep(this.formSchema.properties)

      if (Array.isArray(fields) && fields.length > 0) {
        _each(fields, prop => {
          if (cloneFields[prop]) {
            newFields[prop] = cloneFields[prop]
          }
        })
      }

      return {
        type: 'object',
        border: false,
        readOnly: this.formSchema.readOnly,
        disabled: this.formSchema.disabled,
        properties: newFields
      }
    },

    /**
     * @param {{fields: string[], title: string, colAttrs: {}}} col
     */
    _colHasFields (col) {
      return col && col.fields && col.fields.length > 0
    },

    /**
     * @param {string} prop 被校验的表单项 prop 值
     * @param {boolean} isPass 校验是否通过
     * @param {string|null} validateMessage 错误消息（如果存在）
     */
    _handleValidate (prop, isPass, validateMessage) {
      this.$emit('validate', prop, isPass, validateMessage)
    },

    _reset () {
      this.clearValidate()
      this.resetFields()
    },

    _submit () {
      this.validate(valid => {
        if (valid) this.$emit('submit')
      })
    },

    /**
     * @param {{}} schema
     * @param {{}} model
     */
    updateSchema (schema = this.schema, model = this.model) {
      this.formSchema = generateFormSchemaUsingSchema(
        schema,
        model,
        this.formDisabled
      )
    },

    /**
     * @param {function} cb
     * @returns {Promise}
     */
    validate (cb) {
      let errors = {}

      const validateSchema = schema => {
        let tempSchema = null

        if (schema.type === 'array') {
          const arrayErrors = validator.array(schema)

          if (arrayErrors.length > 0) {
            // 合并错误
            errors[schema.prop] = [
              ...(errors[schema.prop] || []),
              ...arrayErrors,
              ...schema.errors
            ]
          }

          tempSchema = schema.items
        } else if (schema.type === 'object') {
          tempSchema = schema.properties
        }

        _each(tempSchema, (formItem, key) => {
          // 处理多级嵌套
          if (formItem && isFieldset(formItem.type)) {
            validateSchema(formItem)
          }
        })
      }

      validateSchema(_cloneDeep(this.formSchema))

      if (typeof cb === 'function') {
        return this.$refs.form.validate((valid, fields) => {
          const mergedErrors = { ...fields, ...errors }
          cb(valid && Object.values(errors).length === 0, mergedErrors)
        })
      } else if (window.Promise) {
        return new window.Promise((resolve, reject) => {
          this.$refs.form
            .validate()
            .then(res => {
              resolve(res && Object.values(errors).length === 0)
            })
            .catch(err => {
              reject(err)
            })
        })
      }
    },

    validateField (props, callback) {
      return this.$refs.form.validateField(props, callback)
    },

    clearValidate (props) {
      return this.$refs.form.clearValidate(props)
    },

    resetFields () {
      return this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-schema-form /deep/ {
  * {
    box-sizing: border-box;
  }
  h3,
  h4 {
    margin: 0;
  }
  h3 {
    padding: 15px 0;
    font-size: 18px;
  }
  h4 {
    padding: 0 0 10px 0;
    font-size: 16px;
  }
  .el-schema-form-ft {
    text-align: right;
    margin-bottom: 10px;
  }
}
</style>
