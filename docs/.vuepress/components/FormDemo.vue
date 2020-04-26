<template>
  <entrance>
    <div class="form-demo">
      <component :is="componentName" :class="componentName"></component>
    </div>

    <template v-if="Object.keys($slots).length > 0">
      <div style="text-align: center">
        <el-button type="text" @click="dialogVisible = true">
          查看代码
        </el-button>
      </div>
      <el-dialog :visible.sync="dialogVisible" width="60%" title="示例代码">
        <slot></slot>
      </el-dialog>
    </template>
  </entrance>
</template>

<script>
import Entrance from './Entrance.vue'
import SimpleForm from './SimpleForm.vue'
import ListForm from './ListForm.vue'
import CustomLayoutForm from './CustomLayoutForm.vue'
import ComplexForm from './ComplexForm.vue'

export default {
  components: {
    Entrance,
    SimpleForm,
    ListForm,
    CustomLayoutForm,
    ComplexForm
  },

  props: {
    componentName: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
.form-demo /deep/ {
  border: 1px solid #eaecef;
  padding: 0px 20px;
  margin-top: 20px;
  border-radius: 6px;
}
</style>
