import { useState, useEffect } from "react";

export default function Api() {
  const [taches, setTaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchTaches = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:4000/taches", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        window.location.href = "/";
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setTaches(data);
        setError(null);
      } else {
        setError("Erreur lors de la récupération des tâches");
      }
    } catch (err) {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const addTache = async (titre, description, photoFile, audioBlob) => {
    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("titre", titre);
      formData.append("description", description || titre);
      if (photoFile) {
        formData.append("photo", photoFile);
      }
      if (audioBlob) {
        formData.append("audio", audioBlob, "message.webm");
      }
      const response = await fetch("http://localhost:4000/taches", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        fetchTaches();
      } else {
        const errorText = await response.text();
        setError("Erreur lors de l'ajout : " + errorText);
        console.error("Erreur API:", errorText);
      }
    } catch {
      setError("Erreur de connexion");
    }
  };

  const deleteTache = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:4000/taches/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (response.ok) {
        fetchTaches();
      } else {
        setError("Erreur lors de la suppression");
      }
    } catch {
      setError("Erreur de connexion");
    }
  };

  const modifierTache = async (id, titre, description, statut) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:4000/taches/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titre, description, statut }),
      });

      if (response.ok) {
        fetchTaches();
        setMessage("✏️ Tâche modifiée");
      } else {
        setError("Erreur lors de la modification");
      }
    } catch {
      setError("Erreur de connexion");
    }
  };

  useEffect(() => {
    fetchTaches();
  }, []);

  return { taches, loading, error, message, setMessage, setError, fetchTaches, addTache, deleteTache, modifierTache };
}