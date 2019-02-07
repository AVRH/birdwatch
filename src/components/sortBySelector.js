import React from 'react'
import PropTypes from 'prop-types'

const SortBy = ({handleChange}) => {
    return(
        <div>
        Sort By:<select name='sortBy' onChange={handleChange}>
            <option value='time'>Time</option>
            <option value='rarity'>Rarity</option>
            <option value='species'>Species</option>
        </select>
        </div>
    )
}

SortBy.propTypes = {
    handleChange: PropTypes.func.isRequired
}

export default SortBy