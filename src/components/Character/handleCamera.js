import * as THREE from 'three'

export const handleCamera = (state, character) => {
    // CAMERA FOLLOW
    const characterWorldPosition = character.current.getWorldPosition(new THREE.Vector3)

    state.camera.position.x = characterWorldPosition.x
    state.camera.position.z = characterWorldPosition.z + 10
    state.camera.position.y = characterWorldPosition.y + 8

    const targetLookAt = new THREE.Vector3(characterWorldPosition.x, 0, characterWorldPosition.z)
    state.camera.lookAt(targetLookAt)
}