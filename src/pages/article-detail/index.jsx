import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import articleApi from "~/api/article";
import { stringify } from "~/utils/utils";
import { Viewer, plugins } from "~/plugins/mdEditor";
import { formatTime } from "~/utils/time";
import { getAvatarSrc } from "~/utils/utils";

export default function ArticleDetail() {
  const location = useLocation();
  const [articleDetail, setArticleDetail] = useState(null);

  useEffect(() => {
    getDetail();
  }, []);

  async function getDetail() {
    const query = stringify({ populate: ["user"] });
    const { data: res } = await articleApi.read(location.state.id, query);
    setArticleDetail(res.data);
  }

  return (
    <div className="bg-white rounded-md text-base mb-8 p-4">
      <div className="font-bold text-xl">{articleDetail?.title}</div>
      <div className="flex pt-4 pb-2 items-center">
        {getAvatarSrc() ? (
          <img className="rounded-1/2 h-10 w-10" src={getAvatarSrc()} alt="avatar" />
        ) : (
          <div className="bg-[#6a69ff] rounded-1/2 h-10 text-white text-xl w-10 fcc">
            {articleDetail?.user?.username?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="text-sm pl-2">
          <div className="font-bold text-base">{articleDetail?.user?.username}</div>
          <div className="pt-1 text-zinc-400">{formatTime(articleDetail?.createdAt)}</div>
        </div>
      </div>
      <div className="my-4">
        <Viewer value={articleDetail?.content} plugins={plugins} />
      </div>
    </div>
  );
}
