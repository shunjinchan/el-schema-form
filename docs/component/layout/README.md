# Layout

表单布局参数，布局功能是在 el-row/el-col 基础上进行封装的。布局分为行与列，支持多行多列布局。

## 行

| 参数     | 说明                                                         | 类型   | 可选值 | 是否必传 | 默认值 |
| -------- | ------------------------------------------------------------ | ------ | ------ | -------- | ------ |
| title    | 行标题                                                       | String | -      | 否       | -      |
| rowAttrs | el-row 属性，在组件内部使用 v-bind="rowAttrs" 将属性传递给 el-row，具体参数可查看 el-row 文档 | Object | -      | 否       | -      |
| col      | 列                                                           | Array  | -      | 否       | -      |

## 列

| 参数     | 说明                                                         | 类型   | 可选值 | 是否必传 | 默认值 |
| -------- | ------------------------------------------------------------ | ------ | ------ | -------- | ------ |
| title    | 列标题                                                       | String | -      | 否       | -      |
| colAttrs | el-col 属性，在组件内部使用 v-bind="colAttrs" 将属性传递给 el-col，具体参数可查看 el-col 文档 | Object | -      | 否       | -      |
| fields   | 当前列的控件列表                                             | Array  | -      | 否       | -      |

## 示例

```javascript
[
  {
    title: "行标题示例",
    rowAttrs: {
      type: "flex",
      style: "flex-wrap: wrap;"
    },
    col: [
      {
        colAttrs: {
          span: 12
        },
        fields: [
          "name",
          "region",
          "organizer",
          "date",
          "count",
          "delivery",
          "types",
          "resource",
          "desc"
        ],
        title: "列标题示例"
      },
      {
        colAttrs: {
          span: 12
        },
        fields: [
          // 'name',
          "image",
          "color",
          "dynamic_component",
          "dynamic_component2",
          "link",
          "plain_text",
          "hobby"
        ],
        title: "列标题示例"
      }
    ]
  },
  {
    title: "复杂例子",
    rowAttrs: {
      type: "flex",
      style: "flex-wrap: wrap;"
    },
    col: [
      {
        colAttrs: {
          span: 18
        },
        fields: ["users"],
        title: "用户列表"
      }
    ]
  }
];
```
