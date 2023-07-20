const MOVEMENT_SPEED = .2
const LINVEL = 1.5

export const handleCharacterMovement = (
    input,
    rigidBody,
    rotation,
    character,
) => {

    const impulse = { x: 0, y: 0, z: 0 }
    let changeRotation = false

    if (input.forward && input.right && !input.backward && !input.left) {
        // DIAG UP RIGHT
        impulse.z -= MOVEMENT_SPEED
        impulse.x += MOVEMENT_SPEED
        rigidBody.current?.setLinvel({ x: LINVEL, y: 0, z: -LINVEL })
        changeRotation = true
        rotation.current = Math.PI / 4 + Math.PI / 2
    } else if (input.forward && input.left && !input.backward && !input.right) {
        // DIAG UP LEFT
        impulse.z -= MOVEMENT_SPEED
        impulse.x -= MOVEMENT_SPEED
        rigidBody.current?.setLinvel({ x: -LINVEL, y: 0, z: -LINVEL })
        changeRotation = true
        rotation.current = -Math.PI / 4 - Math.PI / 2
    } else if (input.forward && !input.left && !input.backward && !input.right) {
        // UP
        impulse.z -= MOVEMENT_SPEED
        rigidBody.current?.setLinvel({ x: 0, y: 0, z: -LINVEL })
        changeRotation = true
        rotation.current = Math.PI
    } else if (input.backward && input.right && !input.forward && !input.left) {
        //DIAG BACK RIGHT
        impulse.z += MOVEMENT_SPEED
        impulse.x += MOVEMENT_SPEED
        rigidBody.current?.setLinvel({ x: LINVEL, y: 0, z: LINVEL })
        changeRotation = true
        rotation.current = Math.PI / 4
    } else if (input.backward && input.left && !input.forward && !input.right) {
        //DIAG BACK LEFT
        impulse.z += MOVEMENT_SPEED
        impulse.x -= MOVEMENT_SPEED
        rigidBody.current?.setLinvel({ x: -LINVEL, y: 0, z: LINVEL })
        changeRotation = true
        rotation.current = -Math.PI / 4
    } else if (input.backward && !input.left && !input.forward && !input.right) {
        //BACKWARD
        impulse.z += MOVEMENT_SPEED
        rigidBody.current?.setLinvel({ x: 0, y: 0, z: LINVEL })
        changeRotation = true
        rotation.current = 0
    } else if (input.left && !input.forward && !input.backward && !input.right) {
        // LEFT
        impulse.x -= MOVEMENT_SPEED
        rigidBody.current?.setLinvel({ x: -LINVEL, y: 0, z: 0 })
        changeRotation = true
        rotation.current = -Math.PI / 2
    } else if (input.right && !input.forward && !input.backward && !input.left) {
        //RIGHT
        impulse.x += MOVEMENT_SPEED
        rigidBody.current?.setLinvel({ x: LINVEL, y: 0, z: 0 })
        changeRotation = true
        rotation.current = Math.PI / 2
    }

    rigidBody.current?.applyImpulse(impulse, true)

    if (changeRotation) character.current.rotation.y = rotation.current
}