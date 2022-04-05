import { useEffect } from "react";
import { useForm, RefItem } from "react-ref-form";
import FiledsTable from "../utils/customerComponents/FiledsTable";
import Input from "../utils/customerComponents/Input";
import { Button} from "antd";
import { getData } from "../constants";
import _ from "lodash";
import { Marked } from "../utils/markdown";
import { shouldVaild1 } from "./constants";

const info = [
  {
    label: "换热站设计流量1",
    keyName: "stationDesignedG1",
    required: true,
    rules: [{ pattern: /\w+/g, message: "请输入内容" }],
    value: Input
  },
  {
    label: "换热站设计流量2",
    keyName: "stationDesignedG2",
    rules: [{ pattern: /\w+/g, message: "请输入内容" }],
    value: Input
  },
  {
    label: "换热站设计流量3",
    keyName: "stationDesignedG3",
    rules: [{ pattern: /\w+/g, message: "请输入内容" }],
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

  const submit = () => {
    // 摘去不要校验的
    const notRequiredPaths = _.reduce(
      form.data.stationDesignedG4,
      (all, { required }, key) => {
        if (!required) {
          return [...all, `stationDesignedG4.${key}.value`];
        }
        return all;
      },
      [] as string[]
    );

    form.validateFields(
      (error, value) => {
        if (!error) {
          console.log(value);
        } else {
          console.log(error);
        }
      },
      (key) => {
        console.log(key, 2222);
        return !notRequiredPaths.includes(key);
      }
    );
  };

  return (
    <>
      <h1>添加提交校验规则</h1>
      <h3>表格中只有勾选的才会去校验</h3>
      <RefItem colCount={1} labelColSpan={6} options={info} form={form} />
      <Button onClick={submit}>提交</Button>
      <Marked markdown={shouldVaild1} />
    </>
  );
};
