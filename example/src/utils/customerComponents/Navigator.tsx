import { useNavigate } from "react-router-dom";

export default ({ children }: { children: any }) => {
  const history = useNavigate();
  return (
    <>
      <div
        style={{
          color: "skyblue",
          fontWeight: 700,
          fontSize: 20,
          borderBottom: "1px solid #ccc"
        }}
        onClick={() => history("/")}
      >
        &lt;返回
      </div>
      {children}
    </>
  );
};
