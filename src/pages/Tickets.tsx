import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/UserContext";
import { assignTicket, unassignTicket } from "../utils/helperFunction";
import { ITicketOutput } from "../components/ProjectList";
import { BACKEND_API } from "../utils/constants";
import LoadingSpinner from "../components/LoadingSpinner";

type ITicketsProps = {};

const url = `${BACKEND_API}/ticket`;

const Tickets = (props: ITicketsProps) => {
  const { state } = useContext(UserContext);

  const [ticketChoosen, setTicketChoosen] = useState<null | number>(null);

  const email = state.role !== "admin" && state.email;

  const {
    loading,
    response: tickets,
    error,
    refresh,
  } = useFetch(url, {
    token: state.token,
    query: {
      email,
    },
  });

  const handleAssign = async ({
    assignee,
    ticketId,
  }: {
    assignee: string;
    ticketId: number;
  }) => {
    const userConfig = {
      email: state.email,
      token: state.token,
      ticketId: ticketId,
    };
    setTicketChoosen(ticketId);
    assignee === "assign"
    ? await assignTicket(userConfig)
    : await unassignTicket(userConfig);
    setTicketChoosen(null);
    refresh();
  };
  return (
    <div className="flex-6 flex overflow-y-auto flex-col box-border">
      <div
        id="app"
        className="min-h-screen text-gray-700 subpixel-antialiased p-8"
      >
        <div className="container space-y-8 text-sm mx-auto">
          <div className="space-y-2">
            <div className="text-gray-500 font-bold">All Tickets</div>
            <div className="bg-white shadow hover:shadow-md rounded-md overflow-hidden">
              <table className="table flex table-auto w-full leading-normal">
                <thead className="uppercase text-gray-600 text-xs font-semibold bg-gray-200">
                  <tr className="hidden md:table-row">
                    <th className="text-left p-3">
                      <p>Name</p>
                    </th>
                    <th className="text-left p-3">
                      <p>Project</p>
                    </th>
                    <th className="text-left p-3">
                      <p>Created At</p>
                    </th>
                    <th className="text-left p-3">
                      <p>Due Date</p>
                    </th>
                    <th className="text-left p-3">
                      <p>Priority</p>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="flex-1 text-gray-700 sm:flex-none">
                  {!loading ? (
                    tickets?.map((ticket: ITicketOutput, index: number) => (
                      <tr
                        key={index}
                        className="border-t first:border-t-0 flex p-1 md:p-3 hover:bg-gray-100 md:table-row flex-col w-full flex-wrap"
                      >
                        <td className="p-1 md:p-3">
                          <label
                            className="text-xs text-gray-500 uppercase font-semibold md:hidden"
                            htmlFor=""
                          >
                            Name
                          </label>
                          <p className="">{ticket.title}</p>
                        </td>
                        <td className="p-1 md:p-3">
                          <label
                            className="text-xs text-gray-500 uppercase font-semibold md:hidden"
                            htmlFor=""
                          >
                            Project
                          </label>
                          <p className="">{ticket.project.title}</p>
                        </td>
                        <td className="p-1 md:p-3 md:text-left">
                          <label
                            className="text-xs text-gray-500 uppercase font-semibold md:hidden"
                            htmlFor=""
                          >
                            Created At
                          </label>
                          <div className="bg-gray-700/[0.04] text-gray-500 w-fit px-1 py-1 rounded-lg italic text-xxs">
                            {new Date(ticket.createdAt).toDateString()}
                          </div>
                        </td>
                        <td className="p-1 md:p-3 md:text-left">
                          <label
                            className="text-xs text-gray-500 uppercase font-semibold md:hidden"
                            htmlFor=""
                          >
                            Due Date
                          </label>
                          <div className="bg-gray-700/[0.04] text-gray-500 w-fit px-1 py-1 rounded-lg italic text-xxs">
                            {new Date(ticket.dueDate).toDateString()}
                          </div>
                        </td>
                        <td className="p-1 md:p-3 md:text-left">
                          <label
                            className="text-xs text-gray-500 uppercase font-semibold md:hidden"
                            htmlFor=""
                          >
                            Priority
                          </label>
                          <div className="bg-gray-700/[0.04] text-gray-500 w-fit px-1 py-1 rounded-lg italic text-xxs">
                            Add it after adding to Db
                          </div>
                        </td>
                        <td className="text-right p-1 md:p-3">
                          {ticket.id != ticketChoosen ? (
                            <button
                              type="button"
                              className="inline-block flex text-gray-600 hover:text-gray-700"
                            >
                              <span
                                className="text-blue-600 hover:text-blue-400 font-semibold"
                                onClick={handleAssign.bind(null, {
                                  assignee: "revoke",
                                  ticketId: ticket.id,
                                })}
                              >
                                Revoke
                              </span>
                            </button>
                          ) : (
                            <div className="w-7 h-full ml-3">
                              <LoadingSpinner />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        <div className="my-2 w-9 h-9 mx-auto">
                          <LoadingSpinner />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
