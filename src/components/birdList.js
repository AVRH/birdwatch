import React from 'react'
import Bird from './bird'
import SortBy from './sortBySelector'
import PropTypes from 'prop-types'

const BirdList = ({birds,sortbyChange}) => {
    return(
        <div>
        <SortBy handleChange={sortbyChange} />
        <div id='birdList'>
            {birds.map(bird => <Bird bird={bird} />)}
        </div>
        </div>

    )
}

BirdList.propTypes = {
    birds: PropTypes.array.isRequired,
    sortbyChange: PropTypes.func.isRequired
}

export default BirdList;