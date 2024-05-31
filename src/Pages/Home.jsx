import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EventMain from "../Components/EventManage/EventMain";

const Home = () => {
  const [value, onChange] = useState(new Date());

  return (
    <main className="  mt-5 px-5 md:px-10   w-full   ">
      <section className=" h-full flex items-start justify-start  w-full  ">
        <Calendar onChange={onChange} value={value} className="w-full h-auto" />
      </section>

      <EventMain date={value} />
    </main>
  );
};

export default Home;
