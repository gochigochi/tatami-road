import { useState, useEffect } from 'react'

export const useInput = () => {
    const [input, setInput] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        interact: false,
    })

    const keys = {
        ArrowUp: "forward",
        ArrowDown: "backward",
        ArrowLeft: "left",
        ArrowRight: "right",
        Space: "interact",
    }

    const findKey = (key) => keys[key]

    useEffect(() => {

        const handleKeyDown = (e) => {
            setInput((inputState) => ({...inputState, [findKey(e.code)]: true}))
        }

        const handleKeyUp = (e) => {
            setInput((inputState) => ({...inputState, [findKey(e.code)]: false}))
        }

        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("keyup", handleKeyUp)
        }

    }, [])


    return input
}