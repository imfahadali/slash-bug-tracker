import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import SearchLogo from "/src/assets/search-solid.svg";
import useSearch from "../hooks/useSearch";
import Project from "./Project";
import UserContext from "../context/UserContext";
import { deleteItem } from "../utils/api";
import { BACKEND_API } from "../utils/constants";

interface IProjectListProps {
  fetchedProjects: IProjectOutput[];
}

const ProjectList: React.FunctionComponent<IProjectListProps> = ({
  fetchedProjects,
}) => {
  //TODO: confirm what is the best way to do this project/state at this level of hirearchy or upper level
  const [projects, setProjects] = useState<IProjectOutput[]>(fetchedProjects);

  const { filteredProjects, handleSearch, searchRef } = useSearch(projects);
  const { state } = useContext(UserContext);

  const projectsMap = filteredProjects || projects;

  const handleDeleteProject = async (id: number) => {
    const config = {
      url: `${BACKEND_API}/project`,
      token: state.token,
      paramsId: id,
    };
    await deleteItem(config);

    setProjects(projects.filter((project) => project.id !== id));
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="w-full h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="my-2.5 px-2.5 py-2.5 flex flex-wrap flex-grow justify-between bg-white rounded-lg shadow">
            <div className="flex items-center py-2 relative">
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={toggleSearch}
                >
                  <img src={SearchLogo} alt="" width={12} className="z-0" />
                </button>
                <div
                  className={`absolute top-0 left-8 ${
                    isSearchOpen
                      ? "opacity-100 translate-x-0 transition-all duration-300 delay-0"
                      : "opacity-0 -translate-x-4 transition-all duration-300 delay-150"
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search"
                    id="search-project"
                    name="search-project"
                    onChange={handleSearch}
                    className="opacity-60 py-1 rounded-lg border border-gray-200  px-3 text-gray-700 text-sm focus:outline-none focus:border-gray-400 focus:bg-gray-100"
                  />
                </div>
              </div>
            </div>
            <h1 className="text-3xl text-center font-bolder leading-tight text-gray-900 flex items-center">
              Projects
            </h1>
            <div className="flex items-center py-2">
              <Link to="new">
                <span className="rounded bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 mr-1 text-sm text-white">
                  Create
                </span>
              </Link>
            </div>
          </div>
          <div className="overflow-auto h-96 shadow flex justify-center bg-white">
            {projects.length ? (
              <div className="align-middle inline-block w-full overflow-x-auto sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full w-full releative">
                  <thead className="sticky top-0 border">
                    <tr className="bg-white border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider drop-shadow-sm  ">
                      <th className="px-6 py-3 text-left font-medium">
                        <input
                          className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out "
                          type="checkbox"
                        />
                      </th>
                      <th className="px-6 py-3 text-left font-medium">Name</th>
                      <th className="px-6 py-3 text-left font-medium">
                        Authors
                      </th>
                      <th className="px-6 py-3 text-center font-medium">
                        Tickets
                      </th>
                      <th className="px-6 py-3 text-center font-medium">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left font-medium">
                        Created At
                      </th>
                      <th className="px-6 py-3 text-left font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white overflow-auto">
                    {projectsMap.map((project) => (
                      <Project
                        key={project.id}
                        project={project}
                        searchText={searchRef.current}
                        handleDelete={handleDeleteProject}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div
                className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 flex-1 mb-auto mt-20 flex flex-col items-center"
                role="alert"
              >
                <p className="font-bold">No Projects found</p>
                <p className="text-sm">Add some projects.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;

//TODO: keep types in seperate file
// export type TProject = {
//   id: number;
//   createdAt: string;
//   updatedAt: string;
//   title: string;
//   description: string;
//   priority: string;

//   authors: TUser[];
//   tickets: ITickeout[];
// };
export type IProjectInput = {
  title: string;
  description: string;
  priority: string;

  authors?: TUser[];
  tickets?: ITicketInput[];
};
export interface IProjectOutput extends IProjectInput {
  id: number;
  createdAt: string;
  updatedAt: string;
  tickets: ITicketOutput[];
}

export type TUser = {
  id: number;
  email: string;
  name: string;
  profile?: any;

  tickets?: IProjectOutput[];
  project?: IProjectOutput;
  projectId?: number;
};

// export type TTicket = {
//   id?: number;
//   createdAt: string;
//   updatedAt: string;
//   title: string;
//   description: string;
//   users?: TUser[];
//   project: TProject;
//   projectId: number;
// };

export interface ITicketInput {
  title: string;
  description: string;
  priority: string;
  users?: any[];
}

export interface ITicketOutput extends ITicketInput {
  id: number;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  project: IProjectOutput;
  projectId: number;
}

enum Priority {
  "high",
  "low",
  "medium",
}
