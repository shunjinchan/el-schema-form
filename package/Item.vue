<template>
  <div class="el-schema-form-item" :class="{ 'is-fieldset': isFieldset }">
    <form-item-head
      v-if="schema.head && visible"
      :schema="
        isFieldset
          ? cloneDeep(innerFieldsetSchema)
          : cloneDeep(innerFormItemSchema)
      "
      :fieldset-schema="cloneDeep(parentSchema)"
      :index="uniqueKey"
    ></form-item-head>

    <template v-if="isFieldset">
      <form-fieldset
        :class="{ 'is-border': innerFieldsetSchema.border !== false }"
        :schema="innerFieldsetSchema"
        :fieldset-schema="parentSchema"
        :index="uniqueKey"
        :errors="fieldsetErrors"
      >
        <el-schema-form-item
          v-for="(formItem, key) in getFields(innerFieldsetSchema)"
          :key="formItem.prop"
          :unique-key="String(key)"
          :schema="formItem"
          :model="model"
          :form-config="formConfig"
          :parent-schema="innerFieldsetSchema"
          v-on="{ ...$listeners }"
        >
        </el-schema-form-item>

        <!-- 新增控件按钮 -->
        <add-button
          v-if="isAddable"
          class="el-schema-form-item-add-field"
          :add-button-attrs="addButtonAttrs"
          @add="
            () => {
              !addButtonDisabled && $emit('add-field', innerFieldsetSchema);
            }
          "
        ></add-button>
      </form-fieldset>
    </template>
    <template v-else-if="innerFormItemSchema && visible">
      <component
        v-if="typeof innerFormItemSchema.render === 'function'"
        :is="innerFormItemSchema"
        :fieldset-schema="cloneDeep(parentSchema)"
        :index="uniqueKey"
      ></component>
      <el-form-item v-else v-bind="{ ...innerFormItemSchema }" ref="form-item">
        <template v-if="typeof label !== 'undefined'">
          <component
            v-if="typeof label.render === 'function'"
            :is="label"
            :schema="cloneDeep(innerFormItemSchema)"
            :fieldset-schema="cloneDeep(parentSchema)"
            :index="uniqueKey"
            slot="label"
          ></component>
          <span v-else slot="label">
            {{ label }}
          </span>
        </template>

        <field
          :form-item-config="innerFormItemSchema"
          :model="model"
          :form-config="formConfig"
          :fieldset-config="parentSchema"
          :index="uniqueKey"
          v-on="innerFormItemSchema.field.listeners"
          @update-field="val => $emit('update-field', val)"
        ></field>
      </el-form-item>
    </template>

    <form-item-tool-bar
      v-if="toolBarVisible"
      :is-fieldset="isFieldset"
      :index="uniqueKey"
      :schema="isFieldset ? innerFieldsetSchema : innerFormItemSchema"
      :fieldset-schema="parentSchema"
      :is-orderable="isOrderable"
      :move-up-button-disabled="moveUpButtonDisabled"
      :move-up-button-attrs="moveUpButtonAttrs"
      :move-down-button-disabled="moveDownButtonDisabled"
      :move-down-button-attrs="moveDownButtonAttrs"
      :is-removable="isRemovable"
      :remove-button-disabled="removeButtonDisabled"
      :remove-button-attrs="removeButtonAttrs"
      v-on="$listeners"
    ></form-item-tool-bar>

    <form-item-tail
      v-if="schema.tail && visible"
      :index="uniqueKey"
      :schema="isFieldset ? innerFieldsetSchema : innerFormItemSchema"
      :fieldset-schema="parentSchema"
    ></form-item-tail>
  </div>
</template>

<script>
import _get from 'lodash/get'
import _each from 'lodash/each'
import _isBoolean from 'lodash/isBoolean'
import _cloneDeep from 'lodash/cloneDeep'
import _isPlainObject from 'lodash/isPlainObject'
import validator from './validator/index.js'
import Field from './Field.vue'
import FormFieldset from './FormFieldset.vue'
import AddButton from './AddButton.vue'
import RemoveButton from './RemoveButton.vue'
import MoveUpButton from './MoveUpButton.vue'
import MoveDownButton from './MoveDownButton.vue'
import FormItemHead from './Head.vue'
import FormItemTail from './Tail.vue'
import FormItemToolBar from './ToolBar.vue'

export default {
  name: 'el-schema-form-item',

  components: {
    Field,
    FormFieldset,
    AddButton,
    RemoveButton,
    MoveUpButton,
    MoveDownButton,
    FormItemHead,
    FormItemTail,
    FormItemToolBar
  },

  props: {
    schema: {
      type: Object,
      required: true
    },

    model: {
      type: Object,
      required: true
    },

    formConfig: {
      type: Object,
      default: () => null
    },

    uniqueKey: {
      type: String
    },

    parentSchema: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      get: _get,
      isPlainObject: _isPlainObject,
      cloneDeep: _cloneDeep
    }
  },

  computed: {
    isFieldset () {
      return ['object', 'array'].some(item => this.schema.type === item)
    },

    isArrayFieldset () {
      return this.schema.type === 'array'
    },

    innerFieldsetSchema () {
      if (this.isFieldset) {
        return { ...this.schema }
      }
      return null
    },

    toolBarVisible () {
      if (
        (this.isRemovable && !this.removeButtonDisabled) ||
        this.isOrderable
      ) {
        return true
      }
      return false
    },

    fieldsetErrors () {
      const innerErrors = () => {
        if (this.innerFieldsetSchema.type === 'array') {
          const errors = validator.array(this.innerFieldsetSchema)
          return errors || []
        } else {
          return []
        }
      }
      if (this.isFieldset && this.innerFieldsetSchema) {
        return innerErrors().concat(this.innerFieldsetSchema.errors || [])
      } else {
        return [].concat(this.innerFieldsetSchema.errors || [])
      }
    },

    innerAddable () {
      if (this.innerFieldsetSchema.readOnly === true) return false
      if (typeof this.innerFieldsetSchema.addable === 'function') {
        return this.innerFieldsetSchema.addable(
          this.innerFieldsetSchema,
          this.uniqueKey
        )
      }
      return this.innerFieldsetSchema.addable
    },

    isAddable () {
      if (this.innerFieldsetSchema.readOnly === true) return false
      if (this.isArrayFieldset) {
        return (
          this.innerFieldsetSchema &&
          this.isArrayFieldset &&
          (this.innerAddable === true || _isPlainObject(this.innerAddable))
        )
      }
      return false
    },

    addButtonDisabled () {
      if (this.isAddable) {
        return (
          this.innerFieldsetSchema.disabled === true ||
          (typeof this.innerFieldsetSchema.maxItems === 'number'
            ? this.getFields(this.innerFieldsetSchema).length >=
              this.innerFieldsetSchema.maxItems
            : false)
        )
      }
      return false
    },

    addButtonAttrs () {
      if (this.isAddable) {
        let addable = null
        if (_isPlainObject(this.innerAddable)) {
          addable = this.innerAddable
        }

        return {
          icon: 'el-icon-plus',
          type: 'plain',
          text: '添加',
          title: 'Add',
          size: this.formConfig.size,
          // 如果 maxItems 配置了，校验个数是否正确，没配置则默认不做个数限制
          disabled: this.addButtonDisabled,
          ...addable
        }
      }

      return null
    },

    // 分割线，上面的计算属性属于当配置是 fieldset 时，下面的属于当配置时 form item 时

    isComponent () {
      if (this.schema && typeof this.schema.render === 'function') {
        return true
      }
      return false
    },

    label () {
      if (this.isFieldset) return

      return this.schema.label
    },

    innerFormItemSchema () {
      if (this.isComponent) {
        return this.schema
      }

      if (this.isFieldset) {
        return null
      } else {
        const cloneSchema = _cloneDeep(this.schema)
        // 删除 label，el-form-item 的 label 只支持 string
        delete cloneSchema.label
        const field = { ...cloneSchema.field }
        field.value && delete field.value // 删除 value，避免干扰 v-model
        return { ...cloneSchema, field: field }
      }
    },

    visible () {
      if (this.isFieldset) {
        return true
      } else {
        return _isBoolean(this.innerFormItemSchema.visible)
          ? this.innerFormItemSchema.visible
          : true
      }
    },

    isOrderable () {
      if (this.parentSchema.readOnly === true) return false
      return (
        this.parentSchema &&
        this.parentSchema.type === 'array' &&
        (this.parentSchema.orderable === true ||
          _isPlainObject(this.parentSchema.orderable))
      )
    },

    moveUpButtonDisabled () {
      if (this.isOrderable) {
        const uniqueKey = Number(this.uniqueKey)
        return uniqueKey === 0 || this.parentSchema.disabled === true
      }
      return false
    },

    moveUpButtonAttrs () {
      if (this.isOrderable) {
        return {
          icon: 'el-icon-arrow-up',
          class: 'el-schema-form-item-move-up-field',
          title: 'Move up',
          circle: true,
          size: this.formConfig.size,
          disabled: this.moveUpButtonDisabled,
          ...this.parentSchema.orderable.moveUp
        }
      }

      return null
    },

    moveDownButtonDisabled () {
      if (this.isOrderable) {
        const uniqueKey = Number(this.uniqueKey)
        return (
          this.parentSchema.items.length === uniqueKey + 1 ||
          this.parentSchema.disabled === true
        )
      }
      return false
    },

    moveDownButtonAttrs () {
      if (this.isOrderable) {
        return {
          icon: 'el-icon-arrow-down',
          class: 'el-schema-form-item-move-down-field',
          title: 'Move down',
          circle: true,
          size: this.formConfig.size,
          disabled: this.moveDownButtonDisabled,
          ...this.parentSchema.orderable.moveDown
        }
      }

      return null
    },

    /**
     * 在内部先计算出 removable 函数的值
     */
    innerRemovable () {
      if (this.parentSchema.readOnly === true) return false
      if (typeof this.parentSchema.removable === 'function') {
        return this.parentSchema.removable(this.parentSchema, this.uniqueKey)
      }
      return this.parentSchema.removable
    },

    isRemovable () {
      return (
        this.parentSchema &&
        this.parentSchema.type === 'array' &&
        (this.innerRemovable === true || _isPlainObject(this.innerRemovable))
      )
    },

    removeButtonDisabled () {
      if (this.isRemovable) {
        return (
          this.parentSchema.disabled === true ||
          (typeof this.parentSchema.minItems === 'number'
            ? this.getFields(this.parentSchema).length <=
              this.parentSchema.minItems
            : false)
        )
      }
      return false
    },

    removeButtonAttrs () {
      if (this.isRemovable) {
        let removable = null
        if (_isPlainObject(this.innerRemovable)) {
          removable = this.innerRemovable
        }

        return {
          icon: 'el-icon-delete',
          class: 'el-schema-form-item-remove-field',
          title: 'Remove',
          circle: true,
          text: '',
          size: this.formConfig.size,
          disabled: this.removeButtonDisabled,
          ...removable
        }
      }

      return null
    }
  },

  watch: {
    visible (val) {
      // 表单控件不渲染时将值和验证结果重置
      if (val === false) {
        this.$refs['form-item'].resetField()
        this.$refs['form-item'].clearValidate()
      }
    }
  },

  mounted () {
    // console.log(this.$listeners)
  },

  methods: {
    /**
     * 过滤空配置，添加默认 field 配置
     * @param {{type: string, items: []|{}, items: []|{}}} config
     */
    getFields (config) {
      if (config.type === 'array') {
        return _cloneDeep(config.items)
          .filter(item => !!item)
          .map(item => {
            return {
              field: {},
              ...item
            }
          })
      }

      if (config.type === 'object') {
        const fields = {}
        _each(_cloneDeep(config.properties), (item, key) => {
          if (item) {
            fields[key] = {
              field: {},
              ...item
            }
          }
        })
        return fields
      }

      return []
    }
  }
}
</script>

<style lang="scss" scoped>
.el-schema-form-item /deep/ {
  width: 100%;

  .el-schema-form-item-add-field {
    text-align: right;
    margin-top: 20px;
  }

  .el-alert {
    margin-bottom: 10px;
  }

  .el-schema-form-item {
    width: 100%;
    .el-schema-form-item-tool-bar {
      text-align: right;
      margin-bottom: 20px;
    }
    &.is-fieldset {
    }
  }

  .el-schema-form-fieldset {
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid transparent;
    padding: 15px 0 0 0;
    &.is-border {
      border: 1px solid #dcdfe6;
      padding: 20px;
      border-radius: 4px;
    }
    > .el-schema-form-fieldset-description {
      margin: 0;
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
}
</style>
