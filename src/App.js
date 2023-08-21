import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./components/nav/Menu";

const App = () => {
  return (
    <BrowserRouter>
    <Menu />
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
