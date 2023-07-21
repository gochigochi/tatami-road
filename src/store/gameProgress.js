import { create } from 'zustand'

export const useGameProgress = create((set, get) => ({
    globalCheckpoint: 0, //THIS IS THE GLOBAL CHECKPOINT
    characterPosition: [0, 0, 0],
    npcsLocalCheckpointIndex: [
        // {id: 1, currentNode: 1}, THIS IS THE STRUCTURE - IS DYNAMIC CREATION
    ],
    createNpcInStore: (npcId) => {
        // When new Npc, create it to keep track of its currentNode with updateNPcCurrentNode
        // const npcsCurrentNodesCopy = get().npcsCurrentNodes
        // set()

        set(state => ({ ...state, npcsLocalCheckpointIndex: [...state.npcsLocalCheckpointIndex, { id: npcId, index: 0}]}))

    },
    updateNpcScriptIndex: (npcId, newNode) => {
        // For example, when a checkpoint is achieved, then update current node?
        const npc = get().npcsScriptsIndex.find(npc => npcId === npc.id)

        // set({npc.currentNode: newNode})
    },
}))