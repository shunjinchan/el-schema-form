<template>
  <el-schema-form
    ref="form"
    :schema="schema"
    :model="model"
    :config="config"
    :auto-update="true"
    @add="handleAddField"
    @remove="handleRemoveField"
    @move-up="handleMoveUp"
    @move-down="handleMoveDown"
    style="width: 460px"
  ></el-schema-form>
</template>

<script>
export default {
  data () {
    return {
      model: {
        name: 'shunjinchan',
        user: [
          {
            name: 'shunjinchan',
            age: 0,
            gender: 'male'
          }
        ]
      },
      schema: {
        type: 'object',
        properties: {
          name: {
            title: '用户名',
            description: '用户名描述',

            component: 'input',
            field: {
              placeholder: '用户名',
              listeners: {
                input: (val) => {
                  console.log(val)
                }
              }
            },
            rules: [
              {
                required: true,
                message: '用户名不能为空',
                trigger: 'change'
              }
            ]
          },
          user: {
            type: 'array',
            title: '用户',
            minItems: 3,
            maxItems: 6,
            items: {
              type: 'object',
              title: '定制标题',
              default: {
                name: '',
                age: '',
                gender: ''
              },
              properties: {
                name: {
                  title: '姓名',
                  description: '姓名描述',
                  type: 'string',

                  component: 'input',
                  field: {
                    placeholder: '姓名',
                    type: 'textarea',
                    listeners: {}
                  },
                  rules: [
                    {
                      required: true,
                      message: '姓名不能为空',
                      trigger: 'change'
                    }
                  ]
                },
                age: {
                  title: '年龄',
                  type: 'number',

                  component: 'input',
                  rules: [
                    {
                      required: true,
                      message: '请输入年龄'
                    }
                  ],
                  field: {
                    placeholder: '年龄不能为空',
                    type: 'number'
                  }
                },
                gender: {
                  title: '性别',
                  type: 'string',

                  component: 'select',
                  rules: [
                    {
                      required: true,
                      message: '请选择性别',
                      trigger: 'change'
                    }
                  ],
                  field: {
                    clearable: true,
                    options: [
                      {
                        value: 'male',
                        label: '男'
                      },
                      {
                        value: 'female',
                        label: '女'
                      },
                      {
                        value: 'others',
                        label: '其它'
                      }
                    ]
                  }
                }
              },

              border: false
            },

            addable: true,
            orderable: true,
            removable: true
          }
        }
      },
      config: {
        labelWidth: '70px'
      }
    }
  },

  methods: {
    handleAddField (schema) {
      this.model.user.push(schema.additionalItems.default)
      this.$refs.form.updateSchema()
    },

    handleRemoveField (schema, index) {
      this.model.user.splice(index, 1)
      this.$refs.form.updateSchema()
    },

    handleMoveUp (schema, index) {},

    handleMoveDown (schema, index) {}
  }
}
</script>

<style lang="scss" scoped></style>
