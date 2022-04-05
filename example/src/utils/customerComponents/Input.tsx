import { Shine } from "./ui";
import { Input } from "antd";
import { CustomComponent } from "react-ref-form";

export default ({ value, onChange, error }: CustomComponent) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <Shine key={Math.random()} />
    <Input onChange={(e) => onChange(e.target.value)} value={value} />
    <div style={{ color: "red" }}>{error}</div>
  </div>
);
