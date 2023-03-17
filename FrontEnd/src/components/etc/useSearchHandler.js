import axios from "axios";
import { useEffect, useState } from "react";

function useSearchHandler(searchVal, type, page, pageSize, sort, isdescending) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [sortB, setSortB] = useState("");
  const [isdescendingOld, setIsDescendingOld] = useState("");

  useEffect(() => {
    setProducts([]);
  }, [searchVal, type]);

  useEffect(() => {
    setLoading(false);
    if (searchVal || type) {
      setLoading(true);
      let api = `${process.env.REACT_APP_API_URL}/products/search?`;

      if (searchVal !== "") {
        let query = "";
        if (searchVal !== "all") {
          query = searchVal;
        }

        api += `&searchText=${query}`;
      }

      if (type !== "") {
        let query = "";
        if (type !== "all") {
          query = type;
          api += `&type=${query}`;
        } else if (searchVal === "") {
          api += `searchText=`;
        }
      }

      if (sort === "" && sortB !== "") {
        setProducts([]);
        setSortB("");
        setIsDescendingOld("");
      }

      if ((sort !== "" && sort !== sortB) || isdescending !== isdescendingOld) {
        setProducts([]);
        setSortB(sort);
        setIsDescendingOld(isdescending);
        api += `&sortBy=${sort}&isdescending=${isdescending}`;
      }

      if (sortB === sort && isdescending === isdescendingOld) {
        api += `&sortBy=${sortB}&isdescending=${isdescendingOld}`;
      }

      let cancel;

      axios({
        method: "GET",
        url: api,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        params: { pageNo: page, pageSize: pageSize },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          setProducts((prevProd) => {
            return [...new Set([...prevProd, ...res.data])];
          });
          setHasMore(res.data.length > 0);
          setTimeout(() => {
            setLoading(false);
          }, 700);
        })
        .catch((e) => {
          setLoading(false);
          if (axios.isCancel(e)) {
            return;
          }
        });
      return () => cancel();
    }
  }, [
    searchVal,
    type,
    page,
    pageSize,
    sort,
    sortB,
    isdescending,
    isdescendingOld,
  ]);

  return { loading, products, hasMore };
}

export default useSearchHandler;
