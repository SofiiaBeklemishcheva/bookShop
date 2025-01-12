import './App.css';
import { Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import MyProfile from "./pages/MyProfile";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Główne strony */}
          {/*    <Route index element={<Login />} />*/}
          <Route path="home" element={<Home />} />
            <Route path="myProfile" element={<MyProfile />} />




          {/* Opcjonalnie strona 404 */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
  );
}

export default App;
