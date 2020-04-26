<template>
  <el-schema-form
    ref="form"
    :schema="schema"
    :model="model"
    :config="config"
    :layout="layout"
    :auto-update="true"
    @add="handleAddField"
    @remove="handleRemoveField"
    @move-up="handleMoveUp"
    @move-down="handleMoveDown"
  ></el-schema-form>
</template>

<script>
import schema from './complex-schema.json'
import model from './complex-model.json'
import layout from './complex-layout.json'

export default {
  data () {
    return {
      model,
      schema,
      layout,
      config: {
        labelPosition: 'top'
      }
    }
  },

  methods: {
    handleAddField (schema) {
      this.model.users.push(schema.additionalItems.default)
      this.$refs.form.updateSchema()
    },

    handleRemoveField (schema, index) {
      this.model.users.splice(index, 1)
      this.$refs.form.updateSchema()
    },

    handleMoveUp (schema, index) {
      this.swapUsers(index, index - 1)
    },

    handleMoveDown (schema, index) {
      this.swapUsers(index, index + 1)
    },

    swapUsers (first, second) {
      const tmp = this.model.users[second]
      this.model.users.splice(second, 1, this.model.users[first])
      this.model.users.splice(first, 1, tmp)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
