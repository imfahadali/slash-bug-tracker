import React, { useState } from "react";
import { TSetToken } from "../types";

const useToken = () => {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token"  );
    const userToken = tokenString && JSON.parse(tokenString);

    return userToken;
  };

  const [token, setToken] = useState(() => getToken());

  const saveToken: TSetToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    token,
    setToken: saveToken,
  };
};

export default useToken;
