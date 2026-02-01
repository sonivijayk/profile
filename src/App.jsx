import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home.jsx";
import AiDrivenApiDesign from "./pages/blog/AiDrivenApiDesign.jsx";
import OpenIdConnectEap from "./pages/blog/OpenIdConnectEap.jsx";

function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    requestAnimationFrame(() => {
      const id = hash.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, [hash]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/ai-driven-api-design" element={<AiDrivenApiDesign />} />
        <Route path="/blog/openid-connect-eap" element={<OpenIdConnectEap />} />
        <Route path="*" element={<div style={{ padding: 40 }}>NOT FOUND</div>} />
      </Routes>
    </>
  );  
}
