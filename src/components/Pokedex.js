import React from 'react'

function Pokedex(props) {
    return (
        <div className="pokedex">
            {props.list}
        </div>
    )
}

export default Pokedex
