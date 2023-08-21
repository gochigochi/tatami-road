import { create } from 'zustand'

export const useGameProgress = create((set, get) => ({
    // characterPosition: [0, 0, 0],
    characterCurrentPosition: [0, 0, 0],
    currentMap: null,
    lastMap: null,
    gameCheckpoint: 1,
    npcsLocalCheckpoint: [
        // {id: 1, currentCheckpoint: 1}, THIS IS THE STRUCTURE - IS DYNAMIC CREATION
    ],
    createNpcInStore: (npcId) => {
        // When new Npc, create it to keep track of its currentNode with updateNPcCurrentNode
        // const npcsCurrentNodesCopy = get().npcsCurrentNodes
        // set()

        set(state => ({ ...state, npcsLocalCheckpoint: [...state.npcsLocalCheckpoint, { id: npcId, index: 0}]}))

    },
    updateGameCheckpoint: (checkpoint) => {
        set(state => ({ ...state, gameCheckpoint: checkpoint}))
    },
    // updateNpcLocalCheckpoint: (npcId, newCheckpoint)
    // updateNpcScriptIndex: (npcId, newNode) => {
    //     // For example, when a checkpoint is achieved, then update current node?
    //     const npc = get().npcsScriptsIndex.find(npc => npcId === npc.id)

    //     // set({npc.currentNode: newNode})
    // },
    updateGlobalCheckpoint: (newCheckpoint) => {
        set({ currentGlobalCheckpoint: newCheckpoint })
    }
}))