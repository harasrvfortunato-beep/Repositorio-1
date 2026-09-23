import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Animais from "./pages/Animais";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Passeios from "./pages/Passeios";
import Produtos from "./pages/Produtos";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="passeios" element={<Passeios />} />
        <Route path="produtos" element={<Produtos />} />
        <Route path="animais" element={<Animais />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
