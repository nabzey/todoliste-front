import { useEffect, useState } from "react";
import Listes from "./Listes";

export default function Page() {
 

  return (
    <>
      
      <div className="w-full max-w-6xl mx-auto p-12">
        <h1 className="text-3xl font-bold text-black text-center mb-8">Ma Todo-Liste</h1>
      
        <Listes />
      </div>
    </>
  );
}
