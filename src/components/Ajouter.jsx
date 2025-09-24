import { useState } from "react";

export default function Formulaire({ addTache }) {
  const [showForm, setShowForm] = useState(false);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Nouvelle tâche..."
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg shadow"
        >
          Ajouter +
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg border border-gray-300 p-5 mt-4">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Titre de la tâche"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  addTache(titre, description);
                  setTitre("");
                  setDescription("");
                  setShowForm(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg"
              >
                Valider
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
