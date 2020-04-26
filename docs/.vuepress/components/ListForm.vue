<template>
  <el-schema-form
    ref="form"
    :schema="schema"
    :model="model"
    :config="config"
    :auto-update="true"
    @add="handleAddField"
    @remove="handleRemoveField"
    @move-up="handleMoveUp"
    @move-down="handleMoveDown"
    style="width: 460px"
  ></el-schema-form>
</template>

<script>
import schema from './list-schema.json'
import model from './list-model.json'

export default {
  data () {
    return {
      model,
      schema,
      config: {
        labelWidth: '60px'
      }
    }
  },

  methods: {
    handleAddField (schema) {
      this.model.user.push(schema.additionalItems.default)
      this.$refs.form.updateSchema()
    },

    handleRemoveField (schema, index) {
      this.model.user.splice(index, 1)
      this.$refs.form.updateSchema()
    },

    handleMoveUp (schema, index) {},

    handleMoveDown (schema, index) {}
  }
}
</script>

<style lang="scss" scoped>
</style>
