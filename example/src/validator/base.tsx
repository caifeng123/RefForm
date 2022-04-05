import { useEffect } from "react";
import { useForm, RefItem, CustomComponent } from "react-ref-form";
import Input from "../utils/customerComponents/Input";
import { Button, Input as AI } from "antd";
import { Marked } from "../utils/markdown";
import { base1, base2 } from "./constants";

const CustomerInput = ({
  value,
  onChange,
  error,
  validate
}: CustomComponent) => {
  useEffect(() => {
    validate((value) => {
      if (!value) return "请输入内容";
      if (value.length > 10) {
        return "最多10个字符";
      }
      return;
    });
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AI onChange={(e) => onChange(e.target.value)} value={value} />
      <div style={{ color: "red" }}>{error}</div>
    </div>
  );
};

const info1 = [
  {
    label: "换热站设计流量1",
    key: "stationDesignedG1",
    rules: [
      { pattern: /\w+/g, message: "请输入内容" },
      { pattern: /^\w{1,10}$/, message: "最多10个字符" }
    ],
    value: Input
  }
];

const info2 = [
  {
    label: "换热站设计流量2",
    key: "stationDesignedG2",
    required: true,
    value: CustomerInput
  }
];

export default () => {
  const form = useForm();

  const submit = () => {
    form.validateFields((error, value) => {
      if (!error) {
        console.log(value);
      } else {
        console.log(error);
      }
    });
  };

  return (
    <>
      <h1>校验</h1>
      <h3>1、options中添加rules</h3>
      <RefItem colCount={1} labelColSpan={6} options={info1} form={form} />
      <Marked markdown={base1} />

      <h3>2、自定义组件添加自定义校验函数</h3>
      <RefItem colCount={1} labelColSpan={6} options={info2} form={form} />
      <Marked markdown={base2} />

      <h3>3、提交时再进行校验</h3>
      <Button onClick={submit}>提交</Button>
    </>
  );
};
