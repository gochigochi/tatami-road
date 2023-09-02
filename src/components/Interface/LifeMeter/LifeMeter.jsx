import { Html } from "@react-three/drei"
import { useInterfaceState } from "../../../store/interfaceState"
import { Container, Meter } from "./Elements"

const Test = () => {

    const lifeMeter = useInterfaceState(state => state.lifeMeter)

    // console.log(lifeMeter)

    return (
        <Html fullscreen>
            <Container>
                <Meter width={lifeMeter} />
            </Container>
        </Html>
    )
}

export default Test