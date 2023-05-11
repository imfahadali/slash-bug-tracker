import * as Yup from "yup";
import { IBarSeries } from "../types";
import { ApexOptions } from "apexcharts";

export const BACKEND_API = import.meta.env.VITE_BACKEND_API;

export const FALL_BACK_DP =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP17y9FJz4C1ISLKROmJPGkXn0F4mnaEeEjA&usqp=CAU";

export const RegistrationValidation = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short- should be 8 chars min.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  name: Yup.string()
    .required("Required")
    .min(5, "Name is too short- should be 5 chars min."),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short- should be 8 chars min.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
});

export const barChartOptionsBP = {
  series: [
    {
      name: "High",
      data: [5, 25, 11, 5, 22, 42, 35],
    },
    {
      name: "Medium",
      data: [44, 55, 41, 67, 22, 43, 65],
    },
    {
      name: "Low",
      data: [44, 55, 41, 67, 22, 43, 65],
    },
  ] as IBarSeries[],
  options: {
    // colors: ["#3C50E0", "#80CAEE"],
    colors: ["#3C50E0", "#6577F3", "#8FD0EF"],

    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: "25%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: "25%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",

      markers: {
        radius: 99,
      },
    },
    fill: {
      opacity: 1,
    },
  },
};

export const pieChartOptionsBP = {
  series: [0, 0, 0],
  options: {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut" as "donut",
    },
    colors: ["#8FD0EF", "#6577F3", "#3C50E0"],
    labels: ["Low", "Medium", "High"],
    legend: {
      show: false,
      position: "bottom",
    },

    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },

    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  } as ApexOptions,
};
