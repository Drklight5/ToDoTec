"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Validate } from "@/components/Validate";
import { useAppContext } from "@/helpers/context";
import Menu from "../components/Menu";

export default function Home() {
  const { data } = useAppContext();
  const dias = ["lu", "ma", "mi", "ju", "vi", "sa", "do"];
  const tareas = ["lu", "ma", "mi", "ju", "vi", "sa", "do"];

  return (
    <div className="container">
      <Validate />
      <main className="my-5">
        {/* Next.js logo */}
        <h1>
          {data?.user?.name} <br /> Que gusto verte otra vez!{" "}
        </h1>

        {/* MOSTRAR RACHA */}
        <div className="my-5">
          <h5 className="text-body-tertiary">DIAS COMPLETOS</h5>
          <div className="d-flex col-12 col-md-9 col-xl-6 justify-content-bewteen overflow-x-auto">
            {dias.map((element, i) => (
              <div key={i} className="p-3 bg-body-tertiary rounded m-2">
                <i class="bi bi-fire fs-2 text-warning"></i>
                <div className="text-center">{element}</div>
              </div>
            ))}
          </div>
        </div>
        {/* MOSTRAR TAREAS */}
        <div className="my-5">
          <h5 className="text-body-tertiary">TAREAS PENDIENTES</h5>
          <div className="my-3 col-12 col-md-9 col-xl-6">
            {tareas.map((element, i) => (
              <div key={i} className="rounded-4 bg-body-tertiary my-3 px-4 py-3">
                {element}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Menu />
    </div>
  );
}
