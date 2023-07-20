import { Html } from '@react-three/drei'
import "./styles.css"

const Notification = (props) => {
  return (
        <Html
          as="div"
          wrapperClass="cta-container"
          position={[0, .8, 0]}
        >
          <div className="cta">
            {props.name}
          </div>
        </Html>
  )
}

export default Notification