import React, { useContext, useState } from "react";
import ProfilePath from "../assets/profile.jpg";
import { ITicketOutput } from "./ProjectList";
import { FALL_BACK_DP } from "../utils/constants";
import UserContext from "../context/UserContext";
import axios from "axios";
import { assignTicket, unassignTicket } from "../utils/helperFunction";

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

  const isAssigned = ticket?.users?.some((user) => user.email === state.email);
  console.log(ticket);

  //TODO: should i handle assigning here or one lvl above since the ticket details are coming from 1 lvl up

  const handleAssign = async (assignee: string) => {
    const userConfig = {
      email: state.email,
      token: state.token,
      ticketId: ticket.id,
    };
    assignee === "assign"
      ? await assignTicket(userConfig)
      : await unassignTicket(userConfig);
    refresh();
  };

  return (
    <div
      className="bg-white mx-auto mb-1 max-w-xs drop-shadow rounded-lg overflow-hidden p-2"
      onClick={handleSelectTicket.bind(null, ticket)}
    >
      <div>{ticket.title}</div>
      <div className="flex">
        {isAuthor &&
          (!isAssigned ? (
            <>
              <button
                className="self-center rounded bg-white border border-blue-500 text-blue-500 flex items-center hover:text-white hover:bg-blue-500 py-1 px-1 mr-auto text-xs text-white "
                onClick={handleAssign.bind(null, "assign")}
              >
                Assign me
              </button>
            </>
          ) : (
            <button
              className="self-center rounded bg-white border border-blue-500 text-blue-500 flex items-center hover:text-white hover:bg-blue-500 py-1 px-1 mr-auto text-xs text-white "
              onClick={handleAssign.bind(null, "revoke")}
            >
              Revoke
            </button>
          ))}

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
