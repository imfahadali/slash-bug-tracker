import axios from "axios";
import { BACKEND_API } from "./constants";


export const getItems = async ({
  url,
  token,
}: {
  url: string;
  token: string;
}) => {
  let config = {
    headers: {
      "x-access-token": token,
    },
  };

  const res = await axios.get(url, config);
  if (res.status !== 200) return { error: "couldn't fetch", status: 404 };

  return res?.data;
};

export const getItem = async (
  {
    url,
    token,
  }: {
    url: string;
    token: string;
  },
  { params }: any
) => {
  let config = {
    headers: {
      "x-access-token": token,
    },
  };

  const res = await axios.get(url + `/${params.id}`, config);
  if (res.status !== 200) return { error: "couldn't fetch", status: 404 };

  return res?.data;
};
export const deleteItem = async ({
  url,
  token,
  paramsId,
}: {
  url: string;
  token: string;
  paramsId: number;
}) => {
  let config = {
    headers: {
      "x-access-token": token,
    },
  };

  const res = await axios.delete(url + `/${paramsId}`, config);
  if (res.status !== 200) return { error: "couldn't fetch", status: 404 };

  return res?.data;
};

export const uploadPhoto = async (img: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(img);

  console.log({ img });
  try {
    const res = await axios.post(`${BACKEND_API}/upload`, {
      imgBase64: await getBase64(img),
      name: "s" + img.size + img.name,
    });
    return { response: res.data, status: res.status };
  } catch (error) {
    return { response: error, status: 401 };
  }
};

const getBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
