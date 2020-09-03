import React from 'react'

function Pokedex(props) {
function closePokeDex(){
    console.log("CLOSING")
   
}

    return (
        <div className="modal" onClick={closePokeDex}>
            <div className="pokedex">
                {props.list}
            </div>
        </div>
    )
}

export default Pokedex
