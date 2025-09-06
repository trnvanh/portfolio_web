import React, { useState, useRef } from "react";
import "./Window.css";

function RetroWindow({ title = "A window", children, onClose, onFocus, initialX = 100, initialY = 100, zIndex = 1 }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width: 600, height: 500 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);
  const dragData = useRef(null);
  const resizeData = useRef(null);

  // Dragging
  const onMouseDown = (e) => {
    if (e.target.classList.contains("retro-header")) {
      dragData.current = {
        offsetX: e.clientX - position.x,
        offsetY: e.clientY - position.y,
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
    if (onFocus) onFocus();
  };

  const onMouseMove = (e) => {
    if (dragData.current) {
      setPosition({
        x: e.clientX - dragData.current.offsetX,
        y: e.clientY - dragData.current.offsetY,
      });
    }
    if (resizeData.current) {
      const { startX, startY, startWidth, startHeight } = resizeData.current;
      const newWidth = Math.max(200, startWidth + (e.clientX - startX));
      const newHeight = Math.max(100, startHeight + (e.clientY - startY));
      setSize({ width: newWidth, height: newHeight });
    }
  };

  const onMouseUp = () => {
    dragData.current = null;
    resizeData.current = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  // Resize handle
  const onResizeMouseDown = (e) => {
    e.stopPropagation();
    resizeData.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const toggleMinimize = () => setIsMinimized(!isMinimized);
  const toggleMaximize = () => {
    if (isMaximized) {
      setSize({ width: 400, height: 300 });
      setPosition({ x: 100, y: 100 });
    } else {
      setSize({ width: window.innerWidth - 40, height: window.innerHeight - 40 });
      setPosition({ x: 20, y: 20 });
    }
    setIsMaximized(!isMaximized);
  };

  return (
    <div
      ref={windowRef}
      className="retro-window"
      style={{
        top: position.y,
        left: position.x,
        width: size.width,
        height: isMinimized ? "40px" : size.height,
        position: "absolute",
        zIndex: zIndex,
      }}
      onMouseDown={onMouseDown}
    >
      <div className="retro-header">
        <span className="retro-title">{title}</span>
        <div className="retro-buttons">
          <button className="retro-btn" onClick={toggleMinimize}>
            --
          </button>
          <button className="retro-btn" onClick={toggleMaximize}>
            O
          </button>
          <button
            className="retro-btn close"
            onClick={onClose}
          >
            X
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="retro-content">
          {children}
        </div>
      )}

      {/* resize handle */}
      {!isMinimized && <div className="resize-handle" onMouseDown={onResizeMouseDown} />}
    </div>
  );
}

export default RetroWindow;
