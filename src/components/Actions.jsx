import { useState } from "react";
import Api from "./api";

export function TacheForm({ titre, description, dateDebut, dateFin, onTitreChange, onDescriptionChange, onDateDebutChange, onDateFinChange, onValider, onAnnuler, isEdit }) {
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
      <label className="block text-left text-sm mt-2 mb-1 text-gray-700">Date de début</label>
      <input
        type="datetime-local"
        value={dateDebut}
        onChange={onDateDebutChange}
        className="w-full px-4 py-2 rounded border-2 border-purple-300 mb-2"
      />
      <label className="block text-left text-sm mt-2 mb-1 text-gray-700">Date de fin</label>
      <input
        type="datetime-local"
        value={dateFin}
        onChange={onDateFinChange}
        className="w-full px-4 py-2 rounded border-2 border-purple-300 mb-2"
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

export function NavbarUser() {
  // Récupère l'email stocké lors de la connexion
  const email = localStorage.getItem("email") || localStorage.getItem("userEmail") || "Utilisateur";
  console.log(email);
  
  return (
    <nav className="w-full bg-white shadow flex justify-end items-center px-8 py-4 mb-8 rounded">
      <span className="font-semibold text-blue-700 mr-4">{email}</span>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("userEmail");
          window.location.href = "/";
        }}
        className="bg-gray-200 hover:bg-red-400 text-red-700 px-3 py-1 rounded shadow"
      >
        Déconnexion
      </button>
    </nav>
  );
}