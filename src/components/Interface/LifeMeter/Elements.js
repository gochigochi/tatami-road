import styled from "styled-components"

export const Container = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 17rem;
    height: .5rem;
    background-color: rgba( 0, 0, 0, .2);
`

export const Meter = styled.div`
    width: ${({width}) => width}%;
    height: 100%;
    background-color: red;
    transition: width .2s ease-in;
`