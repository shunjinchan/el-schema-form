<template>
  <div class="demo">
    <h1>表单自动生成解决方案</h1>

    <!-- {{model.name}}

      <el-input :value="model.name" @input="handleChange"></el-input>
      <input type="text" v-model.lazy="model.name"> -->

    <el-tabs type="border-card">
      <el-tab-pane label="综合表单">
        <common-form></common-form>
      </el-tab-pane>
      <!-- <el-tab-pane label="布局">
        <dynamic-form></dynamic-form>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import '../style/doc.scss'
import CommonForm from './CommonForm.vue'
// import DynamicForm from './DynamicForm.vue'

export default {
  components: {
    CommonForm
    // DynamicForm
  },

  data () {
    return {
      model: {
        name: ''
      }
    }
  },

  methods: {
    handleChange (val) {
      this.model.name = val
    }
  }

}
</script>

<style lang="scss">
.demo {
  margin: 0 auto 40px auto;
  h1 {
    margin-bottom: 30px;
  }
  width: 98%;
  .demo-block .source {
    padding: 15px;
  }
}
</style>
