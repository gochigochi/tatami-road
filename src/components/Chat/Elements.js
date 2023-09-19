import styled from "styled-components"
import { motion } from "framer-motion"

export const Bubble = styled(motion.p)`
    position: relative;
    padding: .5rem 1.5rem;
    max-width: 25rem;
    background-color: #ffffff;
    border-radius: 20px;
    font-size: 1rem;
    transform-origin: bottom left;

    &:before {
        content: "";
        display: block;
        width: 0;
        position: absolute;
        bottom: -20px;
        left: 12px;
        border-style: solid;
        border-width: 15px;
        /* border-width: 10px; */
        border-color: #fff transparent transparent #fff;
        transform: rotate(10deg);
    }
`

export const InputFieldContainer = styled(motion.div)`
    border-radius: 20px;
    background-color: #ffffff;
    padding: .5rem 1.5rem;
    max-width: 25rem;

    &:before {
        content: "";
        display: block;
        width: 0;
        position: absolute;
        bottom: -20px;
        left: 12px;
        border-style: solid;
        border-width: 15px;
        border-color: #fff transparent transparent #fff;
        transform: rotate(10deg);
    }
`

export const InputField = styled(motion.input)`
    position: relative;
    border: none;
    border-bottom: 1px dashed black;
    line-height: 1.5;
    font-size: 1rem;

    &:focus {
        outline: none;
    }
`

export const DraggablesBox = styled(motion.div)`
    position: relative;
    padding: .5rem 1.5rem;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    font-size: 1rem;

    &:before {
        content: "";
        display: block;
        width: 0;
        position: absolute;
        bottom: -20px;
        left: 12px;
        border-style: solid;
        border-width: 13px;
        border-color: #fff transparent transparent #fff;
        transform: rotate(10deg);
    }
`

export const Draggable = styled(motion.div)`
    padding: .5rem;
    border: 1px solid #474747;
    border-radius: 9px;
    cursor: grab;
    margin-left: .5rem;

    &:first-child {
        margin-left: 0;
    }
`