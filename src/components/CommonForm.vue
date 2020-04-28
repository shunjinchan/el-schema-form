<template>
  <div class="common-form">
    <h3>综合表单</h3>
    <p>包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。</p>

    <!-- <el-card>
      <div>value: {{ model2.name }}</div>
      <ul>
        <li>
          el-input: v-model
          <el-input v-model="model2.name" style="display:inline-block; width: 160px;"></el-input>
        </li>
        <li>
          原生 input: v-model
          <input type="text" v-model="model2.name" />
        </li>
        <li>
          原生 input: v-model.lazy
          <input type="text" v-model.lazy="model2.name" />
        </li>
      </ul>
    </el-card> -->

    <el-row :gutter="20">
      <!-- <el-col :span="8">
        <div class="meta">
          <div class="highlight">
            <pre v-highlightjs="sourceCode"><code class="html"></code></pre>
          </div>
        </div>
      </el-col> -->

      <el-col :span="24">
        <div class="demo-block">
          <div class="source">
            <el-schema-form
              ref="form"
              :model="model"
              :config="formConfig"
              :layout="layout"
              :schema="uiSchema"
              :submit-button="true"
              :cancel-button="true"
              @add="handleAddField"
              @remove="handleRemoveField"
              @validate="handleValidate"
              @change="handleChange"
            >
              <!-- <el-button type="primary" @click="submit">立即创建</el-button>
              <el-button>取消</el-button> -->
            </el-schema-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep'
// import ElSchemaForm from '../../package/Form.vue'
// import { ElSchemaForm } from '../../dist/el-schema-form.common.js'
// import '../../dist/el-schema-form.css'
import DynamicFormItem from './DynamicFormItem.vue'
// import './i18n.js'
import jsonSchema from '../json/common-form-schema.json'

const user = {
  type: 'object',
  order: ['hobby', 'name', '嘿嘿嘿', 'friends'],
  default: {
    name: 'new name',
    age: 20,
    family: {
      parent: {
        father: 'father',
        mother: 'mother'
      },
      siblings: ['brother']
    },
    friends: ['friend 1'],
    hobby: ['hobby 1', 'hobby 2']
  },
  properties: {
    name: {
      component: 'input',
      label: '用户名',
      rules: [{ required: true }],
      field: {
        placeholder: '请输入用户名'
      }
    },
    age: {
      component: 'input',
      label: '年龄',
      rules: [{ type: 'number', required: true }],
      field: {
        type: 'number',
        placeholder: '请输入年龄'
      }
    },
    hobby: {
      type: 'array',
      title: '爱好',
      addable: true,
      removable: true,
      items: [
        {
          component: 'input',
          label: '爱好1',
          field: {
            placeholder: '请填写兴趣爱好'
          },
          rules: [{ required: true }],
          default: '',
          id: 1
        },
        {
          component: 'input',
          label: '爱好2',
          field: {
            placeholder: '请填写兴趣爱好'
          },
          rules: [{ required: true }],
          default: '',
          id: 2
        }
      ],
      additionalItems: {
        component: 'input',
        label: '爱好',
        field: {
          placeholder: '请填写兴趣爱好'
        },
        rules: [{ required: true }],
        default: ''
      }
    },
    family: {
      type: 'object',
      title: '家庭',
      properties: {
        parent: {
          type: 'object',
          title: '父母',
          properties: {
            father: {
              component: 'input',
              label: '父亲名字',
              rules: [{ required: true }],
              field: {
                placeholder: '请填写父亲名字'
              }
            },
            mother: {
              component: 'input',
              label: '母亲名字',
              rules: [{ required: true }],
              field: {
                placeholder: '请填写母亲名字'
              }
            }
          }
        },
        siblings: {
          type: 'array',
          title: '兄弟姐妹',
          addable: true,
          items: {
            component: 'input',
            default: '',
            label: '兄长',
            field: {
              placeholder: '请填写兄长名字'
            }
          }
        }
      }
    },
    friends: {
      type: 'array',
      title: '朋友们',
      minItems: 2,
      maxItems: 6,

      border: false,
      style: { 'margin-bottom': 0 },
      addable: true,
      // addable: {
      //   text: '新增朋友',
      //   type: 'primary',
      //   style: { fontSize: '14px' }
      // }, // 是否可新增
      // disabled: true,
      orderable: true,
      removable: true, // 是否可删除

      items: [
        {
          component: 'input',
          label: '朋友',
          rules: [{ required: true }],
          // label: {
          //   render: h => {
          //     return <em>朋友啊朋友</em>
          //   }
          // },
          field: {
            placeholder: '请填写朋友姓名',
            listeners: {
              input (val) {
                console.log(val, '朋友 input')
              },
              focus (val) {
                console.log(val, '朋友 foucs')
              },
              change (val) {
                console.log(val, '朋友 change')
              },
              blur (val) {
                console.log(val, '朋友 blur')
              }
            }
          }
        }
      ],
      additionalItems: {
        component: 'input',
        label: '新增的朋友',
        rules: [{ required: true, message: '新增的朋友是必填的' }],
        field: {
          placeholder: '请填写新增的朋友'
        },
        default: ''
      }
    }
  }
}

export default {
  components: {
    // ElSchemaForm
  },

  data () {
    return {
      model: {
        name: 'name',
        organizer: 'organizer',
        count: 33,
        region: 'shanghai',
        date: '',
        delivery: false,
        types: [1, 2],
        resource: '',
        desc: '',

        extra_value: 'extra value',

        link: '//google.com',
        plain_text: '文本示例文案',
        dynamic_component: '',
        dynamic_component2: '',
        image: '',
        hobby: ['打篮球'],
        // hobby: ['打篮球', '看动画片', '看沙雕视频', '瞎折腾'],
        color: '#000000',

        users: [
          {
            name: '',
            age: '',
            family: {
              parent: {
                father: '',
                mother: ''
              },
              siblings: ['']
            },
            friends: ['1', '2', '3', '4', '5'],
            hobby: ['打篮球', '看动画片', '看沙雕视频', '瞎折腾']
          }
        ]
      },

      model2: {
        name: ''
      },

      jsonSchema: jsonSchema
    }
  },

  computed: {
    formConfig () {
      return {
        // labelWidth: '95px',
        inline: false,
        labelPosition: 'top',
        size: 'small',
        // disabled: true,
        rules: {
          types: [{ type: 'array', required: true, len: 3 }]
        }
      }
    },

    uiSchema () {
      return {
        type: 'object',
        // readOnly: true,
        // disabled: true,
        properties: {
          name: {
            component: 'input',
            label: '活动名称',
            // label: this.model.name,
            // label: {
            //   functional: true,
            //   render: (h, context) => {
            //     console.log('label render')
            //     return (
            //       <span>
            //         活动名称
            //         <el-tooltip placement="top" effect="light">
            //           <div slot="content">活动名称不能重复</div>
            //           <i class="el-icon-info text-danger"></i>
            //         </el-tooltip>
            //       </span>
            //     )
            //   }
            // },
            prop: 'name',
            field: {
              placeholder: '活动名称',
              type: 'textarea'
              // listeners: {
              //   input: (val, e) => {
              //     console.log(val, 'input')
              //   },
              //   '~focus' (val) {
              //     console.log(val, 'foucs')
              //   },
              //   change (val) {
              //     console.log(val, 'change')
              //   },
              //   blur (val) {
              //     console.log(val, 'blur')
              //   }
              // }
            },
            rules: [
              {
                required: true,
                message: '活动名称不能为空',
                trigger: 'change'
              }
            ],
            description: '活动名称描述',
            head: 'head',
            tail: 'tail'
          },

          count: {
            component: 'input',
            // label: '参加人数 label',
            title: '参加人数 title',
            rules: [
              {
                required: true,
                message: '参加人数不能为空',
                trigger: 'change'
              },
              { min: 10, max: 100, type: 'number' }
            ],
            field: {
              placeholder: '参加人数',
              type: 'number'
            }
          },

          organizer: {
            component: 'autocomplete',
            label: '活动举办方',
            rules: [{ required: true, message: '活动举办方不能为空' }],
            field: {
              placeholder: '活动举办方',
              fetchSuggestions () {
                console.log('fetchSuggestions')
              }
            }
          },

          region: {
            component: 'select',
            label: '活动区域',
            prop: 'region',
            rules: [
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            field: {
              clearable: true,
              options: [
                {
                  value: 'shanghai',
                  label: '上海'
                },
                {
                  value: 'beijing',
                  label: '北京'
                }
              ],
              placeholder: '活动区域'
            }
          },

          date: {
            component: 'date-picker',
            label: '活动日期',
            rules: [{ required: true, message: '请选择活动日期' }],
            field: {
              placeholder: '活动日期'
            }
          },

          delivery: {
            component: 'switch',
            label: '即时配送',
            field: {}
          },

          types: {
            component: 'checkbox-group',
            label: '活动性质',
            // rules: [
            //   { required: true, message: '请选择活动性质', trigger: 'change' }
            // ],
            field: {
              options: [
                {
                  value: 1,
                  label: '美食/餐厅线上活动'
                },
                {
                  value: 2,
                  label: '地推活动'
                },
                {
                  value: 3,
                  label: '线下主题活动'
                },
                {
                  value: 4,
                  label: '单纯品牌曝光'
                }
              ]
            }
          },

          resource: {
            component: 'radio-group',
            label: '特殊资源',
            rules: [{ required: true, message: '请选择资源类型' }],
            field: {
              options: [
                {
                  value: 1,
                  label: '线上品牌商赞助'
                },
                {
                  value: 2,
                  label: '线下场地免费'
                }
              ]
            }
          },

          desc: {
            component: 'input',
            label: '活动形式',
            rules: [{ required: true, message: '活动形式不能为空' }],
            field: {
              type: 'textarea'
            }
          },

          link: {
            component: 'link',
            label: '链接示例',
            field: {
              target: '_blank',
              text: '谷歌链接'
            }
          },

          plain_text: {
            component: 'plain-text',
            label: '文本示例'
          },

          // dynamic_component: {
          //   label: '动态组件示例',
          //   component: DynamicFormItem,
          //   rules: [{ required: true, message: '请选择动态组件' }],
          //   field: {
          //     options: [
          //       {
          //         value: 1,
          //         label: '选项一'
          //       },
          //       {
          //         value: 2,
          //         label: '选项二'
          //       }
          //     ]
          //   }
          // },

          // dynamic_component2: {
          //   functional: true,
          //   render: (h, context) => {
          //     console.log(context.props)
          //     return (
          //       <el-form-item
          //         rules={[{ required: true, trigger: 'blur' }]}
          //         prop="dynamic_component2"
          //         label="动态组件2"
          //       >
          //         <el-input
          //           value={context.props.model.dynamic_component2}
          //           onInput={val => {
          //             this.model.dynamic_component2 = val
          //           }}
          //         ></el-input>
          //       </el-form-item>
          //     )
          //   }
          // },

          image: {
            label: '上传图片',
            prop: ' image',
            component: 'upload',
            rules: [
              { required: true, message: '请上传图片', trigger: ['change'] }
            ],
            field: {
              action: '',
              tip: '提示信息',
              drag: true,
              // listType: 'picture'
              multiple: true
              // drag: true,
              // component: {
              //   render: h => {
              //     return (
              //       <div>
              //         <i class="el-icon-upload"></i>
              //         <div class="el-upload__text">
              //           将文件拖到此处，或<em>点击上传</em>
              //         </div>
              //         <div class="el-upload__tip" slot="tip">
              //           只能上传jpg/png文件，且不超过500kb
              //         </div>
              //       </div>
              //     )
              //   }
              // }
            }
          },

          color: {
            label: '颜色',
            prop: 'color',
            component: 'color-picker',
            rules: [
              { required: true, message: '请选择颜色', trigger: ['change'] }
            ]
          },

          hobby: {
            type: 'array',
            // readOnly: true,
            // disabled: true,
            title: '爱好',
            // title: {
            //   functional: true,
            //   render: (h, context) => {
            //     return (
            //       <span>
            //         爱好动态组件示例
            //         <el-tooltip placement="top" effect="light">
            //           <div slot="content">提示信息</div>
            //           <i class="el-icon-info text-danger"></i>
            //         </el-tooltip>
            //       </span>
            //     )
            //   }
            // },
            // description: '描述啊啊啊啊啊啊啊啊啊啊啊',
            // description: {
            //   functional: true,
            //   render: (h, context) => {
            //     console.log(context.props)
            //     return <el-button>复制</el-button>
            //   }
            // },
            addable: true,
            // addable: () => {
            //   return {
            //     type: 'primary'
            //   }
            // },
            orderable: true,
            minItems: 2,
            maxItems: 6,
            removable: true,
            errors: [{ message: '自定义错误' }],
            // tail: {
            //   functional: true,
            //   render: (h, context) => {
            //     console.log(context.props)
            //     return <el-switch></el-switch>
            //   }
            // },
            items: {
              component: 'input',
              label: '爱好',
              field: {
                placeholder: '请填写兴趣爱好'
              },
              rules: [{ required: true }],
              default: ''
              // head: {
              //   functional: true,
              //   render: (h, context) => {
              //     console.log(context.props)
              //     return <el-checkbox></el-checkbox>
              //   }
              // },
              // tail: {
              //   functional: true,
              //   render: (h, context) => {
              //     console.log(context.props)
              //     return <el-switch></el-switch>
              //   }
              // }
            }
          },

          users: {
            type: 'array',
            title: '用户信息列表',
            description: '请填写真实信息',
            addable: {
              text: '新增用户',
              type: 'primary',
              style: { fontSize: '14px' }
            },
            removable: true,
            orderable: true,
            // disabled: true,
            items: [user]
          }
        }
      }
    },

    layout () {
      return [
        {
          title: '行标题示例',
          rowAttrs: {
            type: 'flex',
            style: 'flex-wrap: wrap;'
          },
          col: [
            {
              colAttrs: {
                span: 12
              },
              fields: [
                'name',
                'region',
                'organizer',
                'date',
                'count',
                'delivery',
                'types',
                'resource',
                'desc'
              ],
              title: '列标题示例'
            },
            {
              colAttrs: {
                span: 12
              },
              fields: [
                // 'name',
                'image',
                'color',
                'dynamic_component',
                'dynamic_component2',
                'link',
                'plain_text',
                'hobby'
              ],
              title: '列标题示例'
            }
          ]
        },
        {
          title: '复杂例子',
          rowAttrs: {
            type: 'flex',
            style: 'flex-wrap: wrap;'
          },
          col: [
            {
              colAttrs: {
                span: 18
              },
              fields: ['users'],
              title: '用户列表'
            }
          ]
        }
      ]
    },

    sourceCode () {
      return JSON.stringify(this.uiSchema, null, 4)
    }
  },

  mounted () {},

  methods: {
    handleValidate (prop, isPass, validateMessage) {
      // console.log('validate', prop, isPass, validateMessage)
    },

    handleChange ({ prop, value }) {
      console.log(prop, value)
    },

    handleAddField (schema) {
      this.model.hobby.push('')
      this.$refs.form.updateSchema()
    },

    handleRemoveField (parentSchema, currentIndex) {
      this.model.hobby.splice(currentIndex, 1)
      this.$refs.form.updateSchema()
    },

    submit () {
      // this.$refs.form
      //   .validate()
      //   .then((res, kkk) => {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      this.$refs.form.validate((valid, fields) => {
        console.log(valid, fields)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.common-form {
  .demo-form {
    .el-form--inline,
    .el-form-layout {
      width: 100%;
    }
  }
  .meta {
    code {
      max-height: 700px;
      overflow: auto;
    }
    pre {
      margin-top: 0;
    }
  }
}
</style>
