import { Suspense } from "react";
import { ConfigProvider, Spin } from "antd";
import Router from "~/router/index.jsx";

function App() {
  const themeOverrides = {
    token: {
      colorPrimary: "#4945ff",
    },
  };

  return (
    <ConfigProvider theme={themeOverrides}>
      <Suspense fallback={<Spin />}>
        <Router />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
