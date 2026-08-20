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
        animationSpeed: 2,
    },

    {
        path: "/models/Monitor.glb",
        delay: 2200,
        animationSpeed: 2,
    },

];