"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import {
  Gltf,
  Environment,
  Fisheye,
  KeyboardControls,
} from "@react-three/drei";
// @ts-ignore
import Controller from "ecctrl";

function ThreeJs() {
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
  ];

  return (
    <div className="w-[100%] h-[100%] relative">
      <img className=" absolute bottom-0 left-0 z-[1] w-[300px] p-5" src="/lib/controls.png" alt="control keys" />
      <Canvas shadows onPointerDown={(e: any) => e.target.requestPointerLock()}>
        <Fisheye zoom={0.4}>
          <Environment files="/lib/night.hdr" ground={{ scale: 100 }} />
          <directionalLight
            intensity={0.7}
            castShadow
            shadow-bias={-0.0004}
            position={[-20, 20, 20]}
          >
            <orthographicCamera
              attach="shadow-camera"
              args={[-20, 20, 20, -20]}
            />
          </directionalLight>
          <ambientLight intensity={0.2} />
          <Physics timeStep="vary">
            <KeyboardControls map={keyboardMap}>
              <Controller maxVelLimit={5}>
                <Gltf
                  castShadow
                  receiveShadow
                  scale={0.315}
                  position={[0, -0.55, 0]}
                  src="/lib/ghost_w_tophat-transformed.glb"
                />
              </Controller>
            </KeyboardControls>
            <RigidBody type="fixed" colliders="trimesh">
              <Gltf
                castShadow
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                scale={0.11}
                src="/lib/fantasy_game_inn2-transformed.glb"
              />
            </RigidBody>
          </Physics>
        </Fisheye>
      </Canvas>
    </div>
  );
}

export default ThreeJs;
