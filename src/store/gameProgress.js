import { create } from 'zustand'

export const useGameProgress = create((set, get) => ({
    checkpoint: 0,
    characterPosition: [0, 0, 0],
    npcsScriptsIndex: [
        // {id: 1, currentNode: 1}, THIS IS THE STRUCTURE - IS DYNAMIC CREATION
    ],
    createNpcInStore: (npcId) => {
        // When new Npc, create it to keep track of its currentNode with updateNPcCurrentNode
        // const npcsCurrentNodesCopy = get().npcsCurrentNodes
        // set()

        set(state => ({ ...state, npcsScriptsIndex: [...state.npcsScriptsIndex, { id: npcId, index: 0}]}))

    },
    updateNpcScriptIndex: (npcId, newNode) => {
        // For example, when a checkpoint is achieved, then update current node?
        const npc = get().npcsScriptsIndex.find(npc => npcId === npc.id)

        // set({npc.currentNode: newNode})
    },
}))