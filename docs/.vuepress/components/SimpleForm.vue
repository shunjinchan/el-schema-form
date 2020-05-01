<template>
  <el-schema-form
    :schema="schema"
    :model="model"
    :config="config"
    :submit-button="true"
    :cancel-button="{
      type: 'plain'
    }"
    @submit="handleSubmit"
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
  },

  methods: {
    handleSubmit () {
      console.log('submit')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
