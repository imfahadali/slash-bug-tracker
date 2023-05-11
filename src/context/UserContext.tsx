import React, { createContext } from "react";

const initialState = {
  name: "",
  profile: "",
  email: "",
  token: "",
  tickets: [],
  setState: {},
};

const UserContext = createContext<any>(initialState);

export default UserContext;
