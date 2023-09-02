import { Html } from "@react-three/drei"
import { useInterfaceState } from "../../../store/interfaceState"
import "./styles.css"

const InteractionButton = () => {

    const interactionButton = useInterfaceState(state => state.interactionButton)

    return (
        <Html fullscreen>
            {
                interactionButton ?
                <div class="interaction-button">Enter</div> :
                null
            }
        </Html>
    )
}

export default InteractionButton