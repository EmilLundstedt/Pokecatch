import React from 'react'

function Pokedex(props) {


    return (
        <div className="modal">
            <div className="pokedex">
                {props.list}
            </div>
        </div>
    )
}

export default Pokedex
