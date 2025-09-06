import React from "react";
import { useCursor } from "@react-three/drei";

export default function Cube({ position, clickable = false, onClick }) {
  const colors = ["#FF714B", "#FFB8E0", "white", "#ff9a56", "#d52d00", "#BE5985"];
  useCursor(clickable);

  return (
    <>
    <mesh
      position={position}
      onClick={(e) => {
        if (clickable && onClick) {
          e.stopPropagation(); // prevent affecting parent/group
          onClick();
        }
      }}
    >
      <boxGeometry args={[0.95, 0.95, 0.95]} />
      <meshPhysicalMaterial attach="material-0" color={colors[0] || 'black'} roughness={0.3} metalness={0.1} clearcoat={1} /> {/* right */}
      <meshPhysicalMaterial attach="material-1" color={colors[1] || 'black'} roughness={0.3} metalness={0.1} clearcoat={1} /> {/* left */}
      <meshPhysicalMaterial attach="material-2" color={colors[2] || 'black'} roughness={0.3} metalness={0.1} clearcoat={1} /> {/* top */}
      <meshPhysicalMaterial attach="material-3" color={colors[3] || 'black'} roughness={0.3} metalness={0.1} clearcoat={1} /> {/* bottom */}
      <meshPhysicalMaterial attach="material-4" color={colors[4] || 'black'} roughness={0.3} metalness={0.1} clearcoat={1} /> {/* front */}
      <meshPhysicalMaterial attach="material-5" color={colors[5] || 'black'} roughness={0.3} metalness={0.1} clearcoat={1} /> {/* back */}
    
    </mesh>
    <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} /> 
        <meshStandardMaterial color="#A30262" />
    </mesh>
    </>
  );
}
