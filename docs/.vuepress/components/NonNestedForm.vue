<template>
  <el-schema-form
    :schema="schema"
    :model="model"
    :config="config"
    style="width: 400px;"
  ></el-schema-form>
</template>

<script>

export default {
  data () {
    return {
      model: {
        name: ''
      },
      schema: {
        type: 'object',
        properties: {
          name: {
            title: '活动名称',
            description: '活动名称描述',

            head: '我是 form item 头部，你可以在这里写一些说明信息',
            tail: {
              render: () => {
                return (
                  <el-alert>form item 尾部，我可以是一个动态组件，你可以在这里对 UI 进行自定义</el-alert>
                )
              }
            },
            component: 'input',
            field: {
              placeholder: '活动名称',
              type: 'textarea',
              listeners: {}
            },
            rules: [
              {
                required: true,
                message: '活动名称不能为空',
                trigger: 'change'
              }
            ]
          }
        }
      },
      config: {
        labelPosition: 'top'
      }
    }
  }
}
</script>
