import React from 'react'
import "./loader.scss"
const Loader = () => {
    return (
        <div className="container__loader-absolute">
            <div className="lds-ring" ><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader