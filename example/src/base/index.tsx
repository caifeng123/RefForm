import { useEffect } from "react";
import { useForm, RefItem } from "react-ref-form";
import FiledsTable from "../utils/customerComponents/FiledsTable";
import Input from "../utils/customerComponents/Input";
import { getData } from "../constants";
import { Wrapper } from "./ui";
import { Marked } from "../utils/markdown";
import { markdown } from "./constants";

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
      <Marked markdown={markdown} />
    </Wrapper>
  );
};
