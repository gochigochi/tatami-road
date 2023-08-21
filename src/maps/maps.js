import Playground from "../components/Maps/Playground"

export const MapsScenes = {
    Playground,
}

export const mapsData = {
    playground: {
        mapComponent: "Playground",
        npcs: [
            {
                id: 1,
                name: "やまだ",
                position: [-1, 2, 4],
                rotation: [0, -Math.PI / 4, 0],
                model: "./models/npc.glb",
                type: "kinematicPosition",
                scripts: [
                    {
                        checkpoint: 0,
                        checkpointScripts: [
                            {
                                node: "error", // THIS IS FOR ERROR MESSAGES
                                text: "えっ。。。",
                            },
                            {
                                node: 0,
                                text: "おはよう。",
                                nextNode: 1,
                            },
                            {
                                node: 1,
                                text: "おげんきですか。",
                                requiresInput: true,
                                correctAnsw: "げんきです。", // IF CORRECT USE NEXT NODE ELSE GO TO INDEX?
                                nextNode: 2,
                            },
                            {
                                node: 2,
                                text: "ようかったです・",
                                isEnd: true,
                                nextCheckpoint: 1,
                            },
                        ],
                    },
                    {
                        checkpoint: 1,
                        checkpointScripts: [
                            {
                                node: 0,
                                text: "いい天気ですね。<br>どうおもいますか。",
                                isEnd: true,
                            },
                        ],
                    },
                ]
            },
            {
                id: 2,
                name: "たなか",
                position: [-4, 2, 1],
                rotation: [0, -Math.PI / 4, 0],
                model: "./models/npc-b.glb",
                type: "kinematicPosition",
                scripts: [
                    {
                        checkpoint: 0,
                        checkpointScripts: [
                            {
                                node: 0,
                                text: "おはよう。わたし　は　たなか　です。",
                                isEnd: true,
                            },
                        ],
                    },
                    {
                        checkpoint: 1,
                        checkpointScripts: [
                            {
                                node: "error", // THIS IS FOR ERROR MESSAGES
                                text: "えっ。。。",
                            },
                            {
                                node: 0,
                                text: "今日はいいてんきですね。",
                                requiresDrag: true,
                                draggables: ["そう", "はい", "です"],
                                correctAnsw: "はい、そうです。", // IF CORRECT USE NEXT NODE ELSE GO TO INDEX?
                                nextNode: 1,
                            },
                            {
                                node: 1,
                                text: "そうですね・",
                                isEnd: true,
                                nextCheckpoint: 3,
                            },
                        ],
                    },
                    {
                        checkpoint: 3,
                        checkpointScripts: [
                            {
                                node: 0,
                                text: "今日はいいてんきですね。",
                                isEnd: true,
                            },
                        ],
                    },
                ]
            },
        ],
    },
    heya: {

    },
}
