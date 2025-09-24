import { useState } from "react";
import Api from "./api";

export function TacheForm({ titre, description, onTitreChange, onDescriptionChange, onValider, onAnnuler, isEdit }) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold mb-2 text-purple-700">{isEdit ? "Modifier la tâche" : "Ajouter une tâche"}</h3>
      <input
        type="text"
        placeholder="Titre de la tâche"
        value={titre}
        onChange={onTitreChange}
        className="w-full px-4 py-2 rounded border-2 border-purple-300 mb-2 focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={onDescriptionChange}
        rows={3}
        className="w-full px-4 py-2 rounded border-2 border-purple-300 mb-2 focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={onValider}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white px-4 py-2 rounded font-semibold shadow"
        >Valider</button>
        <button
          onClick={onAnnuler}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold"
        >Annuler</button>
      </div>
    </div>
  );
}