<template>
  <div
    class="el-schema-form-item-field"
    :class="{ 'is-read-only': formItemConfig.field.readOnly }"
  >
    <!-- 纯字符串 -->
    <span
      v-if="
        formItemConfig.component === 'plain-text' ||
          (this.formItemConfig.field.readOnly === true &&
            formItemConfig.component !== 'link')
      "
      v-bind="field"
      v-on="$listeners"
      class="el-schema-form-item-plain-text"
    >
      {{ String(innerFieldValue) || "-" }}
    </span>

    <!-- Link -->
    <template v-else-if="formItemConfig.component === 'link'">
      <a
        v-bind="field"
        v-on="$listeners"
        :href="innerFieldValue"
        class="el-schema-form-item-link"
      >
        {{ field.text || String(innerFieldValue) || "-" }}
      </a>
    </template>

    <el-input
      v-else-if="
        formItemConfig.component === 'input' && field.type === 'number'
      "
      v-bind="field"
      v-on="$listeners"
      v-model.number="innerFieldValue"
    ></el-input>

    <el-upload v-else-if="formItemConfig.component === 'upload'" v-bind="field">
      <template v-if="field.drag">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </template>
      <template v-else-if="field.listType === 'picture-card'">
        <i class="el-icon-plus"></i>
      </template>
      <template v-else>
        <el-button size="small" type="primary">点击上传</el-button>
      </template>
      <div class="el-upload__tip" slot="tip">
        {{ field.tip }}
      </div>
    </el-upload>

    <component
      v-else-if="componentName"
      :is="componentName"
      v-bind="field"
      v-on="$listeners"
      v-model="innerFieldValue"
    >
    </component>

    <!-- 单选框组 -->
    <el-radio-group
      v-else-if="formItemConfig.component === 'radio-group'"
      v-bind="field"
      v-on="$listeners"
      v-model="innerFieldValue"
    >
      <!-- 将 opt 的 value 属性传递给 label，label 属性只做展示，这里的用法与 element-ui 有一些区别，element-ui 的 label 为选中状态的值 -->
      <component
        v-for="opt in field.options"
        :is="field.button ? 'el-radio-button' : 'el-radio'"
        :key="opt.value"
        :label="opt.value"
        v-bind="opt"
      >
        {{ opt.label }}
      </component>
    </el-radio-group>

    <!-- 多选框组 -->
    <el-checkbox-group
      v-else-if="formItemConfig.component === 'checkbox-group'"
      v-bind="field"
      v-on="$listeners"
      v-model="innerFieldValue"
    >
      <component
        v-for="opt in field.options"
        :is="field.button ? 'el-checkbox-button' : 'el-checkbox'"
        :key="opt.value"
        :label="opt.value"
        v-bind="opt"
      >
        {{ opt.label }}
      </component>
    </el-checkbox-group>

    <!-- 选择器 -->
    <el-select
      v-else-if="formItemConfig.component === 'select'"
      v-bind="field"
      v-on="$listeners"
      v-model="innerFieldValue"
    >
      <el-option
        v-for="(opt, index) in field.options"
        :key="opt.value + '-' + index"
        v-bind="opt"
      ></el-option>
    </el-select>

    <component
      v-else-if="
        typeof formItemConfig.component === 'object' &&
          typeof formItemConfig.component.render === 'function'
      "
      :is="formItemConfig.component"
      :config="getDynamicComponentConfig(formItemConfig)"
      :form-value="model"
      :model="model"
      v-on="$listeners"
    ></component>

    <el-alert v-else title="未知控件类型" type="error" :closable="false">
    </el-alert>
  </div>
</template>

<script>
import _get from 'lodash/get'
import _set from 'lodash/set'
import _cloneDeep from 'lodash/cloneDeep'

export default {
  inject: {
    autoUpdate: {
      default: false
    }
  },

  props: {
    formItemConfig: {
      type: Object,
      required: true
    },

    model: {
      type: Object,
      required: true
    },

    fieldsetDisabled: Boolean,

    fieldsetConfig: {
      type: Object,
      required: true
    },

    index: {
      type: String
    }
  },

  data () {
    return {
      elementComponents: [
        'input',
        'input-number',
        'autocomplete',
        'checkbox',
        'switch',
        'rate',
        'color-picker',
        'slider',
        'cascader',
        'time-picker',
        'time-select',
        'date-picker'
      ]
    }
  },

  computed: {
    innerFieldValue: {
      get () {
        return _get(this.model, this.formItemConfig.prop)
      },

      set (newFieldValue) {
        if (this.formItemConfig.field.readOnly === true) return

        if (this.autoUpdate) {
          if (this.fieldsetConfig.type === 'array') {
            const oldValue = _get(this.model, this.fieldsetConfig.prop)
            this.$set(oldValue, Number(this.index), newFieldValue)
          } else {
            _set(this.model, this.formItemConfig.prop, newFieldValue)
          }
        }

        // 如果暴露事件异步更新 model，可能会导致校验滞后，如 el-color-picker 组件
        this.$emit('update-field', {
          prop: this.formItemConfig.prop,
          value: newFieldValue
        })
      }
    },

    field () {
      return {
        ...this.formItemConfig.field
      }
    },

    componentName () {
      if (
        this.elementComponents.some(
          item => item === this.formItemConfig.component
        )
      ) {
        return 'el-' + this.formItemConfig.component
      } else {
        return ''
      }
    }
  },

  mounted () {
    // console.log(this.$listeners)
  },

  methods: {
    cloneDeep: _cloneDeep,

    getDynamicComponentConfig (config) {
      const cloneConfig = _cloneDeep(config)
      delete cloneConfig.component
      // params 参数是为了兼容 m-form 中 field 定义为动态组件的场景
      return { ...cloneConfig, params: cloneConfig.field }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-schema-form-item-field /deep/ {
  .el-schema-form-item-plain-text {
    font-size: 14px;
    color: #606266;
    word-break: break-all;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }

  .el-schema-form-item-link {
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }

  .el-upload__tip {
    line-height: 18px;
  }
}
</style>
