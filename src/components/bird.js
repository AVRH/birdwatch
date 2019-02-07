import React from 'react'
import PropTypes from 'prop-types'
import ShowMore from 'react-show-more'

const Bird = ({bird}) => {
//render birds object
//as extra rare is saved as xtra rare for sorting reasons, check if the rarity of the bird is xtra rare, and 
//if it is, render extra rare to screen for easier readability 
//Show More from https://www.npmjs.com/package/react-show-more is used to implement show more and less links for notes
    return(
        <div className="bird">
            <h2>{bird.species}</h2>
            <p id="bTime">{bird.time.date} </p>
            <p id="bTime"> {bird.time.hour}</p>
            <p id="bRarity">
                Rarity:{bird.rarity !== "xtra rare" ? bird.rarity : "extra rare" }
            </p>
            <p>Location: {bird.location.lat}/{bird.location.long}</p> 
            <ShowMore id="notes">{bird.notes}</ShowMore>
            
        </div>
    )
}

Bird.propTypes = {
    bird: PropTypes.object.isRequired
}

export default Bird;