import axios, { AxiosError } from "axios";

import { ITicketInput } from "../components/ProjectList";
import { TSelectedUser } from "../pages/NewProject";
import { uploadPhoto } from "./api";
import { BACKEND_API, barChartOptionsBP, pieChartOptionsBP } from "./constants";

export const parseIdTypeToInt = (users: any[]) => {
  return users.map((user) => {
    return {
      id: parseInt(user.id),
    };
  });
};

export const replaceAt = (array: any, index: any, value: any) => {
  console.log(array, index, value);
  const ret = array.slice(0);
  ret[index] = value;
  console.log(ret);
  return ret;
};

export const formatTicket = (ticket: {
  ticketUserInput: ITicketInput;
  ticketAssignees: TSelectedUser[];
}) => {
  return {
    ...ticket.ticketUserInput,
    users: ticket.ticketAssignees.map((ticketAssignee) => {
      return { id: ticketAssignee.id };
    }),
  };
};

export const formatProject = ({ project, authors, tickets }: any) => {
  return {
    ...project,
    authorsToConnect: authors.map((author: any) => {
      return { id: author.id };
    }),
    ticketsToCreate: tickets,
  };
};

export const highlight = ({ search = "", children = "" }) => {
  const escapeRegExp = (str = "") =>
    str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");

  const patt = new RegExp(`(${escapeRegExp(search)})`, "i");
  const parts = String(children).split(patt);

  if (search) {
    return parts.map((part, index) =>
      patt.test(part) ? <mark key={index}>{part}</mark> : part
    );
  } else {
    return children;
  }
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${BACKEND_API}/user/login`, credentials);
    return res;
  } catch (error) {
    const err = error as AxiosError;
    return err.response;
  }
};

export const registerUser = async (credentials: {
  email: string;
  password: string;
  name: string;
  profile?: File;
}) => {
  try {
    let url;
    if (credentials.profile) {
      console.log(credentials.profile);
      const { response, status } = await uploadPhoto(credentials.profile);
      url = response.location;
    }

    const res = await axios.post(`${BACKEND_API}/user/register`, {
      ...credentials,
      profile: url,
    });
    return res;
  } catch (error) {
    const err = error as AxiosError;
    return err.response;
  }
};

export const assignTicket = async ({
  token,
  email,
  ticketId,
}: {
  token: string;
  email: string;
  ticketId: number;
}) => {
  const config = {
    headers: {
      "x-access-token": token,
    },
  };
  await axios.put(
    `${BACKEND_API}/user`,
    { ticketsToConnect: [{ id: ticketId }], email },
    config
  );
};

export const unassignTicket = async ({
  token,
  email,
  ticketId,
}: {
  token: string;
  email: string;
  ticketId: number;
}) => {
  const config = {
    headers: {
      "x-access-token": token,
    },
  };
  await axios.put(
    `${BACKEND_API}/user`,
    { ticketsToDisconnect: [{ id: ticketId }], email },
    config
  );
};

const getWeeklyDates = (dates: any[]) => {
  const ticketsPast7Days = {
    high: [0, 0, 0, 0, 0, 0, 0],
    medium: [0, 0, 0, 0, 0, 0, 0],
    low: [0, 0, 0, 0, 0, 0, 0],
  };
  const result = [0, 0, 0, 0, 0, 0, 0];
  const today = new Date().setHours(0, 0, 0, 0); // Set the time to midnight to ignore the time portion

  for (const date of dates) {
    const targetDate = new Date(date.dueDate).setHours(0, 0, 0, 0); // Set the time to midnight to ignore the time portion
    const dayDiff = Math.floor((targetDate - today) / (1000 * 60 * 60 * 24)); // Calculate the difference in days
    console.log(dayDiff);
    if (dayDiff >= 0 && dayDiff <= 6) {
      // @ts-ignore
      ticketsPast7Days[date.priority][dayDiff] += 1;
      // result[dayDiff] += 1;
    }
  }

  return ticketsPast7Days;
};

const getNext7Days = () => {
  const currentDate = new Date();

  // Generate an array of dates for the next 7 days
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const next7Days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
    const dayOfWeek = days[date.getUTCDay()];
    next7Days.push(dayOfWeek);
  }
  return next7Days;
};

export const getBarChartOptions = (dates: any[]) => {
  const barChartOptions = { ...barChartOptionsBP };
  const { high, medium, low } = getWeeklyDates(dates);
  console.log(high, medium, low);
  const next7Days = getNext7Days();
  // barChartOptions.series[0].data = high;
  // barChartOptions.series[1].data = medium;
  // barChartOptions.series[2].data = low;
  barChartOptions.options.xaxis.categories = next7Days;

  return barChartOptions;
};

export const getPercentage = (individual: number, total: number) => {
  return (individual / total) * 100;
};

export const getPieChartOptions = (priorities: string[]) => {
  let countArr = [0, 0, 0];

  const pieChartOptions = { ...pieChartOptionsBP };
  priorities.forEach((item) => {
    if (item === "low") {
      countArr[0]++;
    } else if (item === "medium") {
      countArr[1]++;
    } else if (item === "high") {
      countArr[2]++;
    }
  });
  pieChartOptions.series = countArr;

  const [low, medium, high] = countArr;
  const lowPercentage = getPercentage(low, low + medium + high);
  const mediumPercentage = getPercentage(medium, low + medium + high);
  const highPercentage = getPercentage(high, low + medium + high);

  return {
    pieChartOptions,
    priorityPercentages: {
      lowPercentage,
      mediumPercentage,
      highPercentage,
    },
  };
};
