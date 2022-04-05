import { getSummary } from "../utils/markdown";

export const markdown = getSummary({
  summary: "点击查看示例代码",
  detail: `
import { useEffect } from "react";
import { useForm, RefItem } from "react-ref-form";
import FiledsTable from "../customerComponents/FiledsTable";
import Input from "../customerComponents/Input";
import { getData } from "../constants";
import { Wrapper } from "./ui";

const designInfo = [
  {
    label: "换热站设计流量1",
    keyName: "stationDesignedG1",
    required: true,
    value: Input
  },
  {
    label: "换热站设计流量2",
    keyName: "stationDesignedG2",
    value: Input
  },
  {
    label: "换热站设计流量3",
    keyName: "stationDesignedG3",
    value: Input
  },
  {
    label: "换热站设计流量4",
    keyName: "stationDesignedG4",
    value: FiledsTable
  }
];

export default () => {
  const form = useForm();

  useEffect(() => {
    getData().then((res: any) => form.setFormValue(res));
  }, []);

  return (
    <Wrapper>
      <h1>基本用法</h1>
      <h3>1、1列 label占比6/24</h3>
      <RefItem colCount={1} labelColSpan={6} options={designInfo} form={form} />
      <h3>2、1列 label占比9/24</h3>
      <RefItem colCount={1} labelColSpan={9} options={designInfo} form={form} />
      <h3>3、2列 label占比6/24</h3>
      <RefItem colCount={2} labelColSpan={6} options={designInfo} form={form} />
    </Wrapper>
  );
};
  `,
  language: "javascript"
});

export const markdown2 = getSummary({
  summary: "点击查看示例代码",
  detail: `
import { useEffect } from "react";
import { useForm, RefItem, DEPS, CustomComponent } from "react-ref-form";
import {Input as AntdInput} from 'antd';
import { getData } from "../constants";

const Input = ({ value, onChange, error, validate }: CustomComponent) => {
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
      <AntdInput onChange={(e) => onChange(e.target.value)} value={value} />
      <div style={{ color: "red" }}>{error}</div>
    </div>
  );
};

const designInfo = [
  {
    label: "换热站设计流量1",
    keyName: "stationDesignedG",
    required: true,
    value: Input
  }
];
export default () => {
  const form = useForm();

  useEffect(() => {
    getData().then((res: any) => form.setFormValue(res));
  }, []);

  return (
      <RefItem colCount={1} labelColSpan={6} options={designInfo} form={form} />
  );
};  
`,
  language: "javascript"
});
