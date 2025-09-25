import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function TacheCard({ tache, deleteTache, modifierTache }) {
  const [editId, setEditId] = useState(null);
  const [editTitre, setEditTitre] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatut, setEditStatut] = useState("EN_COURS");
  const [showDetails, setShowDetails] = useState(false);
  const [detailsMessage, setDetailsMessage] = useState("");

  const handleModifierTache = async (id, titre, description, statut) => {
    try {
      await modifierTache(id, titre, description, statut);
      toast.success(`Tâche modifiée avec succès à ${new Date().toLocaleTimeString()}`);
      setDetailsMessage(`La tâche "${titre}" a été mise à jour le ${new Date().toLocaleString()}.`);
    } catch (err) {
      toast.error(`Erreur lors de la modification : ${err.message || err}`);
      setDetailsMessage(`Erreur lors de la modification de la tâche "${titre}".`);
    }
  };

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  // Fonction utilitaire pour tronquer le texte à 10 caractères
  const truncate = (text) => {
    if (!text) return '';
    return text.length > 10 ? text.slice(0, 10) + '...' : text;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between hover:shadow-lg transition h-80">
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
          <h3 className="text-lg font-semibold text-blue-700 mb-2 text-center">{truncate(tache.titre)}</h3>
          {tache.description && (
            <p className="text-sm text-gray-600 mb-2 text-center">{truncate(tache.description)}</p>
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

          {/* Affichage de l'audio sur la tâche si audioUrl présent */}
          {tache.audioUrl && (
            <audio controls className="w-full mb-2">
              <source src={tache.audioUrl} type="audio/webm" />
              Votre navigateur ne supporte pas l'audio.
            </audio>
          )}
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
            title="Modifier"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => deleteTache(tache.id)}
            className="text-gray-400 hover:text-red-600 p-1"
            title="Supprimer"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={handleShowDetails}
            className="text-gray-400 hover:text-green-600 p-1"
            title="Voir les détails"
          >
         <MoreHorizontal size={18} /> 
          </button>
        </div>
      </div>

      {/* Modale édition */}
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

      {/* Popup détails */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm text-center">
            <p className="mb-2 text-blue-700 font-semibold">Détails de la tâche</p>
            <p className="text-sm text-gray-700">Date d'ajout : {tache.createdAt ? new Date(tache.createdAt).toLocaleString() : 'N/A'}</p>
            <p className="text-sm text-gray-700">Dernière modification : {tache.updatedAt && tache.updatedAt !== tache.createdAt ? new Date(tache.updatedAt).toLocaleString() : 'Aucune modification'}</p>
            <p className="mt-2 text-gray-600">{detailsMessage}</p>
            <button
              onClick={() => setShowDetails(false)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
