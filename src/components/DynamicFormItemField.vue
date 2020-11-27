<template>
  <el-select
    v-bind="config.field"
    v-on="$listeners"
    v-model="model[config.prop]"
    @change="handleChange"
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
    // console.log(this.config)
    // console.log(this.model)
    // console.log(this.$listeners)
  },

  methods: {
    handleChange (val) {
      // 动态组件数据变更后要更新
      this.$emit('update-field', {
        prop: this.config.prop,
        value: val,
        formItem: this.config,
        model: this.model
      })
    }
  }
}
</script>

<style></style>
