import React from "react";

import { FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <section className="hero h-[500px] bg-zinc-500 ">
      <div className="container">
        <div className="content md:w-6/12 mx-auto grid justify-center pt-8 gap-4">
          <h3 className="text-xl font-lato font-semibold text-gray-100 uppercase">
            Welcome <b className="text-green-400 px-5">{user?.name ?? ""}</b>
          </h3>
          <button className="bg-green-600 flex items-center gap-x-2 p-2 rounded-md font-montserrat font-semibold w-max">
            <FaWhatsapp className="text-gray-50 text-3xl" />{" "}
            <span className="text-gray-200">WhatsApp Me</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
