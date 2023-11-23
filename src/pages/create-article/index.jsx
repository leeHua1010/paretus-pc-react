import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Editor, plugins } from "~/plugins/mdEditor";
import articleApi from "~/api/article";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "~/store/app";

export default function CreateArticle() {
  const [content, setContent] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const key = "publish";

  const appStore = useAppStore((state) => state);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (!values.title) return messageApi.open({ type: "warning", content: "Please input title." });
    if (!content) return messageApi.open({ type: "warning", content: "Please input content." });

    messageApi.open({ key, type: "loading", content: "Publish..." });
    await articleApi.create({
      data: { content, views: 0, ...values, user: { connect: [appStore.userInfo.id] } },
    });
    messageApi.open({ key, type: "success", content: "Published!", duration: 2 });

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const onChange = (value) => {
    setContent(value);
  };

  return (
    <div className="bg-white rounded-md mb-4 w-full p-5 <sm:p-0">
      {contextHolder}
      <Form name="loginForm" layout="vertical" onFinish={onFinish}>
        <Form.Item label="Title" name="title" className="mb-6">
          <Input placeholder="Please input title" />
        </Form.Item>

        <Editor value={content} plugins={plugins} onChange={onChange} />

        <div className="flex justify-center mt-8">
          <Form.Item className="w-98 <sm:w-72">
            <Button type="primary" block size="large" shape="round" htmlType="submit">
              Publish
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
