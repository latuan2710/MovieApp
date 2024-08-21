import axios from "axios";
import { useState, useEffect } from "react";

const useFetchFilm = (slug) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://ophim1.com/phim/${slug}`);
        setData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { data, loading };
};

export default useFetchFilm;
