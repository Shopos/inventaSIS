import { useState } from "react";
import LoginModal from "../components/loginModal";
import ProductTable from "../components/productTable";
import "./admin.css"
function Admin() {
  const [isAuth, setAuth] = useState(false);

  return (
    <div>
      {!isAuth && <LoginModal onSuccess={() => setAuth(true)} />}

      {isAuth && (
        <>
          <h1>Panel de Administración</h1>
          <ProductTable />
        </>
      )}
    </div>
  );
}

export default Admin;