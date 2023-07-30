import { create } from 'zustand'

export const useGameMap = create((set) => ({
    gameMap: "playground",
    updateGameMap: (nextMap) => set({ gameMap: nextMap })
}))