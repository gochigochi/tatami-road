import { create } from 'zustand'

export const useGameState = create((set, get) =>({
    gameState: "PLAY",
    updateGameState: (newState) => set({ gameState: newState })
}))

/*
    Possible States:
    SPLASH_SCREEN
    START_MENU
    GAME_MENU
    PLAY
    NPC_CONVERSATION
    OBJECT_INTERACTION
*/