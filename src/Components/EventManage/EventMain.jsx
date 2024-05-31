import React, { useEffect, useState } from "react";
import { BsFillCalendar2EventFill } from "react-icons/bs";
import { MdEventNote } from "react-icons/md";
import CreateEvent from "./CreateEvent";
import UpcomingEvent from "./UpcomingEvent";
import EventsSkelton from "../../Common/EventsSkelton";
import axios from "axios";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import UserAtom from "../../Recoil/UserAtom";
import ModalLayout from "../Modal/ModalLayout";

const EventMain = ({ date }) => {
  const [Modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [event, setEvents] = useState(null);
  const user = useRecoilValue(UserAtom);

  const getEvents = async () => {
    // console.log("first");
    const Cdate = new Date();
    const Udate = new Date(date);

    if (Udate.getFullYear() <= Cdate.getFullYear() && Udate.getMonth() <= Cdate.getMonth() && Udate.getDate() < Cdate.getDate()) {
      setEvents(null);
      return;
    }

    // console.log("second");
    setLoading(true);

    await axios
      .post("http://localhost:3000/api/v1/event/getevents", { Udate }, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setEvents(res.data.events);
          // console.log("third", loading);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something went wrong !");
      })
      .finally(() => setLoading(false));
  };

  // console.log(date);

  useEffect(() => {
    if (user) getEvents();
  }, [date]);

  return (
    <main className=" my-14">
      <section className=" flex w-full items-center justify-between ">
        <h2 className=" tracking-widest text-blue-500 font-medium flex gap-x-3 items-center justify-center text-[0.8rem] md:text-[1rem] ">
          <BsFillCalendar2EventFill size={18} className="  text-blue-700" /> Upcoming Events
        </h2>

        <button
          className=" bg-blue-500 px-5 py-2 rounded-full text-white flex items-center justify-center gap-x-3 text-[0.8rem] md:text-[1rem] "
          onClick={() => {
            if (!user) toast.error("Please login first to continue !");
            else setModal(true);
          }}
        >
          <MdEventNote /> Create Event
        </button>
      </section>

      {/* View Upcoming events */}

      <section className=" mt-10 w-full grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-x-5 gap-y-5 z-0 ">
        {loading ? (
          <>
            <EventsSkelton />
            <EventsSkelton />
            <EventsSkelton />
          </>
        ) : event == null || event?.length <= 0 ? (
          <p className=" col-span-4 w-full text-center ">No events Found !</p>
        ) : (
          event.map((e) => <UpcomingEvent key={e._id} event={e.event} date={date} />)
        )}
      </section>

      {Modal && <ModalLayout Modal={Modal} setModal={setModal} children={<CreateEvent date={date} setModal={setModal} />} />}
    </main>
  );
};

export default EventMain;
