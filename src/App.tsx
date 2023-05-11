import { useState, useContext, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Router,
  RouterProvider,
} from "react-router-dom";

import "./App.css";

import Projects from "./pages/Projects";
import ProjectInfo from "./pages/ProjectInfo";
import Layout from "./pages/ProtectedLayout";
import { getItem, getItems } from "./utils/api";
import NewProject from "./pages/NewProject";
import Login from "./components/Login";
import Register from "./components/Register";
import UserContext from "./context/UserContext";
import Tickets from "./pages/Tickets";
import Analytics from "./pages/Analytics";
import { BACKEND_API } from "./utils/constants";

const getRouter = (token: string) => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/project">
          <Route
            index
            element={<Projects />}
            // loader={getItems.bind(null, {
            //   url: `${BACKEND_API}/project`,
            //   token,
            // })}
            
          />
          <Route path="new" element={<NewProject />} />
          <Route path=":id" element={<ProjectInfo />} />
        </Route>
        <Route path="/ticket">
          <Route index element={<Tickets />} />
        </Route>
        <Route path="/analytics">
          <Route
            index
            element={<Analytics />}
            // loader={getItem.bind(null, {
            //   url: "http://localhost:4000/project",
            //   token,
            // })}
          />
        </Route>
      </Route>
    )
  );

  return router;
};

function App() {
  const { state } = useContext(UserContext);

  const [register, setRegister] = useState(false);

  console.log(import.meta.env.VITE_BACKEND_API);
  console.log(import.meta.env.PROD);

  if (!state.token) {
    return register ? (
      <Register setRegister={setRegister} />
    ) : (
      <Login setRegister={setRegister} />
    );
  }

  return <RouterProvider router={getRouter(state.token)} />;
}

export default App;
