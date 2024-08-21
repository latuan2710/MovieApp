import axios from "axios";
import { useState, useEffect } from "react";

const useFetchListFilms = (api, pageNum) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!api) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://ophim1.com/v1/api/${api}page=${pageNum}`
        );
        setData(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api, pageNum]);

  return { data, loading };
};

export default useFetchListFilms;
