import styled from "styled-components"
import { motion } from "framer-motion"

export const Bubble = styled(motion.p)`
    padding: .5rem 1.5rem;
    max-width: 25rem;
    background-color: #ffffff;
    border-radius: 9px;
    font-size: 1rem;
`

export const DraggabalesBox = styled(motion.div)`
    padding: .5rem 1.5rem;
    background-color: #fff;
    border-radius: 12px;
    display: flex;
    font-size: 1rem;
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



// .draggables-box {
    // padding: .5rem 1.5rem;
    // background-color: #fff;
    // border-radius: 12px;
    // display: flex;
    // font-size: 1rem;
// }

// .draggable {
    // padding: .5rem;
    // border: 1px solid #474747;
    // border-radius: 9px;
    // cursor: grab;
    // margin-left: .5rem;

    // &:first-child {
    //     margin-left: 0;
    // }
// }