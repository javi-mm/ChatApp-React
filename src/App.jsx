import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Spinner from "./components/Spinner";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Spinner />;

  return <>{user ? <MainPage /> : <Login />}</>;
}

export default App;
