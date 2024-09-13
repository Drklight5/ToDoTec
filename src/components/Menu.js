"use client";

import Link from "next/link";

export default function Menu() {
  return (
    <div
      className="
    navbar navbar-dark 
    fixed-bottom bg-primary d-flex 
    justify-content-between 
    p-3 text-white
    px-4
    "
    >
      <Link className="nav-link text-white" href={"/"}>
        Home
      </Link>
      <Link className="nav-link  text-white" href={"/calendar"}>
        Calendar
      </Link>
      <Link className="nav-link text-white" href={"/todo"}>
        To Do
      </Link>
      <Link className="nav-link text-white" href={"/pomodoro"}>
        Pomo
      </Link>
    </div>
  );
}
