import { Suspense } from "react";
import { ConfigProvider } from "antd";
import Router from "~/router/index.jsx";
import { AliveScope } from "react-activation";

function App() {
  const themeOverrides = {
    token: {
      colorPrimary: "#4945ff",
    },
  };

  return (
    <ConfigProvider theme={themeOverrides}>
      <Suspense fallback={null}>
        <AliveScope>
          <Router />
        </AliveScope>
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
