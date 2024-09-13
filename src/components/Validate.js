"use client";

import { useAppContext } from "@/helpers/context";
import { useRouter } from "next/navigation";

export const Validate = ({ children }) => {
  const {data, setData} = useAppContext();
    const redirect = useRouter()
  // Si el usuario no está autenticado y no estamos en /auth, redirige a /auth
  console.log("validate")
  console.log(data)
  if (!data.user) {
    redirect.push("/auth"); // Redirige a /auth
    return null; // No renderizamos nada hasta que redirija
  }

  // Si estamos en /auth o el usuario está autenticado, mostramos los children
  return <>{children}</>;
};
