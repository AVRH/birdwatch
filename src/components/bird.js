import React from 'react'
import ReadMoreReact from 'read-more-react';
import PropTypes from 'prop-types'

const Bird = ({bird}) => {
    //Render one single bird object
    //Due to incremental adding of new features, rendering location contains checks if bird object 
    //contains location or not, as the data saved earlier might not contain the newest features
    
    return(
        <div className="bird">
            <p id="bTime">{bird.time.date} </p>
            <p id="bTime"> {bird.time.hour}</p>
            <h2>{bird.species}</h2>
            <p id="bRarity">
            Rarity:{bird.rarity !== "xtra rare" ? bird.rarity : "extra rare" }
            </p>
            <ReadMoreReact text={bird.notes} />
            {'location' in bird && 'lat' in bird.location ? 
            <p>Location: {bird.location.lat}/{bird.location.long}</p> : 
            <p>no location</p>}
        </div>
    )
}

Bird.propTypes = {
    bird: PropTypes.object.isRequired
}

export default Bird;