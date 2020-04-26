<template>
  <div v-if="schema.head" class="el-schema-form-item-head">
    <component
      v-if="typeof schema.head.render === 'function'"
      :is="schema.head"
      :schema="cloneDeep(schema)"
      :fieldset-schema="cloneDeep(fieldsetSchema)"
      :index="index"
    ></component>
    <template v-else>
      {{ schema.head }}
    </template>
  </div>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep'

export default {
  props: {
    schema: Object,
    fieldsetSchema: Object,
    index: String
  },

  methods: {
    cloneDeep: _cloneDeep
  }
}
</script>

<style></style>
