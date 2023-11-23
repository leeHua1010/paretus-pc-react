import { Form, Input, Button, message } from "antd";
import authApi from "~/api/auth";
import storage from "~/utils/storage";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "~/store/app";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const key = "login";
  const navigate = useNavigate();
  const appStore = useAppStore();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      messageApi.open({ key, type: "loading", content: "Login..." });
      const { data } = await authApi.login(values);
      storage.setToken(data.jwt);
      storage.setUserInfo(data.user);
      appStore.setUserInfo(data.user);
      messageApi.open({ key, type: "success", content: "Welcome back!", duration: 2 });
      setLoading(false);
      navigate("/", { replace: true });
    } catch (error) {
      setLoading(false);
    }
  };

  const goRegister = () => navigate({ pathname: "/auth/register" });

  return (
    <div className="fcc">
      {contextHolder}
      <div className="w-100">
        <div className="text-center pt-16">
          <div>
            <i className="text-6xl text-[#4945ff] i-tabler-aperture"></i>
          </div>
          <div className="font-bold pt-2 pb-8 text-2xl">Sign in to your account</div>
        </div>
        <Form name="loginForm" layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="identifier" rules={[{ required: true }]}>
            <Input placeholder="Please input email" size="large" autoComplete="off" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password
              placeholder="Please input password"
              size="large"
              minLength="6"
              maxLength="18"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              block
              size="large"
              shape="round"
              htmlType="submit"
              className="mt-4"
              loading={loading}
            >
              Sign in
            </Button>
          </Form.Item>
          <Form.Item>
            <div className="my-0 text-gray-500">
              <span>Don&apos;t have account?</span>
              <span className="font-semibold text-[#4945ff]" onClick={goRegister}>
                {" "}
                Sign up
              </span>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
