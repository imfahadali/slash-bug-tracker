import React, { useContext } from "react";
import ReactApexChart from "react-apexcharts";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/UserContext";

import {
  getBarChartOptions,
  getPieChartOptions,
} from "../utils/helperFunction";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import { BACKEND_API } from "../utils/constants";
import LoadingSpinner from "../components/LoadingSpinner";

type Props = {};

const url = `${BACKEND_API}/ticket`;

const Analytics = (props: Props) => {
  const { state: user } = useContext(UserContext);

  const email = user.role !== "admin" && user.email;

  const {
    loading,
    response: tickets,
    error,
    refresh,
  } = useFetch(url, {
    token: user.token,
    query: {
      email,
    },
  });

  const dates = tickets?.map((ticket: any) => {
    return {
      dueDate: ticket.dueDate,
      priority: ticket.priority,
    };
  });

  const priorities = tickets?.map((ticket: any) => ticket.priority);

  const barChartOptions = dates && getBarChartOptions(dates);
  const { pieChartOptions, priorityPercentages } = priorities
    ? getPieChartOptions(priorities)
    : { pieChartOptions: undefined, priorityPercentages: undefined };

  return (
    <div className="relative flex-6 flex overflow-auto p-5">
      {!loading ? (
        <div className="self-start grid grid-cols-12 gap-4 px-5 md:gap-6 2xl:gap-7.5">
          <PieChart
            pieChartOptions={pieChartOptions}
            priorityPercentages={priorityPercentages}
          />
          <BarChart barChartOptions={barChartOptions} />
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-y-6 -translate-x-1/2 w-10 h-10">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default Analytics;
