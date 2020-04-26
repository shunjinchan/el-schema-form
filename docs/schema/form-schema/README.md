# Form Schema

Form Schema 是在 JSON Schema 基础下进行扩展的一种定义表单的规范。主要用于：

- 描述数据
- 描述 UI
- 数据验证与表单验证

表现形式上，Form Schema 仍然是 JSON。

:::tip
Form Schema 暂时只支持 JSON Schema 一部分 keywords，之后的迭代中会根据需要增加其他 keywords 的支持。
:::

## 定义简单表单

简单表单：model 相对比较简单，model 属性的值一般是基本类型数据。

<FormDemo component-name="non-nested-form">
</FormDemo>

<<< @/docs/.vuepress/components/NonNestedForm.vue

上面的 Schema 描述了一个值类型为 Object，且有一个属性为 name。name 的表现形态是 Form-Item，对应的控件是文本输入框。Form-Item 的参数详见：[Form-Item](/schema/api/#form-item-attributes "Form-Item")

## 定义复杂嵌套表单

嵌套表单：model 相对比较复杂，属性存在多个层级。

<FormDemo component-name="nested-form">
<<< @/docs/.vuepress/components/NestedForm.vue
</FormDemo>

