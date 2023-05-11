import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { ITicketOutput } from "./ProjectList";
import Ticket from "./Ticket";
import TicketDetail from "./TicketDetail";

interface ITicketListProps {
  tickets: ITicketOutput[];
  refresh: () => void;
  isAuthor: boolean;
}
const TicketList: React.FunctionComponent<ITicketListProps> = ({
  tickets,
  refresh,
  isAuthor
}) => {
  const [ticketDetail, setTicketDetail] = useState<ITicketOutput>({} as any);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectTicket = useCallback((ticket: ITicketOutput) => {
    setTicketDetail(ticket);
    setIsOpen(true);
  }, []);

  return (
    <>
      <div className="basis-2/5 min-w-200px h-2/4 grow overflow-auto">
        {tickets.map((ticket) => (
          <Ticket
            key={ticket.id}
            handleSelectTicket={handleSelectTicket}
            ticket={ticket}
            refresh={refresh}
            isAuthor={isAuthor}
          />
        ))}
      </div>
      <TicketDetail
        ticketDetail={ticketDetail}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
    </>
  );
};

export default TicketList;
