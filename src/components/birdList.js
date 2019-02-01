import React from 'react'
import Bird from './bird'

const BirdList = ({birds}) => {
    return(
        <div id='birdList'>
            {birds.map(bird => <Bird bird={bird} />)}
        </div>

    )
}

export default BirdList;