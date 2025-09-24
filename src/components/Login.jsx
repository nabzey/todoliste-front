import { useState } from "react";

export default function Inscription() {
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    login: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = (path) => {
    window.location.href = path;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.login || !formData.password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Inscription réussie !");
        setFormData({ name: "", email: "", login: "", password: "" });
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.message || "Erreur lors de l'inscription.");
      }
    } catch (err) {
      setError("Login ou mot de passe existe déjà");
    } finally {
      setLoading(false);
    }
  };


  const inputs = [
    { name: "name", type: "text", placeholder: "Nom d'utilisateur" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "login", type: "text", placeholder: "Login" },
    { name: "password", type: "password", placeholder: "Mot de passe" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md"
    >
      <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">Inscription</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm">
          {successMessage}
        </div>
      )}

      {inputs.map(({ name, type, placeholder }) => (
        <input
          key={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          disabled={loading}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      ))}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded text-white text-lg font-medium transition ${
          loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Inscription en cours..." : "S'inscrire"}
      </button>

      <p className="mt-4 text-center text-sm text-gray-600">
        Déjà inscrit ?{" "}
        <span
          type="button"
          onClick={() => navigate("/")}
          className="text-blue-600 underline cursor-pointer"
        >
          Se connecter
        </span>
      </p>
    </form>
  );
}
