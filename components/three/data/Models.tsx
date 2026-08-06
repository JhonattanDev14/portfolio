export type SceneModel = {
    path: string;
    delay?: number;
    animation?: {
        type: "fadeUp";
        from?: {
            x?: number;
            y?: number;
            z?: number;
            scale?: number;
            opacity?: number;
        };
        duration?: number;
    };
};

export const sceneModels: SceneModel[] = [
    {
        path: "/models/Chair.glb",
        delay: 0,
        animation: {
            type: "fadeUp",
            from: {
                y: 2,
            },
        },
    },
    {
        path: "/models/Desk.glb",
        delay: 500,
        animation: {
            type: "fadeUp",
            from: {
                z: 5,
            },
        },
    },
    {
        path: "/models/PCGamer.glb",
        delay: 1000,
        animation: {
            type: "fadeUp",
            from: {
                x: -5,
            },
        },
    },
    {
        path: "/models/Monitor.glb",
        delay: 1200,
        animation: {
            type: "fadeUp",
            from: {
                y: -5,
            },
        },
    },
];