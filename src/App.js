import './App.css';
import { Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import MyProfile from "./pages/MyProfile";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
            <Route path="myProfile" element={<MyProfile />} />

        </Route>
      </Routes>
  );
}

export default App;
