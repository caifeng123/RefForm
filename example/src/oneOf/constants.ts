import { getSummary } from "../utils/markdown";

export const markdown = getSummary({
  summary: "点击查看示例代码",
  detail: `
import { useForm, RefItem } from "react-ref-form";
import {Button,Select,notification, Input} from 'antd'
import { Wrapper } from "./ui";

const designInfo = [
  {
    label: "换热站设计流量1",
    key: "stationDesignedG1",
    required: true,
    rules:[{required: true, message:'必填'}],
    value: Input
  },
  {
    label: "换热站设计流量2",
    key: "stationDesignedG2",
    value: Input
  },
  {
    label: "选择我",
    key: "stationDesignedG4",
    component: Select,
    options:[{label:'aa',value:'aa'},{label:'bb',value:'bb'}],
    oneOf: {
      'aa': [{
        label: "输入aaa试试",
        key: "stationDesignedGcc",
        className:'123',
        required:true,
        rules:[{required: true, message:'必填'}],
        value: Input,
        oneOf: {
          'aaa': [{
            label: "换热站设计流量aaa",
            key: "stationDesignedGaaa",
            className:'123',
            required:true,
            rules:[{required: true, message:'必填'}],
            value: Input,
          }]
        }
      },{
        label: "换热站设计流量dd",
        key: "stationDesignedGdd",
        value: Input
      }],
      'bb': [{
        label: "换热站设计流量bb",
        key: "stationDesignedGbb",
        value: Input
      }]
    }
  },
  {
    label: "换热站设计流量3",
    key: "stationDesignedG3",
    value: Input
  },
];

export default () => {
  const form = useForm();

  const submit = () => {
    form.validateFields((err, value) => {
      if(err){
        console.log('err:', err);
        notification.error({message: err[0]})
      }else{
        console.log('value:', value);
        notification.success({message: '提交成功 看控制台'})
      }
    })
  }

  return (
    <Wrapper>
      <h1>分叉选择</h1>
      <h3>某一项变化导致其它渲染项变化,在选择时，会出现不同校验情况，点击提交尝试</h3>
      <RefItem colCount={1} labelColSpan={6} options={designInfo} form={form} />
      <Button onClick={submit}>提交</Button>
    </Wrapper>
  );
};
  `,
  language: "javascript"
});
