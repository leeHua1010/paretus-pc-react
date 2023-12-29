import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import authApi from "~/api/auth";
import userApi from "~/api/user";
import storage from "~/utils/storage";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "~/store/app";
import { stringify } from "~/utils/utils";

export default function Register() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const key = "register";
  const appStore = useAppStore((state) => state);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      messageApi.open({ key, type: "loading", content: "Register..." });
      const { data } = await authApi.register(values);
      storage.setToken(data.jwt);
      const query = stringify({ populate: ["avatar"] });
      const { data: userInfo } = await userApi.me(query);
      storage.setUserInfo(userInfo);
      appStore.setUserInfo(userInfo);
      messageApi.open({ key, type: "success", content: "Welcome back!", duration: 2 });
      navigate("/", { replace: true });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const goSignin = () => navigate("/auth/login");

  return (
    <div className="fcc">
      {contextHolder}
      <div className="w-100">
        <div className="text-center pt-16">
          <div>
            <i className="text-6xl text-[#4945ff] i-tabler-aperture"></i>
          </div>
          <div className="font-bold pt-2 pb-8 text-2xl">Sign up to your account</div>
        </div>
        <Form name="loginForm" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input placeholder="Please input email" size="large" autoComplete="off" />
          </Form.Item>
          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input placeholder="Please input username" size="large" autoComplete="off" />
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
              Sign up
            </Button>
          </Form.Item>
          <Form.Item>
            <div className="my-0 text-gray-500">
              <span>Had an account?</span>
              <span className="font-semibold text-[#4945ff]" onClick={goSignin}>
                {" "}
                Sign in
              </span>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
