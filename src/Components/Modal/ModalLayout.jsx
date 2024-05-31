import React from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

const ModalLayout = ({ Modal, setModal, children }) => {
  return createPortal(
    <main className={`fixed top-0 left-0 items-center justify-center flex w-full h-full `}>
      {/*  */}

      <div
        className={`fixed top-0 left-0  bg-black/80 w-full h-screen flex items-center justify-center `}
        onClick={(e) => {
          e.stopPropagation();
          setModal(false);
        }}
      ></div>

      {/*  */}
      <section className=" relative  w-[95%] md:w-[80%] lg:w-[60%] bg-white  z-50  rounded-xl p-5 ">
        {children}
        <IoClose
          size={20}
          className=" absolute top-3 right-3  text-zinc-500 cursor-pointer "
          onClick={(e) => {
            e.stopPropagation();
            setModal(false);
          }}
        />
      </section>
    </main>,
    document.querySelector("#modal-container")
  );
};

export default ModalLayout;
