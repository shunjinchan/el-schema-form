<template>
  <div class="dynamic-form clearfix">
    <el-row :gutter="20">
      <el-col :span="9" class="aside">
        <div class="dynamic-config">
          <h3>表单配置</h3>
          <el-form label-position="top" :inline="false" size="mini">
            <el-form-item label="对齐方式">
              <el-radio-group v-model="labelPosition">
                <el-radio :border="false" label="left">左对齐</el-radio>
                <el-radio :border="false" label="right">右对齐</el-radio>
                <el-radio :border="false" label="top">顶部对齐</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="排列方式">
              <el-radio-group v-model="arrange">
                <el-radio :border="false" label="inline">行内表单</el-radio>
                <el-radio :border="false" label="block">非行内表单</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="布局(参考HTML的fieldset)">
              <el-radio-group v-model="layout">
                <el-radio :border="false" label="nil">无布局</el-radio>
                <el-radio :border="false" label="single-row">一行</el-radio>
                <el-radio :border="false" label="single-row-multi-col">
                  一行多列
                </el-radio>
                <el-radio :border="false" label="multi-row">多行</el-radio>
                <el-radio :border="false" label="multi-row-col">
                  多行多列
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="布局边框">
              <el-switch v-model="layoutBorder"></el-switch>
            </el-form-item>
            <el-form-item label="添加验证">
              <el-switch v-model="validate"></el-switch>
            </el-form-item>
          </el-form>
        </div>

        <h3>表单项配置</h3>
        <pre
          v-highlightjs="JSON.stringify(formItemList, null, 2)"
        ><code class="html"></code></pre>
      </el-col>

      <el-col :span="15">
        <div class="demo-block demo-block-form">
          <div class="source">
            <el-schema-form
              :config="formConfig"
              :model="model"
              :fields="formItemList"
              :layout="formLayout"
              @change="handleChange"
              :class="{ 'el-form-layout': layout !== 'nil' }"
            >
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-schema-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ElSchemaForm from '../../package/Form.vue'
import DynamicFormItem from './DynamicFormItem.vue'

export default {
  components: {
    ElSchemaForm
  },

  data () {
    return {
      labelPosition: 'left',
      arrange: 'block',
      layout: 'nil',
      validate: false,
      layoutBorder: true,

      model: {
        name: '',
        region: '',
        date: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        link: '//google.com',
        text: '动态表单'
      }
    }
  },

  computed: {
    formConfig () {
      return {
        labelWidth: '80px',
        inline: this.arrange === 'inline',
        labelPosition: this.labelPosition,
        size: 'small'
      }
    },

    formItemList () {
      let list = [
        {
          prop: 'name',
          component: 'input',
          label: '活动名称',
          rules: [
            { required: true, message: '活动名称不能为空', trigger: 'blur' }
          ],
          field: {
            placeholder: '活动名称'
          }
        },
        {
          prop: 'region',
          component: 'select',
          label: '活动区域',
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
        {
          prop: 'date',
          component: 'date-picker',
          label: '活动日期',
          rules: [
            { required: true, message: '请选择活动日期', trigger: 'change' }
          ],
          field: {
            placeholder: '活动日期'
          }
        },
        {
          prop: 'delivery',
          component: 'switch',
          label: '即时配送',
          field: {}
        },
        {
          prop: 'type',
          component: 'checkbox-group',
          label: '活动性质',
          rules: [
            { required: true, message: '请选择活动性质', trigger: 'change' }
          ],
          field: {
            options: [
              {
                value: '美食/餐厅线上活动',
                label: '美食/餐厅线上活动'
              },
              {
                value: '地推活动',
                label: '地推活动'
              },
              {
                value: '线下主题活动',
                label: '线下主题活动'
              },
              {
                value: '单纯品牌曝光',
                label: '单纯品牌曝光'
              }
            ]
          }
        },
        {
          prop: 'resource',
          component: 'radio-group',
          label: '特殊资源',
          rules: [
            { required: true, message: '请选择资源类型', trigger: 'change' }
          ],
          field: {
            options: [
              {
                value: '线上品牌商赞助',
                label: '线上品牌商赞助'
              },
              {
                value: '线下场地免费',
                label: '线下场地免费'
              }
            ]
          }
        },
        {
          prop: 'desc',
          component: 'input',
          label: '活动形式',
          rules: [
            { required: true, message: '活动形式不能为空', trigger: 'blur' }
          ],
          field: {}
        },
        {
          prop: 'link',
          component: 'link',
          label: '链接',
          field: {
            target: '_blank',
            text: '谷歌链接'
          }
        },
        {
          prop: 'text',
          component: 'plain-text',
          label: '文本示例'
        },
        {
          prop: 'dynamic_component',
          label: '动态组件',
          component: DynamicFormItem,
          field: {
            options: [
              {
                value: 1,
                label: '选项一'
              },
              {
                value: 2,
                label: '选项二'
              }
            ],
            handleChange (val) {
              console.log(val)
            }
          }
        }
      ]

      if (!this.validate) {
        list = list.map(item => ({ ...item, rules: [] }))
      }

      return list
    },

    formLayout () {
      if (this.layout === 'single-row') {
        return [
          {
            // 控件组，row 的控件组配置无 formItem 属性
            fieldset: {
              legend: '一行', // 控件组标题
              border: this.layoutBorder // 控件组是否需要边框
            },
            // el-row 配置
            rowAttrs: {
              gutter: 20
            },
            // col list config
            col: [
              {
                // 控件组
                fieldset: {
                  legend: 'col 测试标题',
                  border: this.layoutBorder,
                  disabled: true, // 是否disabled该fieldset下的所有表单控件
                  // formItem 对应 formItemList 每一项中的 prop，在这里 search_field/keyword 会被认为是属于同一控件组的表单项
                  fields: [
                    'delivery',
                    'type',
                    'resource',
                    'desc',
                    'link',
                    'text',
                    'dynamic_component',
                    'name',
                    'region',
                    'data'
                  ]
                },
                colAttrs: {}, // el-col 配置，详见 https://element.eleme.cn/#/col-attributes
                span: 24 // el-col 的 span 属性，当前列占据栅格占据的列数
              }
            ]
          }
        ]
      }

      if (this.layout === 'single-row-multi-col') {
        return [
          {
            fieldset: {
              legend: '一行多列',
              border: this.layoutBorder
            },
            rowAttrs: {
              gutter: 20
            },
            col: [
              {
                fieldset: {
                  legend: 'col 测试标题',
                  border: this.layoutBorder,
                  fields: ['name', 'region', 'link', 'text']
                },
                colAttrs: {
                  span: 12
                }
              },
              {
                fieldset: {
                  legend: 'col 测试标题',
                  border: this.layoutBorder,
                  fields: [
                    'data',
                    'delivery',
                    'type',
                    'resource',
                    'desc',
                    'dynamic_component'
                  ]
                },
                colAttrs: {
                  span: 12
                }
              }
            ]
          }
        ]
      }

      if (this.layout === 'multi-row') {
        return [
          {
            fieldset: {
              legend: '多行',
              border: this.layoutBorder
            },
            rowAttrs: {
              gutter: 20
            },
            col: [
              {
                fieldset: {
                  legend: 'col 测试标题',
                  border: this.layoutBorder,
                  fields: ['name', 'region', 'data', 'delivery']
                },
                colAttrs: {
                  span: 24
                }
              }
            ]
          },
          {
            fieldset: {
              legend: 'row 测试标题',
              border: this.layoutBorder
            },
            rowAttrs: {
              gutter: 20
            },
            col: [
              {
                fieldset: {
                  legend: 'col 测试标题',
                  border: this.layoutBorder,
                  fields: [
                    'type',
                    'resource',
                    'desc',
                    'link',
                    'text',
                    'dynamic_component'
                  ]
                },
                colAttrs: {
                  span: 24
                }
              }
            ]
          }
        ]
      }

      if (this.layout === 'multi-row-col') {
        return [
          {
            fieldset: {
              legend: '多行多列',
              border: this.layoutBorder
            },
            rowAttrs: {
              gutter: 20
            },
            col: [
              {
                fieldset: {
                  legend: 'col 测试标题',
                  border: this.layoutBorder,
                  fields: ['name', 'region']
                },
                colAttrs: {
                  span: 12
                }
              },
              {
                fieldset: {
                  legend: 'col 测试标题',
                  border: this.layoutBorder,
                  fields: ['data', 'delivery', 'link', 'text']
                },
                colAttrs: {
                  span: 12
                }
              }
            ]
          },
          {
            fieldset: {
              legend: '多行多列',
              border: this.layoutBorder
            },
            rowAttrs: {
              gutter: 20
            },
            col: [
              {
                fieldset: {
                  legend: 'col 测试标题',
                  border: this.layoutBorder,
                  fields: ['type']
                },
                colAttrs: {
                  span: 12
                }
              },
              {
                fieldset: {
                  legend: 'col 测试标题',
                  border: this.layoutBorder,
                  fields: ['resource', 'desc', 'dynamic_component']
                },
                colAttrs: {
                  span: 12
                }
              }
            ]
          }
        ]
      }

      return []
    }
  },

  methods: {
    handleChange () {},

    onSubmit () {}
  }
}
</script>

<style lang="scss" scoped>
.dynamic-form /deep/ {
  margin-top: 30px;
  .aside {
    h3 {
      margin-top: 0;
    }
    code {
      max-height: 400px;
      overflow: auto;
    }
  }

  .dynamic-config {
    .el-radio {
      margin-right: 10px;
      margin-left: 0;
      margin-bottom: 10px;
    }
    .el-radio.is-bordered + .el-radio.is-bordered {
      margin-left: 0;
      margin-right: 10px;
    }
    .el-form-item {
      // margin-bottom: 10px;
    }
    .el-form-item__label {
      // padding-bottom: 5px;
    }
  }

  .demo-block-form {
    margin-left: 0;
    .el-form--inline,
    .el-form-layout {
      width: 100%;
    }
  }
  .meta {
    margin-left: 20px;
  }
}
</style>
