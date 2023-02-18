import { useContext } from "react";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import { AuthContext } from "./context/usercontext";

function App() {
  const currentUser = useContext(AuthContext);
  return <>{currentUser ? <MainPage /> : <Login />}</>;
}

export default App;
