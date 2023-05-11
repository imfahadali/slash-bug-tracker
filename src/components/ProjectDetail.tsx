import React, { useRef, useState } from "react";

import Project, { priorityColorVariants } from "./Project";
import { IProjectOutput } from "./ProjectList";
import { PriorityColor } from "../types";
import LeftArrow from "/src/assets/left-arrow.svg";
interface IProjectDetailProps {
  project: IProjectOutput;
}

const ProjectDetail: React.FunctionComponent<IProjectDetailProps> = ({
  project: { description, createdAt, title, priority, tickets, authors },
}) => {
  const [units, setUnits] = useState(0);

  const color = PriorityColor[priority as keyof typeof PriorityColor];

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleSwipe = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    direction?: string
  ) => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const itemsLength = authors?.length;
    if (!itemsLength) return;
    const swipeDistance = containerWidth / itemsLength - 25;

    let indexToUpdate: number;
    if (direction === "left" && currentIndex > 0) {
      indexToUpdate = currentIndex - 1;
    } else if (direction === "right" && currentIndex < itemsLength - 1) {
      indexToUpdate = currentIndex + 1;
    } else {
      return;
    }

    setCurrentIndex(indexToUpdate);
    setUnits(indexToUpdate * swipeDistance);
  };

  return (
    <div className="basis-3/5 min-w-300px flex flex-col antialiased bg-white text-gray-600 p-4 h-fit drop-shadow-sm">
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-xl font-bold text-blue-500">{title}</h1>
      </div>
      <p className="mb-7 text-sm">{description}</p>
      <div className="flex items-center text-sm mb-4">
        <div className="mr-5">
          <div className="text-xs font-bold text-gray-500">Created At</div>
          <time className="italic text-xxs">
            {new Date(createdAt).toDateString()}
          </time>
        </div>
        <div className="mr-5">
          <div className="text-xs font-bold text-gray-500">No: of tickets</div>
          <div className="text-center">{tickets.length}</div>
        </div>
        <div>
          <div className="font-bold text-gray-500">priority</div>

          <span className={`${priorityColorVariants[color]}`}>{priority}</span>
        </div>
      </div>
      <h3 className="font-bold text-xs">Authors</h3>
      <div className="flex overflow-hidden relative w-full">
        <div className="z-10 flex items-center absolute left-0">
          {/* <div
            className="h-full bg-white"
            onClick={(e) => handleSwipe(e, "left")}
          >
            {"<"}
          </div> */}
          <img
            src={LeftArrow}
            alt=""
            className="w-4 h-7 bg-white"
            onClick={(e) => handleSwipe(e, "left")}
          />
          <div className="w-12 h-7 bg-gradient-to-l from-transparent via-white to-white via-opacity-0 via-offset-20" />
        </div>

        <div
          className="shrink-0 z-0 transition-all ml-7"
          style={{ translate: `-${units}px 0px` }}
          ref={containerRef}
        >
          {authors?.map((author) => (
            <span
              className="bg-gray-100 mx-2 my-1 px-2 py-1 rounded-md whitespace-nowrap h-fit"
              key={author.id}
            >
              {author.name}
            </span>
          ))}
        </div>

        <div className="z-10 flex absolute right-0">
          <div className="w-12 h-7 bg-gradient-to-r from-transparent via-white to-white via-opacity-0 via-offset-20" />
          {/* <div
            className="h-full bg-white"
            onClick={(e) => handleSwipe(e, "right")}
            // onClick={() => setUnits((prev) => prev - 70)}
          >
            {">"}
          </div> */}
          <img
            src={LeftArrow}
            alt=""
            className="w-4 h-7 -scale-x-100 bg-white"
            onClick={(e) => handleSwipe(e, "right")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
