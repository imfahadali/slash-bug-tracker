import axios from "axios";
import React, { useEffect, useState } from "react";
import { getItem } from "../utils/api";

const useFetch = (
  url: string,
  options: { token: string | null; query?: any }
) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refresh = () => {
    fetchData();
  };

  const fetchData = async () => {
    const config = {
      headers: {
        "x-access-token": options.token,
      },
      params: options.query,
    };

    try {
      setLoading(true);
      const res = await axios.get(url, config);
      setResponse(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { response, error, loading, refresh };
};

export default useFetch;
