import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ViewEvent = ({ event, setModal, date }) => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(true);

  const UpdateEvent = async (e) => {
    console.log("sent");
    e.preventDefault();
    setLoading(true);

    const data = {
      id: event._id,
      title: e.target.title.value,
      time: e.target.time.value,
      duration: e.target.duration.value,
      description: e.target.description.value,
      notes: e.target.notes.value,
      date: date,
    };

    await axios
      .post("http://localhost:3000/api/v1/event/update", data, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setModal(false);
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

  const DeleteEvent = async () => {
    setLoading(true);

    await axios
      .post("http://localhost:3000/api/v1/event/delete", { id: event._id }, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setModal(false);
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

      <form className=" mt-8" onSubmit={UpdateEvent}>
        {/*  */}

        <div className=" grid grid-cols-4 gap-x-5  gap-y-5">
          {/*  */}

          <section className=" event_sec col-span-4 md:col-span-2 ">
            <p className=" event_p ">Event Title</p>
            <input type="text" disabled={edit} defaultValue={event.title} name="title" placeholder="Enter event title" className=" event_input " />
          </section>

          {/*  */}

          <section className=" event_sec col-span-2 md:col-span-1 ">
            <p className=" event_p ">Time</p>
            <input type="time" name="time" defaultValue={event.time} disabled={edit} className=" event_input " />
          </section>

          {/*  */}

          <section className=" event_sec  col-span-2 md:col-span-1 ">
            <p className=" event_p ">Duration</p>
            <input type="number" name="duration" min={1} max={10} defaultValue={event.duration} disabled={edit} className=" event_input " />
          </section>

          {/*  */}
        </div>

        <section className=" event_sec col-span-1 mt-4 ">
          <p className=" event_p ">Description</p>
          <textarea rows={2} type="text" name="description" placeholder="Enter event title" className=" event_input " defaultValue={event.description} disabled={edit} />
        </section>

        {/*  */}

        <section className=" event_sec col-span-1 mt-4 ">
          <p className=" event_p ">Session Notes</p>
          <textarea rows={2} type="text" name="notes" placeholder="Enter session notes" className=" event_input " defaultValue={event.notes} disabled={edit} />
        </section>

        {!edit && (
          <div className=" my-8 flex items-center justify-end gap-x-5 font-mono text-[0.9rem]">
            <button type="reset" className=" px-5 py-2 " disabled={loading}>
              Cancel
            </button>
            <button type="submit" className=" event_button" disabled={loading}>
              {loading ? "loading..." : "Update Event"}
            </button>
          </div>
        )}

        {/*  */}
      </form>

      {edit && (
        <div className=" my-8 flex items-center justify-end gap-x-5 font-mono text-[0.9rem]">
          <button className=" px-5 py-2 " onClick={() => setEdit(!edit)} disabled={loading}>
            Edit
          </button>
          <button onClick={DeleteEvent} className=" px-5   py-2  text-white rounded-md bg-red-600" disabled={loading}>
            {loading ? "loading..." : "Delete Event"}
          </button>
        </div>
      )}
    </main>
  );
};

export default ViewEvent;
