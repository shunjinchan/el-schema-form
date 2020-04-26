<template>
  <div class="entrance">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElSchemaForm from '../../../dist/el-schema-form.common.js'
import '../../../dist/el-schema-form.css'

Vue.use(ElementUI, {
  size: 'medium'
})
Vue.use(ElSchemaForm)

export default {
}
</script>
