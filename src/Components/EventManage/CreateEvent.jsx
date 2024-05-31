import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const CreateEvent = ({ date, setModal }) => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const EventCreate = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      title: e.target.title.value,
      time: e.target.time.value,
      duration: e.target.duration.value,
      description: e.target.description.value,
      notes: e.target.notes.value,
      date: date,
    };

    await axios
      .post("https://blackboard-backend-two.vercel.app/api/v1/event/create", data, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setModal(false);
          formRef.current.reset();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        toast.error("Something went wrong !");
        console.log(e);
      })
      .finally(() => setLoading(false));
  };

  return (
    <main className=" w-full h-full  rounded-md  z-50 ">
      {/*  */}

      <h2 className=" font-bold text-[1.1rem] text-zinc-800  ">Create New Event</h2>
      <p className="  text-[0.9rem] text-zinc-700 ">Fill out the form to create a new event.</p>

      <form ref={formRef} className=" mt-8" onSubmit={EventCreate}>
        {/*  */}

        <div className=" grid grid-cols-4 gap-x-5  gap-y-5">
          {/*  */}

          <section className=" event_sec col-span-4 md:col-span-2 ">
            <p className=" event_p ">Event Title</p>
            <input type="text" name="title" placeholder="Enter event title" className=" event_input " />
          </section>

          {/*  */}

          <section className=" event_sec col-span-2 md:col-span-1 ">
            <p className=" event_p ">Time</p>
            <input type="time" name="time" className=" event_input " />
          </section>

          {/*  */}

          <section className=" event_sec  col-span-2 md:col-span-1 ">
            <p className=" event_p ">Duration</p>
            <input type="number" name="duration" min={1} max={10} className=" event_input " />
          </section>

          {/*  */}
        </div>

        <section className=" event_sec col-span-1 mt-4 ">
          <p className=" event_p ">Description</p>
          <textarea rows={2} type="text" name="description" placeholder="Enter event title" className=" event_input " />
        </section>

        {/*  */}

        <section className=" event_sec col-span-1 mt-4 ">
          <p className=" event_p ">Session Notes</p>
          <textarea rows={2} type="text" name="notes" placeholder="Enter session notes" className=" event_input " />
        </section>

        <div className=" my-8 flex items-center justify-end gap-x-5 font-mono text-[0.9rem]">
          <button type="reset" className=" px-5 py-2 " disabled={loading}>
            Cancel
          </button>
          <button type="submit" className=" event_button" disabled={loading}>
            {loading ? "loading..." : "Create Event"}
          </button>
        </div>

        {/*  */}
      </form>
    </main>
  );
};

export default CreateEvent;
