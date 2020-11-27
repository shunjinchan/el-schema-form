<template>
  <el-form-item prop="dynamic_component2" label="动态 form item">
    <el-button @click="handleClick">哈哈哈</el-button>
  </el-form-item>
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
    console.log(this.model)
    console.log(this.$listeners)
  },

  methods: {
    handleClick () {
      this.$emit('click', 'dynamic_component2 组件点击')
      this.$emit('update-field', {
        prop: this.config.prop,
        value: 'jjjj',
        formItem: this.config,
        model: this.model
      })
    }
  }
}
</script>

<style></style>
