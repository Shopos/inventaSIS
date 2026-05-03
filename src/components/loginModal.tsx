import { useState } from "react";
import "./loginModal.css";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginModal({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const mail = "admin-inventario@inventasis.com";

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, mail, password);
      onSuccess();
    } catch (e) {
      console.error(e);
      setError(true);
    }
  };

  return (
    <div className="overlayDiv-lm">
      <div className="modal-lm">
        <h2>Acceso Administración</h2>

        <input
          type="password"
          placeholder="Ingrese clave"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Entrar</button>

        {error && <p style={{ color: "red" }}>Clave incorrecta</p>}
      </div>
    </div>
  );
}

export default LoginModal;
