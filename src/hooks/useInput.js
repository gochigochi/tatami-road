import { useState, useEffect, useRef } from 'react'

export const useInput = () => {
    const [input, setInput] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        cancel: false,
        openMenu: false,
        openKanjiBook: false,
        openGrammarBook: false,
        openInventary: false,
    })

    const interactionInput = useRef({
        interact: false,
    })

    const keys = {
        ArrowUp: "forward",
        ArrowDown: "backward",
        ArrowLeft: "left",
        ArrowRight: "right",
        KeyM: "openMenu",
    }

    const findKey = (key) => keys[key]

    useEffect(() => {

        const handleKeyDown = (e) => {

            // Prevent setting the input to true while the key is down, but only the first time
            if (e.repeat) return

            if (
                e.code === "ArrowUp" ||
                e.code === "ArrowDown" ||
                e.code === "ArrowLeft" ||
                e.code === "ArrowRight" ||
                e.code === "KeyM"
            ) {

                setInput((inputState) => ({ ...inputState, [findKey(e.code)]: true }))
            } 

            if (e.code === "Enter") {
                interactionInput.current.interact = true
            }

        }

        const handleKeyUp = (e) => {

            if (
                e.code === "ArrowUp" ||
                e.code === "ArrowDown" ||
                e.code === "ArrowLeft" ||
                e.code === "ArrowRight" ||
                e.code === "KeyM"
            ) {

                setInput((inputState) => ({ ...inputState, [findKey(e.code)]: false }))
            } 

            if (e.code === "Enter") {
                interactionInput.current.interact = false
            }

        }

        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("keyup", handleKeyUp)
        }

    }, [])

    return { input, setInput, interactionInput }
}