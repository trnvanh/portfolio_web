import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import JEASINGS, { JEasing } from "jeasings";
import * as THREE from "three";
import Cube from "./Cube";
import { normals, sectionCenters } from "../data/sectionCenters";

const Rubik = forwardRef(({ onFaceClick, onFaceChange }, ref) => {
  const cubeRef = useRef();
  const rotationGroup = useRef();
  const { camera } = useThree();
  const movesHistory = useRef([]); // keep track of moves for solving

  // Detect which face is front
  useFrame(() => {
    JEASINGS.update();

    if (cubeRef.current) {
      let maxDot = -Infinity;
      let currentFace = null;

      Object.entries(normals).forEach(([face, normal]) => {
        const worldNormal = new THREE.Vector3(...normal).applyQuaternion(
          cubeRef.current.quaternion
        );
        const toCamera = new THREE.Vector3()
          .subVectors(camera.position, cubeRef.current.position)
          .normalize();

        const dot = worldNormal.dot(toCamera);
        if (dot > maxDot) {
          maxDot = dot;
          currentFace = face;
        }
      });

      if (currentFace && onFaceChange) {
        onFaceChange({ face: currentFace, ...sectionCenters[currentFace] });
      }
    }
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!cubeRef.current || !rotationGroup.current) return;

      switch (e.key.toLowerCase()) {
        case "q": rotate("x", -0.5, 1); break;
        case "w": rotate("x", -0.5, -1); break;
        case "e": rotate("x", +0.5, 1); break;
        case "r": rotate("x", +0.5, -1); break;
        case "a": rotate("y", -0.5, 1); break;
        case "s": rotate("y", -0.5, -1); break;
        case "d": rotate("y", 0.5, 1); break;
        case "f": rotate("y", 0.5, -1); break;
        case "z": rotate("z", 0.5, 1); break;
        case "x": rotate("z", 0.5, -1); break;
        case "c": rotate("z", -0.5, 1); break;
        case "v": rotate("z", -0.5, -1); break;
        default: break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);


  // === ROTATION HELPERS ===
  function rotate(axis, limit, multiplier, logMove = true) {
    if (!JEASINGS.getLength()) {
      resetCubeGroup(cubeRef.current, rotationGroup.current);
      attachToRotationGroup(cubeRef.current, rotationGroup.current, axis, limit);
      animateRotationGroup(rotationGroup.current, axis, multiplier);

      if (logMove) {
        movesHistory.current.push({ axis, limit, multiplier });
      }
    }
  }

  function animateRotationGroup(rotationGroup, axis, multiplier) {
    new JEasing(rotationGroup.rotation)
      .to(
        { [axis]: rotationGroup.rotation[axis] + (Math.PI / 2) * multiplier },
        250
      )
      .easing(JEASINGS.Cubic.InOut)
      .start();
  }

  function attachToRotationGroup(cubeGroup, rotationGroup, axis, limit) {
    cubeGroup.children
      .slice()
      .reverse()
      .filter((c) =>
        limit < 0 ? c.position[axis] < limit : c.position[axis] > limit
      )
      .forEach((c) => rotationGroup.attach(c));
  }

  function resetCubeGroup(cubeGroup, rotationGroup) {
    rotationGroup.children.slice().reverse().forEach((c) => cubeGroup.attach(c));
    rotationGroup.quaternion.set(0, 0, 0, 1);
  }

  // === PUBLIC METHODS (exposed to App.jsx) ===
  function scrambleCube() {
    const moves = ["x", "y", "z"];
    for (let i = 0; i < 10; i++) {
      const axis = moves[Math.floor(Math.random() * moves.length)];
      const limit = Math.random() > 0.5 ? 0.5 : -0.5;
      const multiplier = Math.random() > 0.5 ? 1 : -1;
      rotate(axis, limit, multiplier, true);
    }
  }

  function solveCube() {
    // Undo moves in reverse order
    const history = [...movesHistory.current].reverse();
    history.forEach(({ axis, limit, multiplier }, i) => {
      setTimeout(() => {
        rotate(axis, limit, -multiplier, false); // reverse move
      }, i * 300);
    });
    movesHistory.current = [];
  }

  // Expose methods to App.jsx
  useImperativeHandle(ref, () => ({
    scrambleCube,
    solveCube,
  }));

  // === RENDER CUBE ===
  return (
    <>
      <group ref={cubeRef}>
        {[...Array(3).keys()].map((x) =>
          [...Array(3).keys()].map((y) =>
            [...Array(3).keys()].map((z) => {
              const pos = [x - 1, y - 1, z - 1];
              const sectionEntry = Object.entries(sectionCenters).find(
                ([, { pos: secPos }]) =>
                  secPos[0] === pos[0] &&
                  secPos[1] === pos[1] &&
                  secPos[2] === pos[2]
              );
              if (sectionEntry) {
                const [sectionName, { label }] = sectionEntry;
                return (
                  <Cube
                    key={`${x}-${y}-${z}`}
                    position={pos}
                    clickable
                    onClick={() => onFaceClick(sectionName)}
                  />
                );
              }
              return <Cube key={`${x}-${y}-${z}`} position={pos} />;
            })
          )
        )}
      </group>
      <group ref={rotationGroup} />
    </>
  );
});

export default Rubik;
