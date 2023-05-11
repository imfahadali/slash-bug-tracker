import React, { useRef, useState } from "react";
import { IProjectOutput } from "../components/ProjectList";

type Props = {};

const useSearch = (projects: IProjectOutput[]) => {
  const [filteredProjects, setFilteredProjects] = useState<IProjectOutput[]>();
  const searchRef = useRef();

  const handleSearch = (e: any) => {
    searchRef.current = e.target.value;
    setFilteredProjects(
      projects.filter((project) =>
        project.title.toLowerCase().includes(e.target.value.toLowerCase().trim())
      )
    );
  };

  return { filteredProjects, handleSearch, searchRef };
};

export default useSearch;
