# API

## Form-Item

Form-Item 基于 Element 的 el-form-item 进行扩展，支持配置 Form-Item 头尾。

### Form-Item Attributes

| 参数        | 说明                                 | 类型            | 可选值                                                       | 是否必传 | 默认值 |
| ----------- | ------------------------------------ | --------------- | ------------------------------------------------------------ | -------- | ------ |
| title/label | 标题，对应 el-form-item 的 lable     | string/动态组件 | -                                                            | 否       | -      |
| head        | Form-Item 头部                       | string/动态组件 | -                                                            | 否       | -      |
| tail        | Form-Item 尾部                       | string/动态组件 | -                                                            | 否       | -      |
| component   | 组件类型                             | string/动态组件 | input/input-number/autocomplete/checkbox/switch/rate/color-picker/slider/cascader/time-picker/time-select/date-picker/plain-text/link/upload/radio-group/checkbox-group/select | 是       | -      |
| field       | element 控件配置，不同的控件值不一样 | Object          | -                                                            | 否       | -      |
| rules       | 对应 el-form-form 的 rules           | Obejct          | -                                                            | 否       | -      |
| ...         | 其他 el-form-item 的参数             |                 |                                                              |          |        |


除 title 外，其他属性都是扩展的 JSON Schema 属性。

## Field

表单控件，如 input、color-picker、upload 等等。每个控件都有对应的 Form-Item，不同类型的控件有其独有的配置，配置兼容 Element 对应的组件。

## FieldSet

FieldSet 是什么？

控件组，用来对表单中的控制元素进行分组。对表单做结构上的优化，减少信息噪音。

### Form Schema 是如何定义 Fieldset 的？

Schema 的 type 是 object 或 array，El Schema Form 将其渲染为一个 fieldset，fieldset 可以嵌套 fieldset。控件组可以统一处理某逻辑，如禁用控件组内的 Form Item。

## Array Fieldset

类型为 array 的 Schema，通过 items 属性定义列表内 Form Item。

```javascript
{
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
```


### Array Fieldset Attributes

| 参数            | 说明                 | 类型                    | 可选值 | 是否必传 | 默认值 |
| --------------- | -------------------- | ----------------------- | ------ | -------- | ------ |
| type            | 类型                 | String                  | array  | 是       | array  |
| title           | 控件组标题           | String/动态组件         | -      | 否       | -      |
| description     | 控件组描述           | String/动态组件         | -      | 否       | -      |
| addable         | 控件组是否可新增子项 | Boolean/Object/Function | -      | 否       | false  |
| removable       | 控件组子项是否可删除 | Boolean/Object/Function | -      | 否       | false  |
| orderable       | 控件组是否可排序     | Boolean/Object          | -      | 否       | false  |
| minItems        | 控件组最小个数       | Number                  | -      | 否       | -      |
| maxItems        | 控件组最大个数       | Number                  | -      | 否       | -      |
| errors          | 自定义错误           | {message: ''}[]         | -      | 否       | -      |
| items           | 控件组子项配置       | Object/Array            | -      | 否       | -      |
| additionalItems | 控件组额外项配置     | Object                  | -      | 否       | -      |
| disabled | 是否禁用控件组，会继承父控件组的值     | Boolean                  | true/false      | 否       | false      |


#### addable

添加按钮默认使用 el-button，根据自己的需要选择合适的配置。

- Boolean：可选值 true/false，当不需要自定义 UI 时，使用 Boolean 值即可
- Object：el-button 属性，当需要自定义 UI 时使用
- Function：返回 Boolean 或 Object，返回 Object 将传递给 el-button，当需要根据某些其它状态判定是否可新增时使用

#### removable

删除按钮默认使用 el-button，根据自己的需要选择合适的配置。

- Boolean：可选值 true/false，当不需要自定义 UI 时，使用 Boolean 值即可
- Object：el-button 属性，当需要自定义 UI 时使用
- Function：返回 Boolean 或 Object，返回 Object 将传递给 el-button，当需要根据某些其它状态判定是否可删除时使用


#### orderable

排序默认使用 el-button，根据自己的需要选择合适的配置。

- Boolean：可选值 true/false，当不需要自定义 UI 时，使用 Boolean 值即可
- Object：el-button 属性，当需要自定义 UI 时使用

orderable 为 Object 的配置说明：

| 参数            | 说明                 | 类型                    | 可选值 | 是否必传 | 默认值 |
| --------------- | -------------------- | ----------------------- | ------ | -------- | ------ |
| moveUp          |  往下按钮属性          | Object                  | -      | 否       | -  |
| moveDown        |  往上按钮属性          | Object                  | -      | 否       | -      |


## Object Fieldset

类型为 object 的 Schema，通过 properties 属性定义列表内 Form Item。

```javascript
{
  title: '个人信息',
  description: '请详细填写个人信息',
  type: 'object',
  order: ['age', 'name'],
  disabled: true,
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
    }
  }
}
```

### Object Fieldset Attributes

| 参数        | 说明                                                         | 类型            | 可选值 | 是否必传 | 默认值 |
| ----------- | ------------------------------------------------------------ | --------------- | ------ | -------- | ------ |
| type        | 类型                                                         | String          | object | 是       | object |
| title       | 控件组标题                                                   | String/动态组件 | -      | 否       | -      |
| description | 控件组描述                                                   | String/动态组件 | -      | 否       | -      |
| order       | 为对象排序，碰到调整顺序的需求时，无需移动子项的代码，只需要使用 order 去调整即可 | String[]        | -      | 否       | -      |
| properties  | 控件组子项配置                                               | Object          | -      | 否       | -      |
| disabled | 是否禁用控件组，会继承父控件组的值     | Boolean                  | true/false      | 否       | false      |


### 更多
- [JSON Schema](https://json-schema.org/ "JSON Schema")
- [FieldSet](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/fieldset, "fieldset")
