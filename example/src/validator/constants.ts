import {getSummary} from '../utils/markdown';

export const base1 = getSummary({
    summary: '点击查看示例代码',
    detail: `
import { useEffect } from "react";
import { useForm, RefItem, CustomComponent } from "react-ref-form";
import {Input as AntdInput} from 'antd';

const Input = ({ value, onChange, error }: CustomComponent) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <AntdInput onChange={(e) => onChange(e.target.value)} value={value} />
    <div style={{color: 'red'}}>{error}</div>
  </div>
);

const info = [
  {
    label: "换热站设计流量1",
    key: "stationDesignedG1",
    rules: [
      { pattern: /\\w+/g, message: "请输入内容" },
      { pattern: /^\\w{1,10}$/, message: "最多10个字符" }
    ],
    value: Input
  }
];

export default () => {
  const form = useForm();

  return (
    <>
      <RefItem colCount={1} labelColSpan={6} options={info} form={form} />
      <Button onClick={submit}>提交</Button>
    </>
  );
};  
  `,
    language: 'javascript'
});

export const base2 = getSummary({
    summary: '点击查看示例代码',
    detail: `
import { useEffect } from "react";
import { useForm, RefItem, CustomComponent } from "react-ref-form";
import {Input as AntdInput} from 'antd';

const CustomerInput = ({
  value,
  onChange,
  error,
  validate
}: CustomComponent) => {
  useEffect(() => {
    validate((value) => {
      if (!value) return "请输入内容";
      if (value.length > 10) return "最多10个字符";
    });
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AI onChange={(e) => onChange(e.target.value)} value={value} />
      <div style={{ color: "red" }}>{error}</div>
    </div>
  );
};

const info = [
  {
    label: "换热站设计流量2",
    key: "stationDesignedG2",
    required: true,
    value: CustomerInput
  }
];

export default () => {
  const form = useForm();

  return (
    <>
      <RefItem colCount={1} labelColSpan={6} options={info} form={form} />
      <Button onClick={submit}>提交</Button>
    </>
  );
};  
  `,
    language: 'javascript'
});

export const shouldVaild1 = getSummary({
    summary: '点击查看示例代码',
    detail: `
import { useEffect } from "react";
import { useForm, RefItem, CustomComponent } from "react-ref-form";
import {Input as AntdInput} from 'antd';

const CustomerInput = ({
  value,
  onChange,
  error,
  validate
}: CustomComponent) => {
  useEffect(() => {
    validate((value) => {
      if (!value) return "请输入内容";
      if (value.length > 10) return "最多10个字符";
    });
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AI onChange={(e) => onChange(e.target.value)} value={value} />
      <div style={{ color: "red" }}>{error}</div>
    </div>
  );
};

const info = [
  {
    label: "换热站设计流量2",
    key: "stationDesignedG2",
    required: true,
    value: CustomerInput
  }
];

export default () => {
  const form = useForm();

  return (
    <>
      <RefItem colCount={1} labelColSpan={6} options={info} form={form} />
      <Button onClick={submit}>提交</Button>
    </>
  );
};  
  `,
    language: 'javascript'
});
