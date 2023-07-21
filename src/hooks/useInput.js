import { useState, useEffect, useRef } from 'react'

export const useInput = () => {
    const [input, setInput] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        interact: false,
        cancel: false,
        openMenu: false,
        openKanjiBook: false,
        openGrammarBook: false,
        openInventary: false,
    })
    
    const keys = {
        ArrowUp: "forward",
        ArrowDown: "backward",
        ArrowLeft: "left",
        ArrowRight: "right",
        Space: "interact",
        KeyM: "openMenu",
    }

    const findKey = (key) => keys[key]

    useEffect(() => {

        const handleKeyDown = (e) => {

            // Prevent setting the input to true while the key is down, but only the first time
            if(e.repeat) return

            setInput((inputState) => ({...inputState, [findKey(e.code)]: true}))
        }

        const handleKeyUp = (e) => {

            if (e.code === "ArrowUp" || e.code === "ArrowDown" || e.code === "ArrowLeft" || e.code === "ArrowRight") {

            } else {

            }

            setInput((inputState) => ({...inputState, [findKey(e.code)]: false}))
        }

        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("keyup", handleKeyUp)
        }

    }, [])


    return { input, setInput }
}