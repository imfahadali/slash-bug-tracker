import React, { useContext, useState } from "react";
import ProfilePath from "../assets/profile.jpg";
import { ITicketOutput } from "./ProjectList";
import { FALL_BACK_DP } from "../utils/constants";
import UserContext from "../context/UserContext";
import axios from "axios";
import { assignTicket, unassignTicket } from "../utils/helperFunction";
import LoadingSpinner from "./LoadingSpinner";

interface ITicketProps {
  handleSelectTicket: (item: ITicketOutput) => void;
  ticket: ITicketOutput;
  refresh: () => void;
  isAuthor: boolean;
}

const Ticket: React.FunctionComponent<ITicketProps> = ({
  handleSelectTicket,
  ticket,
  refresh,
  isAuthor,
}) => {
  const { state } = useContext(UserContext);

  const [ticketChoosen, setTicketChoosen] = useState(false);

  const isAssigned = ticket?.users?.some((user) => user.email === state.email);

  //TODO: should i handle assigning here or one lvl above since the ticket details are coming from 1 lvl up

  const handleAssign = async (assignee: string) => {
    const userConfig = {
      email: state.email,
      token: state.token,
      ticketId: ticket.id,
    };
    setTicketChoosen(true);

    assignee === "assign"
      ? await assignTicket(userConfig)
      : await unassignTicket(userConfig);

    setTicketChoosen(false);
    refresh();
  };

  return (
    <div
      className="bg-white mx-auto mb-1 max-w-xs drop-shadow rounded-lg overflow-hidden p-2"
      onClick={handleSelectTicket.bind(null, ticket)}
    >
      <div>{ticket.title}</div>
      <div className="flex relative">
        {isAuthor &&
          !ticketChoosen &&
          (!isAssigned ? (
            <>
              <button
                className="self-center rounded bg-white border border-blue-500 text-blue-500 flex items-center hover:text-white hover:bg-blue-500 py-1 px-1 mr-auto text-xs text-white "
                onClick={(e) => {
                  e.stopPropagation();
                  handleAssign("assign");
                }}
              >
                Assign me
              </button>
            </>
          ) : (
            <button
              className="self-center rounded bg-white border border-blue-500 text-blue-500 flex items-center hover:text-white hover:bg-blue-500 py-1 px-1 mr-auto text-xs text-white "
              onClick={(e) => {
                e.stopPropagation();
                handleAssign("revoke");
              }}
            >
              Revoke
            </button>
          ))}

        {ticketChoosen && (
          <div className="self-center w-9 h-full self-center rounded bg-white flex items-center py-1 px-1 mr-auto">
            <LoadingSpinner />
          </div>
        )}

        {ticket?.users?.map((user) => (
          <img
            key={user.email}
            src={user.profile || FALL_BACK_DP}
            alt=""
            width="30"
            height="30"
            className="rounded-full mr-2 object-cover aspect-square"
          />
        ))}
      </div>
    </div>
  );
};

export default Ticket;
