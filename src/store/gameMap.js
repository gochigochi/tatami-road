import { create } from 'zustand'

export const useGameMap = create((set) => ({
    gameMap: "testMap", //"playground",
    updateGameMap: (nextMap) => set({ gameMap: nextMap })
}))