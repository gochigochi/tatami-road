import { create } from 'zustand'

export const useGameProgress = create((set, get) => ({
    // characterPosition: [0, 0, 0], 
    characterCurrentPosition: [0, 0, 0],
    currentMap: null,
    lastMap: null,
    gameCheckpoint: 0,
    updateGameCheckpoint: (checkpoint) => {
        set(state => ({ ...state, gameCheckpoint: checkpoint}))
    },
}))