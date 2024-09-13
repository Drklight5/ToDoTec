"use client"

import Link from "next/link"

export default function Menu(){

    return (
      <div className="navbar fixed-bottom bg-primary d-flex justify-content-between">
        <Link href={"/"}>Home</Link>
        <Link href={"/calendar"}>Calendar</Link>
        <Link href={"/todo"}>To Do</Link>
        <Link href={"/pomodoro"}>Pomo</Link>
      </div>
    );
}