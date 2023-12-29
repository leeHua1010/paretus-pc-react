import { useEffect, useState } from "react";
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
  const { pageSize } = usePaginate();
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

  const checkDetail = async (item) => {
    const data = { ...item, views: item.views + 1 };
    await articleApi.update(item.id, data);
    navigate("/article/detail", { state: { id: item.id } });
  };

  const onBackTop = () => {
    document.getElementById("layout").scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex">
      <div className="flex-1">
        {loading ? (
          <div className="text-xl animate-bounce">loading...</div>
        ) : (
          <>
            {data?.list?.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-md cursor-pointer mb-3 py-2 px-4 hover:bg-light-200"
                onClick={() => checkDetail(item)}
              >
                <div className="flex text-sm text-[#8a919f] items-center">
                  <div>{item?.user?.username}</div>
                  <Divider type="vertical" />
                  <div>{formatRelativeTime(item.createdAt)}</div>
                </div>
                <div className="font-600 py-3">{item.title}</div>
                <div className="text-[#6B6B6B] text-13px">{item.content.substring(0, 36)}</div>
                <div className="flex mt-2 text-[#6B6B6B] items-center justify-between">
                  <div className="flex text-[#8a919f] items-center">
                    <div className="flex mr-5 text-sm items-center">
                      <i className="text-base i-tabler-eye"></i>
                      <div className="pl-1">{item.views}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="ml-6">
        <div className="bg-white rounded-md p-4 w-64">
          <div className="border border-b-solid font-bold border-b-[#e4e6eb] pb-3">热榜 🔥</div>
          {hotArticles.map((item) => (
            <div
              key={item.id}
              onClick={() => checkDetail(item)}
              className="cursor-pointer text-sm pt-4 truncate hover:opacity-70"
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>

      <>
        {scroll?.top > 1688 && (
          <div
            onClick={onBackTop}
            className="bg-white cursor-pointer flex rounded-1/2 h-10 shadow right-10 bottom-12 w-10 absolute items-center justify-center"
          >
            <i className="text-xl i-tabler-arrow-bar-to-up" />
          </div>
        )}
      </>
    </div>
  );
}
