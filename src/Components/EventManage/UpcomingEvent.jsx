import React, { useState } from "react";
import ViewEvent from "./ViewEvent";
import ModalLayout from "../Modal/ModalLayout";

const convertTIme = (time) => {
  const date = new Date(time);

  let hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${formattedMinutes} ${ampm}`;
};

const UpcomingEvent = ({ event, date }) => {
  const [Show, setShow] = useState(false);

  console.log(Show);
  return (
    <main className=" rounded-md shadow-md bg-zinc-50 px-3 py-3 cursor-pointer hover:bg-white " onClick={() => setShow(true)}>
      <h3 className=" text-[0.9rem] font-mono  tracking-tight leading-5 line-clamp-2  text-zinc-700 font-semibold "> {event.title}</h3>

      <p className=" font-mono text-[0.8rem] italic mt-1 text-zinc-700 ">
        Timing : {convertTIme(event.startTime)} ~ {convertTIme(event.endTime)}
      </p>

      <p className=" font-mono text-[0.7rem] line-clamp-3 text-zinc-800 mt-2 italic ">{event.description}</p>

      {Show && <ModalLayout Modal={Show} setModal={setShow} children={<ViewEvent event={event} setModal={setShow} date={date} />} />}
    </main>
  );
};

export default UpcomingEvent;
