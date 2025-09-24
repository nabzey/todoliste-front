import Api from "./api";
import Ajouter from "./Ajouter";
import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";

export default function Listes() {
  const { taches, loading, error, addTache, deleteTache, modifierTache, fetchTaches } = Api();

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const searchFromUrl = searchParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [searchTerm, setSearchTerm] = useState(searchFromUrl);

  // mettre à jour l’URL quand la recherche change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchParams.set("search", value);
    searchParams.set("page", "1"); // reset à la première page
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
      (tache.description &&
        tache.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const tachesInversees = [...tachesFiltrees].reverse();
  const itemsPerPage = 2;
  const totalPages = Math.ceil(tachesInversees.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const tachesPage = tachesInversees.slice(startIdx, endIdx);

  const [editId, setEditId] = useState(null);
  const [editTitre, setEditTitre] = useState("");
  const [editDescription, setEditDescription] = useState("");

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
          onClick={fetchTaches}className="bg-blue-600 text-white px-4 py-2 rounded mt-2" >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher une tâche..."
          value={searchTerm}
          onChange={handleSearch}className="w-full px-3 py-2 border rounded" />
      </div> */}
      <div className="h-96 overflow-y-auto space-y-2 pr-2">
        <Ajouter addTache={addTache} />
        {tachesPage.map((tache) => (
          <div
            key={tache.id}
            className="flex justify-between items-center bg-white rounded-lg px-4 py-3 border border-gray-300 hover:bg-gray-50">
            <div className="flex items-center flex-1">
              <input type="checkbox" className="w-4 h-4 accent-blue-600 cursor-pointer" />
              <div className="ml-3 w-full">
                {editId === tache.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editTitre}
                      onChange={(e) => setEditTitre(e.target.value)}
                      className="w-full px-2 py-1 border rounded"/>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={2}
                      className="w-full px-2 py-1 border rounded"/>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => {modifierTache(tache.id, editTitre, editDescription); setEditId(null); }}
                        className="bg-blue-600 text-white px-3 py-1 rounded" >
                        Valider
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded" >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-sm font-medium text-black text-left">
                      {tache.titre}
                    </h3>
                    {tache.description && (
                      <p className="text-xs text-gray-500 mt-1 text-left">
                        {tache.description}
                      </p>
                    )}
                    <span
                      className={`px-2 py-1 text-xs rounded mt-2 inline-block ${
                        tache.statut === "terminée"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tache.statut || "En cours"}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {editId === tache.id ? null : (
                <button
                  onClick={() => {
                    setEditId(tache.id);
                    setEditTitre(tache.titre);
                    setEditDescription(tache.description || "");
                  }}
                  className="text-gray-400 hover:text-blue-600 p-1 ml-2"
                >
                  <Pencil size={18} />
                </button>
              )}
              <button
                onClick={() => deleteTache(tache.id)}
                className="text-gray-400 hover:text-red-600 p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
