import { create } from "zustand"

export const useChatState = create((set, get) => ({
    playerInputBox: false,
    playerInputValue: "",
    playerDragBox: false,
    playerDraggables: [],
    updatePlayerInputBox: (bool) => set(state => ({ ...state, playerInputBox: bool })),
    updatePlayerInputValue: (value) => set(state => ({ ...state, playerInputValue: value })),
    updatePlayerDragBox: (bool) => set(state => ({ ...state, playerDragBox: bool })),
    updatePlayerDraggables: (arr) => set(state => ({ ...state, playerDraggables: arr})),
}))