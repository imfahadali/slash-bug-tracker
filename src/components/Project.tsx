import React from "react";
import { Link } from "react-router-dom";

import { PriorityColor } from "../types";
import { FALL_BACK_DP } from "../utils/constants";
import { highlight } from "../utils/helperFunction";
import { IProjectOutput } from "./ProjectList";
import TrashLogo from "/src/assets/trash-solid.svg";

export const priorityColorVariants = {
  red: "cursor-pointer rounded-2xl font-semibold text-red-900 px-2 bg-red-200",
  yellow:
    "cursor-pointer rounded-2xl font-semibold text-yellow-900 px-2 bg-yellow-200",
  green:
    "cursor-pointer rounded-2xl font-semibold text-green-900 px-2 bg-green-200",
};

interface IProjectProps {
  project: IProjectOutput;
  searchText?: string;
  handleDelete: (val: number) => void;
}

const Project: React.FunctionComponent<IProjectProps> = ({
  project: { id, title, priority, authors, tickets, createdAt },
  searchText = "",
  handleDelete,
}) => {
  // const CommaSepratedStringofContributors = authors.map(
  //   (author: any) => author.profile?.toString
  // );

  const handleClick = () => {
    console.log(title);
  };

  const color = PriorityColor[priority as keyof typeof PriorityColor];

  const authorsDp = authors?.map(
    (author, index) =>
      index < 3 && (
        <img
          key={author.id}
          className="h-6 w-6 rounded-full"
          src={author.profile || FALL_BACK_DP}
          alt="author display picture"
        />
      )
  );

  return (
    <tr className="bg-white" onClick={handleClick}>
      <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-100">
        <input
          className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
          type="checkbox"
        />
      </td>
      <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-100">
        <div className="text-sm leading-5 text-blue-500">
          {highlight({ search: searchText, children: title })}
        </div>
      </td>
      <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-100">
        <div className="flex-shrink-0 h-10 w-10 flex items-center gap-1">
          {authors?.length ? (
            authorsDp
          ) : (
            <span className="undeline text-gray-500 center text-sm">none</span>
          )}
        </div>
      </td>
      <td className="px-6 py-2 text-center whitespace-no-wrap border-b border-gray-100">
        <div className="text-sm leading-5 text-gray-900">{tickets.length}</div>
      </td>
      <td className="px-6 py-2 text-center whitespace-no-wrap border-b border-gray-100">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityColorVariants[color]}`}
        >
          {priority}
        </span>
      </td>
      <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-100 text-sm leading-5 text-gray-500">
        <span className="bg-gray-700/[0.04] text-gray-500 px-1 py-1 rounded-lg italic text-xxs">
          {new Date(createdAt).toDateString()}
        </span>
      </td>
      <td className="px-6 py-2 whitespace-no-wrap text-right border-b border-gray-100 text-sm leading-5 font-medium">
        <Link to={id.toString()}>
          <span className="text-blue-500 underline hover:text-blue-700 focus:outline-none focus:underline">
            Show
          </span>
        </Link>
        <img
          src={TrashLogo}
          width={12}
          onClick={handleDelete.bind(null, id)}
          className="inline cursor-pointer ml-3"
        />
      </td>
    </tr>
  );
};

export default Project;
