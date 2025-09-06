import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import Rubik from "./components/RubiksCube";
import RetroWindow from "./components/Window";
import "./App.css";

import AboutTab from "./tabs/AboutTab";
import SchoolProjectsTab from "./tabs/SchoolProjectsTab";
import FunProjectsTab from "./tabs/FunProjectsTab";
import UiUxProjectsTab from "./tabs/UiUxProjectsTab";
import ContactTab from "./tabs/ContactTab";
import SkillsTab from "./tabs/SkillsTab";
import { sectionCenters } from "./data/sectionCenters";

const TAB_COMPONENTS = {
  front: AboutTab,
  back: SchoolProjectsTab,
  left: FunProjectsTab,
  right: UiUxProjectsTab,
  top: ContactTab,
  bottom: SkillsTab,
};

function App() {
  const [windows, setWindows] = useState([]); // use array to track active windows
  const [zCounter, setZCounter] = useState(1); // when clicking on a window, it comes forward = it gets the highest z-index
  const [currentFace, setCurrentFace] = useState(null);

  const handleOpenWindow = (sectionKey) => {
    // Allow multiple windows (don’t overwrite previous ones)
    // Create random offset so windows don't overlap exactly when opened
    const offsetX = Math.floor(Math.random() * 200);
    const offsetY = Math.floor(Math.random() * 150);

    setWindows((prev) => [
      ...prev,
      { id: Date.now(), section: sectionKey, title: sectionCenters[sectionKey].label.toUpperCase(), x: 100 + offsetX, y: 100 + offsetY, zIndex: zCounter },
    ]);
    setZCounter((z) => z + 1);
  };

  const handleCloseWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const bringToFront = (id) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: zCounter } : w
      )
    );
    setZCounter((z) => z + 1);
  };

  return (
    <div className="app-container">
      {/* === Header Section === */}
      <header className="site-header">
        <h1 className="site-title">Anh Tran</h1>
        <p className="site-tagline">Hello! Welcome to my portfolio website.</p>
        <p className="site-instructions">
          Click the center of a Rubik’s Cube face to navigate thru sections.
          <br />
          Use your mouse to rotate (click and move the mouse) and resize the cube. Use keyboard keys (QWER/ASDF/ZXCV) to spin sides!
        </p>

      </header>
      
      {currentFace && (
        <p>
          {currentFace.label}
        </p>
      )}

      {/* 3D Canvas */}
      <Canvas camera={{ position: [6, 6, 6], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} />
        <OrbitControls />

        {/* Rubik component communicates clicks upward */}
        <Rubik onFaceClick={handleOpenWindow} onFaceChange={(section) => setCurrentFace(section)} />
      </Canvas>

      {currentFace && (
        <p>
          {currentFace.label}
        </p>
      )}

      {/* Window (site section) */}
      {windows.map((w) => {
        const TabComponent = TAB_COMPONENTS[w.section];
      return (
        <RetroWindow
          key={w.id}
          title={w.title}
          onClose={() => handleCloseWindow(w.id)}
          onFocus={() => bringToFront(w.id)}
          initialX={w.x}
          initialY={w.y}
          zIndex={w.zIndex}
        >
          <TabComponent/>
        </RetroWindow>
      );
      })}
    </div>
  );
}

export default App;
