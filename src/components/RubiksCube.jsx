import { useFrame, useThree } from "@react-three/fiber";
import JEASINGS, { JEasing } from "jeasings";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import Cube from "./Cube";
import { sectionCenters, normals } from "../data/sectionCenters";


function Rubik({ onFaceClick, onFaceChange }) {
  const ref = useRef();
  const rotationGroup = useRef();
  const { camera } = useThree();

  useFrame(() => {
    JEASINGS.update();

    if (ref.current) {
      let maxDot = -Infinity;
      let currentFace = null;

      Object.entries(normals).forEach(([face, normal]) => {
        const worldNormal = new THREE.Vector3(...normal).applyQuaternion(
          ref.current.quaternion
        );

        const toCamera = new THREE.Vector3()
          .subVectors(camera.position, ref.current.position)
          .normalize();

        const dot = worldNormal.dot(toCamera);

        if (dot > maxDot) {
          maxDot = dot;
          currentFace = face;
        }
      });

      if (currentFace && onFaceChange) {
        // Now pass the full section object instead of just "front/back"
        onFaceChange({ face: currentFace, ...sectionCenters[currentFace] });
      }
    }
  });

  // rotation logic same as before...
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.stopPropagation();
      if (e.key.toLowerCase() === "q") rotate(ref.current, rotationGroup.current, "x", -0.5, 1);
      if (e.key.toLowerCase() === "w") rotate(ref.current, rotationGroup.current, "x", -0.5, -1);
      if (e.key.toLowerCase() === "e") rotate(ref.current, rotationGroup.current, "x", +0.5, 1);
      if (e.key.toLowerCase() === "r") rotate(ref.current, rotationGroup.current, "x", +0.5, -1);
      if (e.key.toLowerCase() === "a") rotate(ref.current, rotationGroup.current, "y", -0.5, 1);
      if (e.key.toLowerCase() === "s") rotate(ref.current, rotationGroup.current, "y", -0.5, -1);
      if (e.key.toLowerCase() === "d") rotate(ref.current, rotationGroup.current, "y", 0.5, 1);
      if (e.key.toLowerCase() === "f") rotate(ref.current, rotationGroup.current, "y", 0.5, -1);
      if (e.key.toLowerCase() === "z") rotate(ref.current, rotationGroup.current, "z", 0.5, 1);
      if (e.key.toLowerCase() === "x") rotate(ref.current, rotationGroup.current, "z", 0.5, -1);
      if (e.key.toLowerCase() === "c") rotate(ref.current, rotationGroup.current, "z", -0.5, 1);
      if (e.key.toLowerCase() === "v") rotate(ref.current, rotationGroup.current, "z", -0.5, -1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <group ref={ref}>
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
                const [sectionName, { color, label }] = sectionEntry;
                return (
                  <Cube
                    key={`${x}-${y}-${z}`}
                    position={pos}
                    clickable
                    highlightColor={color}
                    onClick={() => onFaceClick(sectionName)}
                  />
                );
              }
              return <Cube key={`${x}-${y}-${z}`} position={pos}  />;
            })
          )
        )}
      </group>
      <group ref={rotationGroup} />
    </>
  );
}

// helpers same as before...
function rotate(cubeGroup, rotationGroup, axis, limit, multiplier) {
  if (!JEASINGS.getLength()) {
    resetCubeGroup(cubeGroup, rotationGroup);
    attachToRotationGroup(cubeGroup, rotationGroup, axis, limit);
    animateRotationGroup(rotationGroup, axis, multiplier);
  }
}
function animateRotationGroup(rotationGroup, axis, multiplier) {
  new JEasing(rotationGroup.rotation)
    .to({ [axis]: rotationGroup.rotation[axis] + (Math.PI / 2) * multiplier }, 250)
    .easing(JEASINGS.Cubic.InOut)
    .start();
}
function attachToRotationGroup(cubeGroup, rotationGroup, axis, limit) {
  cubeGroup.children
    .slice()
    .reverse()
    .filter((c) => (limit < 0 ? c.position[axis] < limit : c.position[axis] > limit))
    .forEach((c) => rotationGroup.attach(c));
}
function resetCubeGroup(cubeGroup, rotationGroup) {
  rotationGroup.children.slice().reverse().forEach((c) => cubeGroup.attach(c));
  rotationGroup.quaternion.set(0, 0, 0, 1);
}

export default Rubik;
