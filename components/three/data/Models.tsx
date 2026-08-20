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
        };

        duration?: number;
        fadeDelay?: number;
        fadeDuration?: number;
        ease?: string;
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

            duration: 1.5,
            fadeDelay: 1,
            fadeDuration: 0.5,
            ease: "power3.out",
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

            duration: 1.5,
            fadeDelay: 1,
            fadeDuration: 0.5,
            ease: "power3.out",
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

            duration: 1.5,
            fadeDelay: 1,
            fadeDuration: 0.5,
            ease: "power3.out",
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

            duration: 1.5,
            fadeDelay: 1,
            fadeDuration: 0.5,
            ease: "power3.out",
        },
    },
];