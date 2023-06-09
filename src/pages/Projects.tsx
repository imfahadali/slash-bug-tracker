import { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";

import ProjectList from "../components/ProjectList";
import { IProjectOutput } from "../components/ProjectList";
import { BACKEND_API } from "../utils/constants";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";

const Projects = () => {
  // const fetchedProjects = useLoaderData();
  const { state } = useContext(UserContext);

  const projectUrl = `${BACKEND_API}/project`;

  const {
    response: project,
    loading,
    error,
    refresh,
  } = useFetch(projectUrl, {
    token: state.token,
  });

  return (
    <div className="relative flex-6 flex overflow-y-auto flex-col box-border">
      {!loading ? (
        <ProjectList fetchedProjects={project as IProjectOutput[]} />
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-y-6 -translate-x-1/2 w-10 h-10">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default Projects;
