import { ITicketOutput } from "../components/ProjectList";
export enum PriorityColor {
  high = "red",
  medium = "yellow",
  low = "green",
}

export type TSetToken = (token: string | null) => void;

export interface ITokenProps {
  setToken: TSetToken;
}

export type TUserContext = {
  email: string;
  name: string;
  profile: string | null | undefined;
  token: string;
  tickets: ITicketOutput[];
};

export interface IBarSeries {
  name: string;
  data: number[];
}