import Playground from "../components/Maps/Playground"

export const MapsScenes = {
    Playground,
}

export const mapsData = {
    playground: {
        map: "Playground",
        npcs: [
            {
                id: 1,
                name: "やまだ",
                position: [-1, 2, 4],
                rotation: [0, -Math.PI / 4, 0],
                model: "./models/npc.glb",
                type: "kinematicPosition",
                localCheckpointIndex: 0,
                scripts: [
                    {
                        checkpoint: 0, //MANEJAR ESTOS DE MANERA GLOBAL
                        checkpointScripts: [
                            {
                                node: -2, // THIS IS FOR END OF CONVERSATION
                            },
                            {
                                node: -1, // THIS IS FOR ERROR MESSAGES
                                text: "えっ。。。",
                                nextNode: -2,
                            },
                            {
                                node: 0,
                                text: "おはよう。。。",
                                question: false,
                                // answ: null,
                                nextNode: 1,
                            },
                            {
                                node: 1,
                                text: "おげんきですか。",
                                question: false,
                                nextNode: 2,
                                requiresInput: true,
                                correctAnsw: "asdf", // IF CORRECT USE NEXT NODE ELSE GO TO INDEX?
                            },
                            {
                                node: 2,
                                text: "ようかったです・",
                                question: false,
                                // answ: null,
                                nextNode: -2,
                                nextCheckpoint: 1,
                            }, 
                            //*** FOR EXAMPLE, IF THIS LAST IS AN EXERCISE, IF SUCCEDED THEN UPDATE LOCALCHECKPOINTINDEX TO 1
                            //SO NEXT TIME IT STARTS FROM NEXT SCRIPT. BUT DO AS WELL A GLOBAL INDEX.
                        ],
                    },
                    {
    
                        checkpoint: 1,
                        checkpointScripts: [
                            {
                                node: 0,
                                text: "はい、そうです。",
                                question: false,
                                answ: null,
                                nextNode: 1,
                            },
                            {
                                node: 1,
                                text: "わかりました。",
                                question: false,
                                answ: null,
                                nextNode: 2,
                            },
                            {
                                node: 2,
                                text: "ひざしぶり。",
                                question: false,
                                answ: null,
                                nextNode: null,
                            },
                        ],
                    }
                ]
            },
            {
                id: 2,
                name: "たなか",
                position: [-4, 2, 1],
                rotation: [0, Math.PI / 4, 0],
                model: "./models/npc-b.glb",
                type: "kinematicPosition",
                scripts: [
                    {
                        checkpoint: 0,
                        checkpointScripts: [
                            {
                                node: -2,
                            },
                            {
                                node: 0,
                                text: "ううん。。。",
                                question: false,
                                answ: null,
                                nextNode: -2,
                            },
                        ],
                    }
                ]
            }
        ]
    },
    heya: {

    },
}