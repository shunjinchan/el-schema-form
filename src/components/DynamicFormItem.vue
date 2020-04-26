<template>
  <el-select
    v-bind="config.field"
    v-on="$listeners"
    v-model="model[config.prop]"
  >
    <el-option
      v-for="opt in config.field.options"
      :key="opt.value"
      v-bind="opt"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    }
  },

  mounted () {
    console.log(this.config)
    // console.log(this.$listeners)
  }
}
</script>

<style></style>
