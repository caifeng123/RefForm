# 项目名称

react-ref-form

### [点击试试demos](https://caifeng123.github.io/react-ref-form/docs/)

## 简介

> 所有组件都可配置式，且渲染效率提升，只会在自身和自身依赖项变化时重新渲染
> 自定义组件提供了丰富的表单功能

## 详情

### 1、使用ref构造的form表单

> 默认谁变化谁渲染

```tsx
const designInfo = [
    {label: '换热站设计流量1', keyName: 'stationDesignedG', rules: [{pattern: /\w+/g, message: '请输入内容'}], required: true, value: Edit},
    {label: '换热站设计流量2', keyName: 'stationDesignedG1', rules: [{pattern: /\w+/g, message: '请输入内容'}], value: Edit},
    {label: '换热站设计流量3', keyName: 'stationDesignedG2', rules: [{pattern: /\w+/g, message: '请输入内容'}], value: Edit},
    {label: '换热站设计流量4', keyName: 'params', value: FiledsTable},
];

// html
<RefItem
    colCount={1}
    options={designInfo}
    form={form}
/>
```

![1](https://raw.githubusercontent.com/caifeng123/pictures/master/1.gif)

### 2、添加渲染依赖项

> 使用后deps属性后，当依赖项变化时也会跟着重新渲染

```tsx
const designInfo = [
    {label: '换热站设计流量1', keyName: 'stationDesignedG', rules: [{pattern: /\w+/g, message: '请输入内容'}], required: true, value: Edit},
    {label: '换热站设计流量2', keyName: 'stationDesignedG1', rules: [{pattern: /\w+/g, message: '请输入内容'}], value: Edit, deps: ['stationDesignedG']},
    {label: '换热站设计流量3', keyName: 'stationDesignedG2', rules: [{pattern: /\w+/g, message: '请输入内容'}], value: Edit, deps: DEPS.ALL},
    {label: '换热站设计流量4', keyName: 'params', value: FiledsTable},
];
```

![2](https://raw.githubusercontent.com/caifeng123/pictures/master/chrome-capture%20(13).gif)

## api

**\<RefItem />**

> 作为表单的入口，控制表单渲染样式和内容

API

| Property            | Description                                                     | Type                        | Default  | Required |
| ------------------- | --------------------------------------------------------------- | --------------------------- | -------- | -------- |
| Form                | 通过useForm生成的对象                                           | FormProps                   | -        | ✓       |
| options             | 通过配置表单项渲染列表                                          | OptionProps[]               | -        | ✓       |
| labelColSpan        | label所占宽度份数                                               | number                      | 3        |          |
| withColon           | label后是否要跟冒号                                             | boolean                     | true     |          |
| colCount            | 一行几列                                                        | number                      | 2        |          |
| position            | 单个表单项在固定空间中所处位置                                  | 'start'\| 'center' \| 'end' | 'start'  |          |
| contentDisplay      | 内容表现形式`<br>` inline - 元素本身大小 block - 撑满剩余大小 | 'inline'\| 'block'          | 'inline' |          |
| customItemClassName | 自定义样式                                                      | string                      | ''       |          |


**\<CustomComponent />**

> 作为用户的自定义组件的HOC，为自定义组件添加了丰富的表单功能

| Property     | Description                                                  | Type                                                         |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| onChange     | 表单值变化函数<br>e:新的值或回调函数<br>key:单项的key<br>options.prevValidate判断是否校验<br/>options.atTop 是否从顶端修改 | (e: any, key?: string, options?: {<br/>    prevValidate?: (e?: string) => boolean;<br/>    atTop?: boolean;<br/>}) => void |
| value        | 表单项的值                                                   | Any                                                          |
| error        | 表单项的错误                                                 | String                                                       |
| validate     | func自定义校验函数<br>key自定义子组件key                     | (func: (val: string) => string \| undefined, key?: string) => void |
| getError     | 获取其他表单项错误值<br>                                     | (key: string, getTop?: boolean) => any                       |
| getValue     | 获取其它表单项的值                                           | (key: string, getTop?: boolean) => any                       |
| keyName      | 表单keyName                                                  | String                                                       |
| subject      | 用作广播修改项 详见RXJS                                      | Subject\<string>                                             |
| setFormValue | 修改表单值                                                   | (e: Record<string, any> \| ((e: Record<string, any>) => Record<string, any>)) => void; |
