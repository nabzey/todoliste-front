import { useRef, useState } from "react";
import AudioRecorder from "./apivocal";

export default function Formulaire({ addTache }) {
  const [showForm, setShowForm] = useState(false);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioRef = useRef();

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Nouvelle tâche..."
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow"
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg shadow font-semibold"
        >
          Ajouter +
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-300 p-5 mt-4 shadow-md">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Titre de la tâche"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none shadow"
            />
            <input
              type="file"
              accept="image/*"
              placeholder="Télécharger une photo"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  setPhotoFile(file);
                }
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow"
            />
            {photoFile && (
              <img
                src={URL.createObjectURL(photoFile)}
                alt="Aperçu"
                className="w-32 h-32 object-cover rounded-lg border mb-2"
              />
            )}
            {/* Enregistrement audio vocal via AudioRecorder */}
            <AudioRecorder onAudioReady={setAudioBlob} />
            {audioBlob && (
              <audio controls className="w-full mb-2">
                <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
                Votre navigateur ne supporte pas l'audio.
              </audio>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  addTache(titre, description, photoFile, audioBlob);
                  setTitre("");
                  setDescription("");
                  setPhotoFile("");
                  setAudioBlob(null);
                  setShowForm(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg font-semibold shadow"
              >
                Valider
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow"
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
