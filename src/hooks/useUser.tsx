import React, { useState } from "react";
import { TSelectedUser } from "../pages/NewProject";

const useUser = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [authors, setAuthors] = useState<TSelectedUser[]>([]);

  const handleAuthors = (e: any) => {
    console.log(e.target.value);
    if (e.target.checked) {
      setAuthors([
        ...authors,
        {
          id: e.target.id,
          name: e.target.value,
        },
      ]);
    } else {
      setAuthors(authors.filter((author: any) => e.target.id !== author.id));
    }

    console.log(authors);
  };
  return { authors, showDropDown, setShowDropDown, handleAuthors };
};

export default useUser;
