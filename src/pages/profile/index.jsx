import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { stringify } from "~/utils/utils";
import { usePaginate } from "~/hooks";
import articleApi from "~/api/article";
import mediaApi from "~/api/media";
import { formatTime } from "~/utils/time";
import { useAppStore } from "~/store/app";
import { Tabs, Pagination, Upload } from "antd";
import { useHover } from "ahooks";
import userApi from "~/api/user";
import { getAvatarSrc } from "~/utils/utils";
import storage from "~/utils/storage";

export default function Profile() {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const avatarRef = useRef(null);

  const isAvararHover = useHover(avatarRef);
  const navigate = useNavigate();
  let { page, setPage, pageSize } = usePaginate(10);
  const appStore = useAppStore((state) => state);

  useEffect(() => {
    getArticles();
  }, [page]);

  const getArticles = async () => {
    const query = stringify({
      populate: ["user"],
      pagination: { page, pageSize },
      sort: ["updatedAt:desc"],
      filters: { user: { username: { $eq: appStore.userInfo?.username } } },
    });
    const { data: res } = await articleApi.list(query);
    setArticles(res.data);
    setPagination(res.meta.pagination);
  };

  const checkDetail = async (item) => {
    const data = { ...item, views: item.views + 1 };
    await articleApi.update(item.id, data);
    navigate("/article/detail", { state: { id: item.id } });
  };

  const TabPlane = () => {
    return (
      <div className="rounded-md">
        {articles.length ? (
          articles.map((item) => (
            <div
              key={item.id}
              onClick={() => checkDetail(item)}
              className="border-b border-b-solid rounded-md border-b-[#EFEFF5] py-3 last:!border-none"
            >
              <div className="font-bold">{item.title}</div>
              <div className="text-sm pt-1 text-[#8590a6]">{formatTime(item.createdAt)}</div>
            </div>
          ))
        ) : (
          <div>暂无数据...</div>
        )}
        <div className="flex py-4 justify-center">
          <Pagination
            current={page}
            total={pagination?.total}
            hideOnSinglePage
            simple
            onChange={onPageChange}
          ></Pagination>
        </div>
      </div>
    );
  };

  const items = [
    {
      key: "1",
      label: "Article",
      children: <TabPlane />,
    },
  ];

  const onPageChange = (page) => {
    setPage(page);
  };

  const onBeforeUpload = async (file) => {
    const { data } = await mediaApi.upload({ files: file });
    const query = stringify({ populate: ["avatar"] });
    await userApi.update(appStore.userInfo.id, query, { ...appStore.userInfo, avatar: data[0].id });
    const { data: userInfo } = await userApi.me(query);
    storage.setUserInfo(userInfo);
    appStore.setUserInfo(userInfo);
    return false;
  };

  return (
    <div className="rounded-md">
      <div className="rounded-md flex bg-gray-200 h-48 mb-3 px-6 items-center">
        <div ref={avatarRef} className="relative">
          <Upload beforeUpload={onBeforeUpload} fileList={[]} action="">
            {getAvatarSrc() ? (
              <img className="rounded-xl h-22 w-22" src={getAvatarSrc()} alt="avatar" />
            ) : (
              <div className="rounded-xl bg-[#6a69ff] h-22 text-white text-5xl w-22 fcc">
                {appStore.userInfo?.username?.charAt(0).toUpperCase()}
              </div>
            )}
            {isAvararHover && (
              <div className="rounded-xl flex-col bg-[#191b1f] bg-opacity-40  h-22 text-white top-0 left-0 w-22 absolute fcc">
                <i className="text-2xl i-tabler-camera"></i>
                <div>修改头像</div>
              </div>
            )}
          </Upload>
        </div>
        <div className="pl-4">
          <div className="font-bold pt-1 text-3xl">{appStore.userInfo?.username}</div>
          <div className="mt-1 text-sm text-gray-600">
            {appStore.userInfo?.motto || "暂无个性签名"}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-md mb-8 px-4">
        <Tabs items={items} />
      </div>
    </div>
  );
}
