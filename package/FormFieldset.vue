<template>
  <fieldset
    class="el-schema-form-fieldset"
    :style="schema.style"
    :class="schema.class"
    :disabled="schema.disabled"
  >
    <legend v-if="schema.title" class="el-schema-form-fieldset-legend">
      <component
        v-if="typeof schema.title.render === 'function'"
        :is="schema.title"
        :schema="schema"
        :fieldset-schema="fieldsetSchema"
        :index="index"
      ></component>
      <template v-else>{{ schema.title }}</template>
    </legend>

    <div
      v-if="schema.description"
      class="el-schema-form-fieldset-description"
    >
      <component
        v-if="typeof schema.description.render === 'function'"
        :is="schema.description"
        :schema="schema"
        :fieldset-schema="fieldsetSchema"
        :index="index"
      ></component>
      <template v-else>{{ schema.description }}</template>
    </div>

    <el-alert v-if="errors && errors.length > 0" v-bind="alertAttrs">
      <div v-for="(item, index) in errors" :key="index">
        {{ item.message }}
      </div>
    </el-alert>

    <slot></slot>
  </fieldset>
</template>

<script>
export default {
  props: {
    schema: Object,
    fieldsetSchema: Object,
    index: String,

    errors: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      alertAttrs: {
        type: 'error',
        closable: false,
        title: '错误提示：'
      }
    }
  },

  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.el-schema-form-fieldset {
  legend {
    font-size: 15px;
    font-weight: bold;
  }
}
</style>
