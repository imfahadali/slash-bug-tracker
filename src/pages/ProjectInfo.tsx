import React, { useState, useContext } from "react";
import { useFetcher, useLoaderData, useParams } from "react-router-dom";

import Comment from "../components/Comment";
import ProjectDetail from "../components/ProjectDetail";
import TicketDetail from "../components/TicketDetail";
import LoadingSpinner from "../components/LoadingSpinner";
import TicketList from "../components/TicketList";
import useFetch from "../hooks/useFetch";

import { IProjectOutput, ITicketOutput } from "../components/ProjectList";
import UserContext from "../context/UserContext";
import { BACKEND_API } from "../utils/constants";

interface IProjectInfoProps {}

const ProjectInfo: React.FunctionComponent<IProjectInfoProps> = (props) => {
  const params = useParams();
  const { state } = useContext(UserContext);

  const projectUrl = `${BACKEND_API}/project/${params.id}`;

  const {
    response: project,
    loading,
    error,
    refresh,
  } = useFetch(projectUrl, {
    token: state.token,
  });

  const isAuthor = project?.authors?.some(
    (author: any) => author.email === state.email
  );

  return (
    <>
      <div className="relative flex-6 flex flex-wrap m-5 overflow-y-auto overflow-x-hidden">
        {!loading ? (
          <>
            <ProjectDetail project={project} />
            <TicketList
              tickets={project?.tickets}
              refresh={refresh}
              isAuthor={isAuthor}
            />

            {/* <div className="border border-gray-500 peer">hover over me </div> */}
            {/* <div className="m-10 transition-all">margin added after hover</div> */}

            {/* <Comment /> */}
          </>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-y-6 -translate-x-1/2 w-10 h-10">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectInfo;
