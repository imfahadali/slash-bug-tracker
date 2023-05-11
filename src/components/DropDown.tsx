import React from "react";
import { TSelectedUser } from "../pages/NewProject";
import { TUser } from "./ProjectList";

import BanLogo from "/src/assets/ban-solid.svg";
import LoadingSpinnerLogo from "/src/assets/spinner-solid.svg";

interface IDropDownProps {
  authors: (TSelectedUser | TUser)[];
  showDropDown: boolean;
  ticketToEdit?: any;
  setDropDownClicked: (val: any) => void;
  handleAuthors: (val: any) => void;
  alertMessage: string;
  loadingSpinner?: boolean;
}

const DropDown = (props: IDropDownProps) => {
  const {
    authors,
    setDropDownClicked,
    ticketToEdit,
    handleAuthors,
    showDropDown,
    alertMessage,
    loadingSpinner = false,
  } = props;



  return (
    <div className="max-w-fit relative ml-auto bg-white">
      <button
        type="button"
        className="border border-[#d9d9d9] text-gray-700 font-normal py-2 px-4 rounded inline-flex justify-between items-center max-w-fit"
      >
        <span className="mr-1">Select Authors</span>
        {loadingSpinner ? (
          <img
            src={LoadingSpinnerLogo}
            className="animate-spin h-5 w-5 bg-white rounded-full bg-transparent"
          />
        ) : !authors?.length ? (
          <>
            <img
              src={BanLogo}
              className="peer h-4 w-5 bg-white rounded-full cursor-not-allowed"
            />
            <span className="peer-hover:block hidden absolute bg-red-100 border border-red-400 text-red-700 px-2 py-1 w-full rounded top-12 right-0">
              {alertMessage}
            </span>
          </>
        ) : (
          <svg
            className={`fill-current h-4 w-4 ${showDropDown ? "rotate-180": "rotate-0"} `} 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            onClick={() => setDropDownClicked((prevState: any) => !prevState)}
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        )}
      </button>

      <div
        className={`dropdown-menu ${
          !showDropDown ? "hidden" : ""
        } absolute text-gray-700 py-1 px-0.5 mt-2 z-50 rounded border border-[#d9d9d9] w-full bg-white`}
      >
        {authors?.map((user) => (
          <div
            id={user.id.toString()}
            className="flex justify-between px-3 py-1 rounded hover:bg-gray-200"
          >
            <label htmlFor={user.id.toString()} className="">
              {user.name}
            </label>
            <input
              type="checkbox"
              // checked={
              //   ticketToEdit?.users.find(
              //     (picUser: any) => picUser.id == user.id
              //   ) ?? false
              // }
              id={user.id.toString()}
              name="user"
              value={user.name}
              onChange={handleAuthors}
              className="default:border-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
