import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Modal from "../components/Modal";
import DropDown from "../components/DropDown";
import { ITicketInput, TUser } from "../components/ProjectList";

import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";
import useUser from "../hooks/useUser";

import PlusLogo from "/src/assets/plus-solid.svg";
import TrashLogo from "/src/assets/trash-solid.svg";
import {
  formatProject,
  formatTicket,
  replaceAt,
} from "../utils/helperFunction";
import UserContext from "../context/UserContext";
import { BACKEND_API } from "../utils/constants";


const NewProject = () => {
  const navigate = useNavigate();
  const { state } = useContext(UserContext);

  const {
    response: users,
    error,
    loading,
  }: TUserFetch = useFetch(`${BACKEND_API}/user/unassigned`, {
    token: state.token,
  });
  const { showDropDown, setShowDropDown, authors, handleAuthors } = useUser();
  const { formData: project, handleChange } = useForm();

  const [isOpen, setIsOpen] = useState(false);
  //TODO: remove loading
  const [loadingSpinner, setLoadingSpinner] = useState(true);
  const [tickets, setTickets] = useState<ITicketInput[]>([]);
  const [ticketToEdit, setTicketToEdit] = useState<any>(null);

  //TODO: for development remove afterwards
  setTimeout(() => {
    setLoadingSpinner(loading);
  }, 4000);

  const handleTicketSubmission = (ticket: {
    ticketUserInput: ITicketInput;
    ticketAssignees: TSelectedUser[];
  }) => {
    const formattedTicket = formatTicket(ticket);

    if (ticketToEdit) {
      //TODO: the ticket at a particular index
      setTickets(replaceAt(tickets, ticketToEdit.index, formattedTicket));
      setTicketToEdit(null);
      setIsOpen(false);
      return;
    }

    //TODO: handle duplication
    setTickets([...tickets, { ...formattedTicket }]);
    setIsOpen(false);
  };

  const handleProjectSubmission = async (e: any) => {
    e.preventDefault();
    let config = {
      headers: {
        "x-access-token": state.token,
      },
    };

    const formattedProject = formatProject({ project, authors, tickets });
    //TODO: add edge case if project failed to post
    await axios.post(`${BACKEND_API}/project`, formattedProject, config);
    navigate("/project");
  };

  return (
    <div className="flex-6 overflow-y-auto">
      <form className="p-1">
        <div className="border border-[#d9d9d9] rounded-lg m-auto mt-10 px-5 pb-3 max-w-lg w-full bg-white drop-shadow-sm">
          <span className="flex justify-center border-b border-[#d9d9d9] py-1.5 mb-5 text-blue-500">
            Add Project
          </span>
          <DropDown
            authors={users}
            setDropDownClicked={setShowDropDown}
            handleAuthors={handleAuthors}
            ticketToEdit={ticketToEdit}
            showDropDown={showDropDown}
            alertMessage={error?.message ?? "No users found"}
            loadingSpinner={loadingSpinner}
          />

          <div className="relative z-0 my-6 group">
            <input
              type="text"
              name="title"
              id="title"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
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
          <div className="relative z-0 mb-6 group">
            <input
              type="text"
              name="description"
              id="description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
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
                  id="high"
                  type="radio"
                  name="priority"
                  value="high"
                  className="peer hidden"
                  onChange={handleChange}
                />
                <label
                  htmlFor="high"
                  className="flex items-center cursor-pointer rounded-2xl font-semibold text-red-700 px-2 peer-checked:bg-red-200"
                >
                  High
                </label>
              </div>

              <div className="flex items-center mr-">
                <input
                  id="medium"
                  type="radio"
                  name="priority"
                  value="medium"
                  className="peer hidden"
                  onChange={handleChange}
                />
                <label
                  htmlFor="medium"
                  className="flex items-center cursor-pointer rounded-2xl font-semibold text-yellow-700/75 px-2 peer-checked:bg-yellow-200"
                >
                  Medium
                </label>
              </div>

              <div className="flex items-center mr-4">
                <input
                  id="low"
                  type="radio"
                  name="priority"
                  value="low"
                  className="peer hidden"
                  onChange={handleChange}
                  defaultChecked
                />
                <label
                  htmlFor="low"
                  className="flex items-center cursor-pointer rounded-2xl font-semibold text-green-700/75 px-2 peer-checked:bg-green-200"
                >
                  Low
                </label>
              </div>
            </div>
          </div>

          <div className="text-gray-500">
            <div className="flex items-center justify-between ml-2">
              <span className="italic">Tickets: </span>
              <img
                src={PlusLogo}
                width={15}
                height={15}
                onClick={() => {
                  setIsOpen(true);
                }}
              />
            </div>
            {tickets && (
              <div className="flex flex-wrap mb-20">
                {tickets.map((ticket, index) => (
                  <Ticket
                    key={index}
                    index={index}
                    tickets={tickets}
                    ticket={ticket}
                    setTickets={setTickets}
                    setTicketToEdit={setTicketToEdit}
                    setIsOpen={setIsOpen}
                  />
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleProjectSubmission}
            className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block ml-auto"
          >
            Submit
          </button>
        </div>
        {isOpen && (
          <Modal
            setIsOpen={setIsOpen}
            ticketToEdit={ticketToEdit?.ticket}
            authors={authors}
            handleTicketSubmission={handleTicketSubmission}
          ></Modal>
        )}
      </form>
    </div>
  );
};

export default NewProject;

type TUserFetch = {
  response: TUser[];
  loading: boolean;
  error: any;
};

export type TSelectedUser = {
  id: number;
  name: string;
};

interface ITicketProps {
  tickets: ITicketInput[];
  setTickets: (val: ITicketInput[]) => void;
  ticket: ITicketInput;
  index: number;
  setIsOpen: (val: boolean) => void;
  setTicketToEdit: (val: { ticket: ITicketInput; index: number }) => void;
}

const Ticket = ({
  tickets,
  setTickets,
  ticket,
  index,
  setIsOpen,
  setTicketToEdit,
}: ITicketProps) => {
  console.log(ticket);
  return (
    <div className="border border-gray-200 flex px-3 py-1 m-1 rounded-lg text-black bg-gray-50 drop-shadow-sm relative">
      <span>{ticket.title}</span>
      <button
        className="ml-5 flex items-center text-xxs text-blue-500 underline"
        type="button"
        onClick={() => {
          setIsOpen(true);
          setTicketToEdit({
            ticket: tickets.at(index)!,
            index,
          });
        }}
      >
        edit
      </button>
      <img
        className="inline ml-2 cursor-pointer"
        src={TrashLogo}
        width={11}
        onClick={() =>
          setTickets(tickets.filter((tic) => tickets.indexOf(tic) !== index))
        }
      />
    </div>
  );
};
