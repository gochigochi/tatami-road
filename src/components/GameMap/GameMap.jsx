import { useEffect, useState, useRef } from 'react'
import { useGameMap } from "../../store/gameMap"
import { useGameProgress } from '../../store/gameProgress'
import { MapsScenes, mapsData } from '../../maps/maps'
import NpcController from '../Npc/NpcController'
import CharacterController from '../Character/CharacterController'

const GameMap = () => {

    const gameMap = useGameMap(state => state.gameMap)
    const gameCheckpoint = useGameProgress(state => state.gameCheckpoint)
    const [currentMapData, setCurrentMapData] = useState()
    const [loaded, setLoaded] = useState(false)

    // const currentGlobalCheckpoint = 7

    // THIS WILL RUN ONLY WHEN MAP CHANGES. SO IF GLOBALCHECKPOINT CHANGES
    // ALL DATA WONT BE UPDATED!!!!! IF PLAYER CHANGES MAPS AND COMES BACK
    // TO SAME MAP IT WILL BE UPDATED!!!!!
    useEffect(() => {

        setLoaded(false) // CHECK IF THIS IS NECCESARY WHEN CHANGIN MAPS

        const map = mapsData[gameMap].mapComponent
        const npcs = mapsData[gameMap].npcs
        // GET CURRENT MAP EVENTS ACCORDING TO GLOBAL CHECKPOINT
        // const events = mapsData[gameMap].npcs
        // .findLast(ev => ev.globalCheckpoint <= gameCheckpoint)

        // GET NPC

        setCurrentMapData({
            map: map,
            npcs: npcs,
        })

        setTimeout(() => setLoaded(true), 500)

    }, [gameMap])

    // console.log(currentMapData)
    // console.log(currentGlobalCheckpoint)

    if (loaded) {

        const Map = MapsScenes[currentMapData.map]

        return (
            <>
                <Map />
                {
                    currentMapData.npcs.map(npc => {
                        // console.log(npc)
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