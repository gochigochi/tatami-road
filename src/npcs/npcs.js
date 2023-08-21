export const npcsData = [
    {
        id: 1,
        name: "やまだ",
        // position: [-1, 2, 4],
        // rotation: [0, -Math.PI / 4, 0],
        model: "./models/npc.glb",
        type: "kinematicPosition",
        // localCheckpointIndex: 0,
        allScripts: [
            {
                globalCheckpoint: 0,
                scripts: [
                    {
                        localCheckpoint: 0,
                        scripts: [
                            {
                                scriptNode: -2, // THIS IS FOR END OF CONVERSATION
                            },
                            {
                                scriptNode: -1, // THIS IS FOR ERROR MESSAGES
                                text: "えっ。。。",
                                nextNode: -2,
                            },
                            {
                                scriptNode: 0,
                                text: "おはよう。。。",
                                question: false,
                                // answ: null,
                                nextNode: 1,
                            },
                            {
                                scriptNode: 1,
                                text: "おげんきですか。",
                                question: false,
                                nextNode: 2,
                                requiresInput: true,
                                correctAnsw: "asdf", // IF CORRECT USE NEXT NODE ELSE GO TO INDEX?
                            },
                            {
                                scriptNode: 2,
                                text: "ようかったです。",
                                question: false,
                                // answ: null,
                                nextNode: -2,
                                nextCheckpoint: 1,
                            },
                        ]
                    },
                    {
                        localCheckpoint: 1,
                        scripts: [
                            {
                                node: 0,
                                text: "ようかったです。",
                                question: false,
                                answ: null,
                                nextNode: 1,
                            },
                        ]
                    }
                ]

            },
            {
                globalCheckpoint: 3,
                scripts: [
                    {
                        localCheckpoint: 0,
                        scripts: [
                            {
                                scriptNode: -2, // THIS IS FOR END OF CONVERSATION
                            },
                            {
                                scriptNode: -1, // THIS IS FOR ERROR MESSAGES
                                text: "えっ。。。",
                                nextNode: -2,
                            },
                            {
                                scriptNode: 0,
                                text: "new checkpoint。。。",
                                question: false,
                                // answ: null,
                                nextNode: 1,
                            },
                        ]
                    },
                ]

            }
        ]
    },
    {
        id: 2,
        name: "たなか",
        // position: [-4, 2, 1],
        // rotation: [0, Math.PI / 4, 0],
        model: "./models/npc-b.glb",
        type: "kinematicPosition",
        scripts: [
            {
                globalCheckpoint: 0,
                globalCheckpointScripts: [

                ]
                // checkpoint: 0,
                // checkpointScripts: [
                //     {
                //         node: -2,
                //     },
                //     {
                //         node: 0,
                //         text: "ううん。。。",
                //         question: false,
                //         answ: null,
                //         nextNode: -2,
                //     },
                // ],
            }
        ]
    }
]