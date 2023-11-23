import { useState } from "react";

export function usePaginate(defaultPageSize = 15) {
  const [keyword, setKeyWord] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [loadAll, setLoadAll] = useState(false);

  return {
    keyword,
    setKeyWord,
    page,
    setPage,
    pageSize,
    setPageSize,
    loadAll,
    setLoadAll,
  };
}
