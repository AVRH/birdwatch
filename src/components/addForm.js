import React from 'react'
import PropTypes from 'prop-types'

const AddForm = ({speciesValue, speciesChange, rarityChange, noteValue, noteChange, submit}) => {
    return(
        <div>
            <form onSubmit={submit}>
                Species: <input
                value={speciesValue}
                onChange={speciesChange}
                    />
                Rarity: <select name = "rarity" onChange={rarityChange}>
                    <option value = "common">common</option>
                    <option value = "rare">rare</option>
                    <option value = "xtra rare">extra rare</option>
                </select>
                notes: <textarea
                    value={noteValue}
                    onChange={noteChange}
                ></textarea>
                <button type = "submit">Add</button>
            </form>
        </div>
    )
}

AddForm.propTypes = {
    speciesValue: PropTypes.string.isRequired,
    speciesChange: PropTypes.func.isRequired,
    rarityChange: PropTypes.func.isRequired,
    noteValue: PropTypes.string.isRequired,
    noteChange: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
}

export default AddForm