export type SceneModel = {
    path: string;
    delay?: number;
    animationSpeed?: number;
};

export const sceneModels: SceneModel[] = [

    {
        path: "/models/Chair.glb",
        delay: 0,
        animationSpeed: 3,
    },

    {
        path: "/models/Desk.glb",
        delay: 800,
        animationSpeed: 3,
    },

    {
        path: "/models/PCGamer.glb",
        delay: 1800,
        animationSpeed: 3,
    },

    {
        path: "/models/Monitor.glb",
        delay: 2500,
        animationSpeed: 2,
    },

    {
        path: "/models/KeyBoard.glb",
        delay: 2900,
        animationSpeed: 2,
    },

    {
        path: "/models/Headset.glb",
        delay: 3300,
        animationSpeed: 2,
    },

    {
        path: "/models/secondDesk.glb",
        delay: 4000,
        animationSpeed: 2,
    },

    {
        path: "/models/MittCirkel.glb",
        delay: 4500,
        animationSpeed: 2,
    },

];