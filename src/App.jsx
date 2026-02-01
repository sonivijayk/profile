import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AiDrivenApiDesign from "./pages/blog/AiDrivenApiDesign.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/ai-driven-api-design" element={<AiDrivenApiDesign />} />
      <Route path="*" element={<div style={{ padding: 40 }}>NOT FOUND</div>} />
    </Routes>
  );  
}
