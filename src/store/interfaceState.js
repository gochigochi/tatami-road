import { create } from "zustand"

export const useInterfaceState = create((set, get) => ({
    interactionButton: false,
    lifeMeter: "100",
    updateLifeMeter: (amount, action) => {

        let newAmount

        if (action === "dec") newAmount = get().lifeMeter - amount

        if (action === "inc") newAmount = get().lifeMeter + amount

        set({ lifeMeter: newAmount })

    },
    updateInteractionButton: (bool) => set({ interactionButton: bool })
}))