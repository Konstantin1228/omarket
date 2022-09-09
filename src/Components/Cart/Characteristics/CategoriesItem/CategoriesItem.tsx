import React, { ChangeEvent, useState } from "react"
import "../../../../scss/components/categories.scss"


type PropsType = {
    title: string,
    arrayItem: string[],
    state: boolean,
    setState: (state: boolean) => void,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Item: React.FC<PropsType> = ({ title, arrayItem, state, setState, handleChange }) => {

    const [showAllArray, setShowAllArray] = useState(false)
    const trmmArray = arrayItem.slice(0, 4)

    const showAll = <div onClick={() => setShowAllArray(prev => !prev)}
        className='characteristics__item__angle' >
        показать все <i className="fa fa-angle-right" aria-hidden="true"></i>
    </div>


    const mapArray = (i: string) => (
        <div key={i} >
            <input onChange={handleChange} type="checkbox" id={i} />
            <label htmlFor={i}>{i}</label>
        </div>
    )

    return (
        <div className='characteristics__item'>
            <h2 onClick={() => setState(!state)}>{title}
                {state
                    ? <i className="fa fa-angle-up" aria-hidden="true" />
                    : <i className="fa fa-angle-down" aria-hidden="true" />
                }
            </h2>
            {
                state && <div>
                    {showAllArray
                        ? arrayItem.map(i => mapArray(i))
                        : trmmArray.map(i => mapArray(i))
                    }
                    {
                        !showAllArray && arrayItem.length > 4 && showAll
                    }
                </div>

            }
        </div>
    )
}

export default Item