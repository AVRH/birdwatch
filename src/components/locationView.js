import React from 'react'

const LocationView =  ({locationAllowed}) => {
    return(
        <p>{locationAllowed ? "Cancel" : "Add new"}</p>
    )
}

export default LocationView