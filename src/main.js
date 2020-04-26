import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/github.css'

// import ElSchemaForm from '../dist/el-schema-form.common.js'
// import '../dist/el-schema-form.css'

import App from './App.vue'

import ElSchemaForm from '../package/index'

Vue.use(ElementUI, {
  size: 'medium'
})

Vue.use(VueHighlightJS)
Vue.use(ElSchemaForm)

Vue.config.productionTip = false

console.log(Vue.version)
console.log(ElementUI)
new Vue({
  render: h => h(App)
}).$mount('#app')
