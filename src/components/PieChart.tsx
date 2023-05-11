import { ApexOptions } from "apexcharts";
import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

interface IPieChartProps {
  pieChartOptions: any;
  priorityPercentages: any;
}
const PieChart = ({ pieChartOptions, priorityPercentages }: IPieChartProps) => {
  return (
    <div className="col-span-12 rounded-sm  border border-stroke bg-white px-5 pt-7 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 lg:col-span-6">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <h5 className="text-xl font-semibold text-black dark:text-white">
          Analytics
        </h5>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={pieChartOptions.options}
            series={pieChartOptions.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-3 max-w-3 rounded-full bg-[#3C50E0]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> High </span>
              <span> {`${priorityPercentages?.highPercentage}%`} </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-3 max-w-3 rounded-full bg-[#6577F3]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Medium </span>
              <span> {`${priorityPercentages?.mediumPercentage}%`} </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-3 max-w-3 rounded-full bg-[#8FD0EF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Low </span>
              <span> {`${priorityPercentages?.lowPercentage}%`} </span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PieChart;
