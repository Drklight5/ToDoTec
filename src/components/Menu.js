
"use client";

import Link from "next/link";

export default function Menu() {
  return (
    <div
      className="
    navbar navbar-dark 
    fixed-bottom 
    bg-body-tertiary
    d-flex 
    justify-content-center
    p-3 
    px-5
    "
    >
      <div className="col-12 col-md-8 col-xl-6 d-flex justify-content-between ">
        <Link className="nav-link fs-5" href={"/"}>
          <i class="bi bi-house-door-fill"></i>
        </Link>
        <Link className="nav-link fs-5" href={"/calendar"}>
          <i class="bi bi-calendar3-week-fill"></i>
        </Link>
        <Link className="nav-link" href={"/todo"}>
          <div className="rounded bg-primary px-1 py-0">
            <i class="bi bi-list-check text-white small"></i>
          </div>
        </Link>
        <Link className="nav-link fs-5" href={"/pomodoro"}>
          <i class="bi bi-stopwatch-fill"></i>
        </Link>
      </div>
    </div>
  );
}

