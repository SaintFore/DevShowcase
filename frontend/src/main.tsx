import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TechStack />
    <Projects />
  </StrictMode>,
);
