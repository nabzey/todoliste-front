import { useEffect, useState } from "react";
import Listes from "./Listes";

export default function Page() {
 

  return (
  <div className="bg-white-900 rounded-xl shadow-lg w-full max-w-3xl p-8" style={{ width: "1200px", height: "600px" }}>
    <h1 className="text-3xl font-bold text-black text-center mb-6">
      Ma Todo-Liste
    </h1>
     <Listes/>
</div>

  );
}
