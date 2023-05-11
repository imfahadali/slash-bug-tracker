import * as React from "react";

import CrossLogo from "/src/assets/xmark-solid.svg";
import { ITicketOutput } from "./ProjectList";
import { priorityColorVariants } from "./Project";
import { PriorityColor } from "../types";
import { FALL_BACK_DP } from "../utils/constants";

interface ITicketDetailProps {
  ticketDetail: ITicketOutput;
  setIsOpen: any;
  isOpen: boolean;
}

const TicketDetail: React.FunctionComponent<ITicketDetailProps> = ({
  ticketDetail,
  setIsOpen,
  isOpen,
}) => {
  const classes = {
    classone:
      "transition-all absolute basis-3/5 top-0 w-1/5 right-0 ease-linear min-w-300px flex flex-col antialiased bg-white drop-shadow text-gray-600 p-4 h-full",
    classtwo:
      "transition-all absolute basis-3/5 top-0 w-1/5 -right-1/3 ease-in-out min-w-300px flex flex-col antialiased bg-white drop-shadow text-gray-600 p-4 h-full",
  };

  //@ts-ignore
  const color = PriorityColor[ticketDetail as keyof typeof PriorityColor];
  console.log(ticketDetail);

  return (
    <div className={isOpen ? classes.classone : classes.classtwo}>
      {isOpen && (
        <>
          <div className="flex justify-between items-center mb-7">
            <h1 className="text-xl font-bold">{ticketDetail.title}</h1>
            <img
              src={CrossLogo}
              onClick={() => setIsOpen(false)}
              className="p-1 h-6 w-6 rounded-full transition-all ml-auto hover:bg-gray-200"
            />
          </div>
          <p className="mb-7 text-sm">{ticketDetail.description}</p>
          <div className="flex text-sm">
            <div className="mr-5">
              <div className="text-xs font-bold">Due Date</div>
              {/* api is not returning dueDate for now your backend should */}
              {/* TODO: add due date in your api */}
              <time className="italic text-xxs">
                {new Date(ticketDetail.dueDate).toDateString()}
              </time>{" "}
            </div>
            <div className="mr-5">
              <div className="text-xs font-bold">Created At</div>
              <time className="italic text-xxs">
                {new Date(ticketDetail.createdAt).toDateString()}
              </time>
            </div>
            <div>
              <div className="text-xs font-bold">Priority</div>
              <div className="bg-red-300 border border-red-600 rounded-full text-white text-center text-xs">
                high
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="border-b border-gray-200 text-center mb-2">Ticket Assigness</h3>
            {ticketDetail?.users?.map((user, index) => (
              <div key={index} className="flex justify-between items-center mb-3">
                <span className="mr-3 text-sm text-gray-500 italic">{user.email}</span>
                <img src={user.profile || FALL_BACK_DP} alt="User Profile" className="w-7 aspect-square rounded-full"/>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TicketDetail;
