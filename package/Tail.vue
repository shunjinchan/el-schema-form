<template>
  <div class="el-schema-form-item-tail" v-if="schema.tail">
    <component
      v-if="typeof schema.tail.render === 'function'"
      :is="schema.tail"
      :schema="cloneDeep(schema)"
      :fieldset-schema="cloneDeep(fieldsetSchema)"
      :index="index"
    ></component>
    <template v-else>
      {{ schema.tail }}
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
