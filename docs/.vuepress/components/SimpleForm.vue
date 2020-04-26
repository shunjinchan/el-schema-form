<template>
  <el-schema-form
    :schema="schema"
    :model="model"
    :config="config"
    :auto-update="true"
    style="width: 460px;"
  ></el-schema-form>
</template>

<script>
import schema from './simple-schema.json'
import model from './simple-model.json'

export default {
  data () {
    return {
      model,
      schema,
      config: {
        labelWidth: '100px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
