import { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = (path) => {
    window.location.href = path;
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:5000/users/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.accesToken) {
          localStorage.setItem('token', data.data.accesToken);
          navigate("/page");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erreur d\'authentification');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg border-2 border-gray-300 p-8 flex items-center justify-center" style={{ width: "400px", height: "400px" }}>
      <div className="w-full space-y-6">
        <p className="text-black">Connectez-vous pour accéder à vos tâches</p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button 
          onClick={handleLogin} 
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 px-4 rounded transition-colors"
        >
          {loading ? 'Connexion...' : 'Connexion'}
        </button>
        <p className="text-gray-500">Vous n'avez pas de compte? <span className="cursor-pointer" onClick= {()=>navigate("/Login")}>Inscription</span></p>
      </div>
    </div>
  );
}