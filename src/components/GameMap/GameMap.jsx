import { useEffect, useState, useRef } from 'react'
import { useGameMap } from "../../store/gameMap"
import { MapsScenes, mapsData } from '../../maps/maps'
import NpcController from '../Npc/NpcController'
import CharacterController from '../Character/CharacterController'


const GameMap = () => {

    const gameMap = useGameMap(state => state.gameMap)
    const [currentMap, setCurrentMap] = useState()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {

        setLoaded(false) // CHECK IF THIS IS NECCESARY WHEN CHANGIN MAPS

        setCurrentMap(mapsData[gameMap])

        setTimeout(() => setLoaded(true), 500)

    }, [gameMap])

    // console.log(currentMap)

    if (loaded) {

        const Map = MapsScenes[currentMap.map]

        return (
            <>
                <Map />
                {
                    currentMap.npcs.map(npc => {
                        return (
                            <NpcController
                                key={npc.model}
                                position={npc.position}
                                rotation={npc?.rotation}
                                model={npc.model}
                                name={npc.name}
                                id={npc.id}
                                scripts={npc.scripts}
                            />
                        )
                    })
                }
                <CharacterController />
            </>
        )
    }

    return (
        // RETURN LOADING SCENE
        <>{console.log('loading')}</>
    )
}

export default GameMap