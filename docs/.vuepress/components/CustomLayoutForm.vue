<template>
  <el-schema-form
    :schema="schema"
    :model="model"
    :config="config"
    :layout="layout"
    :auto-update="true"
  ></el-schema-form>
</template>

<script>
import schema from './custom-layout-schema.json'
import model from './custom-layout-model.json'
import layout from './custom-layout-layout.json'

export default {
  data () {
    return {
      model,
      schema,
      config: {
        labelPosition: 'top'
      },
      layout
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
