import { SITE_URL } from "@/def";

const { default: axios } = require("axios");
const { useEffect } = require("react");
const { useState } = require("react");

export const useApiData = ({
  url,
  method = "GET",
  defaultData,
  payload = {},
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(defaultData);
  const [error, setError] = useState(true);
  useEffect(() => {
    const extraOptions = {};

    if (method === "POST") {
      extraOptions.body = payload;
    }
    axios(SITE_URL + url, {
      method,
      ...extraOptions,
    })
      .then((resp) => {
        setLoading(false);
        setData(resp.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

  return { loading, data, error };
};
