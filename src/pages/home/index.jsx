import { Fragment, useEffect, useState } from "react";
import articleApi from "~/api/article";
import { usePaginate } from "~/hooks";
import { stringify } from "~/utils/utils";
import { useInfiniteScroll } from "ahooks";
import { formatRelativeTime } from "~/utils/time";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useScroll } from "ahooks";

export default function Home() {
  const [hotArticles, setHotArticles] = useState([]);
  const { pageSize } = usePaginate(100);
  const navigate = useNavigate();
  const scroll = useScroll(document.getElementById("layout"));

  useEffect(() => {
    getHotArticles();
  }, []);

  const getLoadMoreList = async (page, pageSize) => {
    const query = stringify({
      populate: ["user"],
      pagination: { page, pageSize },
      sort: ["createdAt:desc"],
    });
    const { data } = await articleApi.list(query);
    return {
      list: data.data,
      total: data.meta.pagination.total,
    };
  };

  const { data, loading } = useInfiniteScroll(
    (d) => {
      const page = d ? Math.ceil(d.list.length / pageSize) + 1 : 1;
      return getLoadMoreList(page, pageSize);
    },
    {
      target: document.getElementById("layout"),
      isNoMore: (data) => data?.list?.length >= data?.total,
    },
  );

  const getHotArticles = async () => {
    const query = stringify({
      pagination: { page: 1, pageSize: 10 },
      sort: ["views:desc"],
    });
    const { data: res } = await articleApi.list(query);
    setHotArticles(res.data);
  };

  const checkDetail = (id) => navigate("/article/detail", { state: { id } });

  const onBackTop = () => {
    document.getElementById("layout").scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex">
      <div className="flex-1">
        {loading ? (
          <div className="animate-bounce text-xl">loading...</div>
        ) : (
          <Fragment>
            {data?.list?.map((item) => (
              <div
                key={item.id}
                className="bg-white py-2 px-4 rounded-md mb-3 cursor-pointer hover:bg-light-200"
                onClick={() => checkDetail(item.id)}
              >
                <div className="flex items-center text-[#8a919f] text-sm">
                  <div>{item?.user?.username}</div>
                  <Divider type="vertical" />
                  <div>{formatRelativeTime(item.createdAt)}</div>
                </div>
                <div className="font-600 py-3">{item.title}</div>
                <div className="text-[#6B6B6B] text-13px">{item.content.substring(0, 36)}</div>
                <div className="flex items-center justify-between text-[#6B6B6B] mt-2">
                  <div className="flex items-center text-[#8a919f]">
                    <div className="flex items-center mr-5 text-sm">
                      <i className="i-tabler-eye text-base"></i>
                      <div className="pl-1">{item.views}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Fragment>
        )}
      </div>

      <div className="ml-6">
        <div className="bg-white rounded-md p-4 w-64">
          <div className="font-bold pb-3 border border-b-solid border-b-[#e4e6eb]">热榜 🔥</div>
          {hotArticles.map((item) => (
            <div
              key={item.id}
              onClick={() => checkDetail(item.id)}
              className="pt-4 text-sm cursor-pointer truncate hover:opacity-70"
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>

      <Fragment>
        {scroll?.top > 1688 && (
          <div
            onClick={onBackTop}
            className="absolute right-10 bottom-12 bg-white w-10 h-10 rounded-1/2 flex items-center justify-center shadow cursor-pointer"
          >
            <i className="i-tabler-arrow-bar-to-up text-xl" />
          </div>
        )}
      </Fragment>
    </div>
  );
}
