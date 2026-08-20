"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Group, PerspectiveCamera, LoopOnce } from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { cameraTarget } from "./CameraTarget";

interface Model3DProps {
    path: string;

    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: number | [number, number, number];

    autoRotate?: boolean;
    rotationSpeed?: number;

    animationSpeed?: number;

    lazy?: boolean;
    delay?: number;

    onLoad?: () => void;
    onSceneLoad?: (scene: Group) => void;
}


function LoadedModel({ 
    path, 
    group,
    onCameraLoad,
    onLoad,
    onSceneLoad,
    animationSpeed = 1,
}: { 
    path: string; 
    group: React.RefObject<Group | null>;
    onCameraLoad: (camera: PerspectiveCamera | null, scene: any) => void;
    onLoad?: () => void;
    onSceneLoad?: (scene : Group) => void
    animationSpeed?: number;
}) {

    const { scene, animations } = useGLTF(path);
    const { actions } = useAnimations(animations, group);

    const clonedScene = useMemo(() => scene.clone(), [scene]);


    // Avisar cuando el modelo ya está montado
    useEffect(() => {
    onLoad?.();
    onSceneLoad?.(clonedScene);
}, [clonedScene, onLoad, onSceneLoad]);


    // Obtener cámara interna del GLB
    useEffect(() => {

        const camera = clonedScene.getObjectByProperty(
            "type",
            "PerspectiveCamera"
        ) as PerspectiveCamera | null;


        if (!camera) return;

        camera.updateMatrixWorld(true);

        onCameraLoad(camera, clonedScene);

    }, [clonedScene, onCameraLoad]);


    // Animaciones del modelo
    useEffect(() => {

        if (!animations.length) return;


        Object.values(actions).forEach((action) => {
            if (!action) return;

            action.reset();
            action.timeScale = animationSpeed;
            action.setLoop(LoopOnce, 1);
            action.clampWhenFinished = true;
            action.fadeIn(0.4).play();
        });


        return () => {
            Object.values(actions).forEach((action) => {
                action?.stop();
            });
        };


    }, [actions, animations]);


    return (
        <primitive object={clonedScene} />
    );
}



export default function Model3D({ 
    path, 
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
    autoRotate = false, 
    rotationSpeed = 0.5,
    animationSpeed = 1,
    onLoad,
    onSceneLoad

}: Model3DProps) {


    const group = useRef<Group>(null);


    const handleCameraLoad = (
        camera: PerspectiveCamera | null,
        scene: any
    ) => {

        if (!camera) return;


        cameraTarget.current = camera;

    };


    useFrame((_, delta) => {

        if (!group.current) return;


        if (autoRotate) {
            group.current.rotation.y += delta * rotationSpeed;
        }

    });



    return (
        <group
            ref={group}
            position={position}
            rotation={rotation}
            scale={scale}
        >

            <Suspense fallback={null}>

                <LoadedModel
                    path={path}
                    group={group}
                    onCameraLoad={handleCameraLoad}
                    onLoad={onLoad}
                    onSceneLoad={onSceneLoad}
                    animationSpeed={animationSpeed}
                />

            </Suspense>

        </group>
    );
}