import Api from "./api";
import Ajouter from "./Ajouter";
import {NavbarUser} from "./Actions";
import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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

  const [editId, setEditId] = useState(null);
  const [editTitre, setEditTitre] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatut, setEditStatut] = useState("EN_COURS");

  const handleModifierTache = async (id, titre, description, statut) => {
    try {
      await modifierTache(id, titre, description, statut);
      toast.success(`Tâche modifiée avec succès à ${new Date().toLocaleTimeString()}`);
    } catch (err) {
      toast.error(`Erreur lors de la modification : ${err.message || err}`);
    }
  };

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
          <div
            key={tache.id}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between hover:shadow-lg transition h-80"
          >
            <div className="flex-1 flex flex-col">
              <div className="w-full h-32 flex items-center justify-center mb-2">
                {tache.photoUrl ? (
                  <img
                    src={tache.photoUrl}
                    alt="Photo tâche"
                    className="w-28 h-28 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-3xl">
                    <span className="material-icons">image</span>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2 text-center">{tache.titre}</h3>
              {tache.description && (
                <p className="text-sm text-gray-600 mb-2 text-center">{tache.description}</p>
              )}
              <span
                className={`px-2 py-1 text-xs rounded mt-2 inline-block self-center ${
                  tache.statut === "terminée"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tache.statut || "En cours"}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-4 justify-center">
              <button
                onClick={() => {
                  setEditId(tache.id);
                  setEditTitre(tache.titre);
                  setEditDescription(tache.description || "");
                  setEditStatut(tache.statut || "EN_COURS");
                }}
                className="text-gray-400 hover:text-blue-600 p-1"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => deleteTache(tache.id)}
                className="text-gray-400 hover:text-red-600 p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
            {editId === tache.id && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                  <h2 className="text-xl font-bold mb-4 text-blue-700">Modifier la tâche</h2>
                  <input
                    type="text"
                    value={editTitre}
                    onChange={(e) => setEditTitre(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-2"
                    placeholder="Titre de la tâche"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border rounded mb-2"
                    placeholder="Description"
                  />
                  <select
                    value={editStatut}
                    onChange={e => setEditStatut(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-2"
                  >
                    <option value="EN_COURS">En cours</option>
                    <option value="TERMINER">Terminée</option>
                    <option value="A_FAIRE">À faire</option>
                  </select>
                  <div className="flex gap-2 mt-4 justify-end">
                    <button
                      onClick={() => {
                        handleModifierTache(tache.id, editTitre, editDescription, editStatut);
                        setEditId(null);
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Valider
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
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
