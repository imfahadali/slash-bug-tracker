import React, { useState } from "react";

import useForm from "../hooks/useForm";
import useUser from "../hooks/useUser";

import DropDown from "./DropDown";
import { TSelectedUser } from "../pages/NewProject";
import LoadingSpinner from "/src/assets/spinner-solid.svg";
import CrossLogo from "/src/assets/xmark-solid.svg";
import BanLogo from "/src/assets/ban-solid.svg";
import DropDownLogo from "/src/assets/dropdown-logo.svg";

interface ITicketModalProps {
  ticketToEdit: any;
  setIsOpen: (val: boolean) => void;
  authors: TSelectedUser[];
  handleTicketSubmission: (val: any) => void;
}

const Modal = ({
  ticketToEdit,
  setIsOpen,
  authors,
  handleTicketSubmission,
}: ITicketModalProps) => {
  const { formData: ticketUserInput, handleChange } = useForm(ticketToEdit);

  const {
    showDropDown,
    setShowDropDown,
    authors: ticketAssignees,
    handleAuthors: handleTicketAssignees,
  } = useUser();

  return (
    <>
      <div
        className="w-screen h-screen bg-black/[0.2]  absolute top-0 left-0 z-40"
        onClick={() => setIsOpen(false)}
      />
      <form className="w-4/12 h-5/6 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 px-5 py-2 flex flex-col">
        <div className="flex justify-center border-b border-[#d9d9d9] py-1.5 mb-5 text-blue-500">
          <span className="ml-auto"> Add Ticket</span>
          <button onClick={() => setIsOpen(false)} className="mr-2 ml-auto">
            <img src={CrossLogo} alt="" width={11} />
          </button>
        </div>

        <DropDown
          authors={authors}
          ticketToEdit={ticketToEdit}
          showDropDown={showDropDown}
          setDropDownClicked={setShowDropDown}
          handleAuthors={handleTicketAssignees}
          alertMessage="Add authors to project first"
        />

        <div className="relative z-0 my-10 group w-3/5 mx-auto">
          <input
            type="text"
            name="title"
            id="title"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={ticketUserInput?.title || ""}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="title"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title
          </label>
        </div>
        <div className="relative z-0 mb-6 group w-3/5 mx-auto">
          <input
            type="text"
            name="description"
            id="description"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={ticketUserInput?.description || ""}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description
          </label>
        </div>

        <div className="dropdown inline-block relative z-0 mb-6 flex content-center items-center">
          <div className="mx-auto max-w-sm text-center flex flex-wrap justify-center text-sm">
            <div className="flex items-center">
              <input
                id="high ticket"
                type="radio"
                name="priority"
                value="high"
                className="peer hidden"
                onChange={handleChange}
              />
              <label
                htmlFor="high ticket"
                className="flex items-center cursor-pointer rounded-2xl font-semibold text-red-700 px-2 peer-checked:bg-red-200"
              >
                High
              </label>
            </div>

            <div className="flex items-center mr-">
              <input
                id="medium ticket"
                type="radio"
                name="priority"
                value="medium"
                className="peer hidden"
                onChange={handleChange}
              />
              <label
                htmlFor="medium ticket"
                className="flex items-center cursor-pointer rounded-2xl font-semibold text-yellow-700/75 px-2 peer-checked:bg-yellow-200"
              >
                Medium
              </label>
            </div>

            <div className="flex items-center mr-4">
              <input
                id="low ticket"
                type="radio"
                name="priority"
                value="low"
                className="peer hidden"
                onChange={handleChange}
                defaultChecked
              />
              <label
                htmlFor="low ticket"
                className="flex items-center cursor-pointer rounded-2xl font-semibold text-green-700/75 px-2 peer-checked:bg-green-200"
              >
                Low
              </label>
            </div>
          </div>
        </div>

        <div className="relative z-0 mb-6 group w-3/5 mx-auto">
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={ticketUserInput?.dueDate || ""}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="date"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Set due date
          </label>
        </div>
        <button
          type="button"
          className="max-w-fit px-9 py-1 mx-auto rounded text-white bg-blue-500 hover:bg-blue-800"
          onClick={() =>
            handleTicketSubmission({ ticketUserInput, ticketAssignees })
          }
        >
          Add
        </button>
      </form>
    </>
  );
};

export default Modal;
