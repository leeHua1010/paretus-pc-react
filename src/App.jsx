import { Suspense } from "react";
import { ConfigProvider } from "antd";
import Router from "~/router/index.jsx";

function App() {
  const themeOverrides = {
    token: {
      colorPrimary: "#4945ff",
    },
  };

  return (
    <ConfigProvider theme={themeOverrides}>
      <Suspense fallback={null}>
        <Router />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
