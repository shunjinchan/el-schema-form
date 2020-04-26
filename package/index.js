import ElSchemaForm from './Form.vue'
import validator from './validator/index.js'

function install (Vue, opts = {}) {
  Vue.component('ElSchemaForm', ElSchemaForm)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
  if (install.installed) {
    install.installed = false
  }
}

export default {
  version: '0.1.0',
  install
}

export {
  ElSchemaForm,
  validator
}
