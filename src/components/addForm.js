import React from 'react'

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
                    <option value = "extra rare">extra rare</option>
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

export default AddForm