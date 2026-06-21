import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { PageTransition } from "./components/PageTransition";
import { Contacts } from "./pages/Contacts";
import { Developers } from "./pages/Developers";
import { Events } from "./pages/Events";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export default function App() {
  return (
    <Layout>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageTransition>
    </Layout>
  );
}
