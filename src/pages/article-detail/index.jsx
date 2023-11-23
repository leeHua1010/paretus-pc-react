import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import articleApi from "~/api/article";
import { stringify } from "~/utils/utils";
import { Viewer, plugins } from "~/plugins/mdEditor";
import { formatTime } from "~/utils/time";

export default function ArticleDetail() {
  const location = useLocation();
  const [articleDetail, setArticleDetail] = useState(null);

  useEffect(() => {
    getDetail();
  }, []);

  async function getDetail() {
    const query = stringify({ populate: ["user"] });
    const { data: res } = await articleApi.detail(location.state.id, query);
    setArticleDetail(res.data);
  }

  return (
    <div className="bg-white p-4 rounded-md text-base mb-8">
      <div className="text-xl font-bold">{articleDetail?.title}</div>
      <div className="flex items-center pt-4 pb-2">
        <div className="bg-[#6a69ff] rounded-1/2 w-10 h-10 fcc text-white text-xl">
          {articleDetail?.user?.username?.charAt(0).toUpperCase()}
        </div>
        <div className="pl-2 text-sm">
          <div className="font-bold">{articleDetail?.user?.username}</div>
          <div className="text-zinc-400 pt-1">{formatTime(articleDetail?.createdAt)}</div>
        </div>
      </div>
      <div className="my-4">
        <Viewer value={articleDetail?.content} plugins={plugins} />
      </div>
    </div>
  );
}
