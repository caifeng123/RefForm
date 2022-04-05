/**
 * 自定义select框 只是为了显示一个渲染条
 * 实际使用直接options配置 component: Select即可 方便快捷
 */

import { Shine } from "./ui";
import { Select } from "antd";
import { CustomComponent } from "react-ref-form";

export default ({ value, onChange, error, options }: CustomComponent) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <Shine key={Math.random()} />
    <Select value={value} onChange={onChange as any} options={options} />
    <div style={{ color: "red" }}>{error}</div>
  </div>
);
