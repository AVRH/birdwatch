import React from 'react'

const Bird = ({bird}) => {
    return(
        <div className="bird">
            <p id="bTime">{bird.time}</p>
            <h2>{bird.species}</h2>
            <p id="bRarity">{bird.rarity}</p>
            <p id="bNotes">{bird.notes}</p>
        </div>
    )
}

export default Bird;