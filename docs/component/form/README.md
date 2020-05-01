# Form

```html
<el-schema-form
  :schema="schema"
  :model="model"
  :config="config"
  :auto-config="true"
  :layout="layout"
  @add="handleAddField"
></el-schema-form>
```

## Form Attributes

El Schema Form 参数包括：

| 参数       | 说明                                        | 类型    | 可选值     | 是否必传 | 默认值 |
| ---------- | ------------------------------------------- | ------- | ---------- | -------- | ------ |
| schema     | 表单描述                                    | Object  | -          | 是       | -      |
| model      | 表单值                                      | Object  | -          | 是       | -      |
| layout     | 表单布局，如果没有传 layout，则默认一行一列 | Array   | -          | 否       | -      |
| config     | 表单配置                                    | Object  | -          | 否       | null   |
| autoUpdate | 是否自动更新 model                          | Boolean | true/false | 否       | true  |
| submitButton | 提交按钮                          | Boolean/Object | - | 否       | false  |
| cancelButton | 取消按钮                          | Boolean/Object | - | 否       | false  |


::: warning
文档的其他地方提到 Form Schema 是在 JSON Schema 基础下进行扩展的一种定义表单的规范。表现形式上，Form Schema 仍然是 JSON。
但是，调用 el-schema-form 时，组件接收的 schema 必须是一个 JavaScript 对象。
model 与 layout 同理。
:::

### autoUpdate

是否自动更新 model，交由使用者自己根据业务配置该属性。如果 model 是普通的响应式属性，自动更新 model 可以帮助使用者减少一部分工作。

如果 model 的来源是计算属性，自动更新 model 是无法触发 UI 更新的。这种场景下，需要监听 change 事件自行更新 model。

### 自定义 submitButton

将 submitButton 配置为对象，其属性与 el-button 的保持一致。如果要定制按钮的文案，增加一个 submitButton.text 属性。

### 自定义 cancelButton

将 cancelButton 配置为对象，其属性与 el-button 的保持一致。如果要定制按钮的文案，增加一个 cancelButton.text 属性。


## Form Events

| 事件名          | 说明                     | 回调函数参数                                                |
| --------------- | ------------------------ | ------------------------------------------------------- |
| validate        | 同 el-form               | 同 el-form                                              |
| change          | 任一表单项的值变化后触发 | 表单项 prop 值，表单项新值                              |
| submit          | 点击 submit button 且表单校验通过时触发 | -                              |
| cancel          | 点击 cancel button 时触发 | -                              |
| add       | 添加控件（控件组）       | 当前控件（控件组）父级的 schema                         |
| remove    | 删除控件（控件组）       | 当前控件（控件组）父级的 schema，当前控件（控件组）索引 |
| move-up   | 往上移动控件（控件组）   | 当前控件（控件组）父级的 schema，当前控件（控件组）索引 |
| move-down | 往下移动控件（控件组）   | 当前控件（控件组）父级的 schema，当前控件（控件组）索引 |

## Form Methods

| 方法名        | 说明                                                         | 参数                            |
| ------------- | ------------------------------------------------------------ | ------------------------------- |
| validate      | 同 el-form                                                   | 同 el-form                      |
| validateField | 同 el-form                                                   | 同 el-form                      |
| resetFields   | 同 el-form                                                   | 同 el-form                      |
| clearValidate | 同 el-form                                                   | 同 el-form                      |
| updateSchema  | 更新表单 schema，可传入两个可选参数，第一个参数是 schema，第二个参数是 model | Function(?schema:{}, ?model:{}) |

## Form Slots

| name | 说明                    |
| ---- | ----------------------- |
| -    | form 内容，位于表单底部 |


## Model

model 的数据流向默认是单向的，即 el-form-schema 内部不可直接更新 model，只能通过监听事件的形式更新。

不过，在调用组件传参时，autoUpdate 为 true，在控件更新时允许组件内部更新 model。新增/删除/排序时一定得监听对应的事件更新 model。

### 示例

<<< @/docs/.vuepress/components/complex-model.json

## Config

属性同 el-form，区别有三点：
- 使用方式是将各个属性放在对象 config 对象里
- el-form 的 model 属性将被 v-model 绑定的值覆盖
- 如果 schema.disabled 为 true，效果与 config.disabled 为 true 的效果一样

### 示例

```javascript
{
  labelPosition: 'top',
  inline: false,
  disabled: true,
  size: 'large'
}
```

更多：[el-form](https://element.eleme.cn/#/zh-CN/component/form)
