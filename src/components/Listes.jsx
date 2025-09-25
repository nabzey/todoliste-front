import Api from "./api";
import Ajouter from "./Ajouter";
import Card from "./Card";
import {NavbarUser} from "./Actions";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Listes() {
  const { taches, loading, error, addTache, deleteTache, modifierTache, fetchTaches } = Api();

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const searchFromUrl = searchParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [searchTerm, setSearchTerm] = useState(searchFromUrl);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchParams.set("search", value);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(pageFromUrl);
    setSearchTerm(searchFromUrl);
  }, [pageFromUrl, searchFromUrl]);

  const tachesFiltrees = taches.filter(
    (tache) =>
      tache.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tache.description && tache.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const tachesInversees = [...tachesFiltrees].reverse();
  const itemsPerPage = 3;
  const totalPages = Math.ceil(tachesInversees.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const tachesPage = tachesInversees.slice(startIdx, endIdx);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p>Chargement des tâches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchTaches}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <NavbarUser/>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between items-center mb-6">
        <Ajouter addTache={addTache} />
      </div>
      <input
        type="text"
        placeholder="Rechercher une tâche..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 w-full px-3 py-2 border rounded bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tachesPage.map((tache) => (
          <Card 
            key={tache.id}
            tache={tache}
            deleteTache={deleteTache}
            modifierTache={modifierTache}
          />
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}