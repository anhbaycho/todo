import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from './pages/Details';
import Signup from "./pages/Signup";
import Signin from './pages/Signin';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail" element={<Details/>} />
      <Route path="*" element={<p>Error</p>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
  );
}

export default App;
