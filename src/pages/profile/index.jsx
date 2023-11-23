import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { stringify } from "~/utils/utils";
import { usePaginate } from "~/hooks";
import articleApi from "~/api/article";
import { formatTime } from "~/utils/time";
import { useAppStore } from "~/store/app";
import { Tabs, Pagination } from "antd";
import "./index.scss";

export default function Profile() {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState(null);

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

  const checkDetail = (id) => {
    navigate("/article/detail", { state: { id } });
  };

  const TabPlane = () => {
    return (
      <div className="rounded-md">
        {articles.length ? (
          articles.map((item) => (
            <div
              key={item.id}
              onClick={() => checkDetail(item.id)}
              className="py-3 border-b rounded-md border-b-solid border-b-[#EFEFF5] last:!border-none"
            >
              <div className="font-bold">{item.title}</div>
              <div className="text-[#8590a6] text-sm pt-1">{formatTime(item.createdAt)}</div>
            </div>
          ))
        ) : (
          <div>暂无数据...</div>
        )}
        <div className="flex justify-center py-4">
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

  return (
    <div className="rounded-md">
      <div className="bg-[#d1d5db] h-48 rounded-md mb-3 flex px-6 items-center profile-gradient">
        <div className="w-22 h-22 rounded-xl bg-[#6a69ff] fcc text-white text-5xl mt-10">
          {appStore.userInfo?.username?.charAt(0).toUpperCase()}
        </div>
        <div className="pl-4 mt-16">
          <div className="font-bold text-2xl pt-1">{appStore.userInfo?.username}</div>
          <div className="text-gray-500 mt-1 text-xm">{appStore.userInfo?.motto || ""}</div>
        </div>
      </div>
      <div className="bg-white px-4 mb-8 rounded-md">
        <Tabs items={items} />
      </div>
    </div>
  );
}
