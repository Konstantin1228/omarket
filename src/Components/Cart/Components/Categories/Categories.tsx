import React, { useState } from 'react'
// import Slider from 'rc-slider'
import "../../../scss/components/categories.scss"
import 'rc-slider/assets/index.css';
import Item from './CategoriesItem';


type PropsType = {
    // minPrice: number
    // maxPrice: number
    // stock: string[]
    // brands: string[]
    // properties: string[]
    // manufacturers: string[]
}


export type ArrayObjType = { value: string, checked: boolean }

const Categories: React.FC<PropsType> = ({ }) => {

    const stocks = ['Все', 'Ценовая', 'Скидочная', 'Подарочная']
    const properties = ['0.5л', '1л', '1.5л', '2л', '2,5л', '3л']
    const brands = ['Red Bull', 'Yeti', 'Gorilla', 'Monster']
    const manufacturers = ['Омаркет']

    const arrayObject = (array: string[]) => array.map(value => ({ value, checked: false }))

    const arrayString = (arrayObj: ArrayObjType[]) => arrayObj.filter(ar => ar.checked === true).map(arrayObj => arrayObj.value)


    const [stocksValue, setStocksValue] = useState(arrayObject(stocks))
    const [propertiesValue, setPropertiesValue] = useState(arrayObject(properties))
    const [brandsValue, setBrandsValue] = useState(arrayObject(brands))
    const [manufacturersValue, setManufacturersValue] = useState(arrayObject(manufacturers))

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000)

    const [showPrice, setShowPrice] = useState(true)
    const [showStock, setShowStock] = useState(true)
    const [showProperties, setShowProperties] = useState(true)
    const [showBrands, setShowBrands] = useState(true)
    const [showManufacturers, setShowManufacturers] = useState(true)

    const handleRangeChange = (value: any) => {
        setMinPrice(value[0])
        setMaxPrice(value[1])
    }


    const handleChange = (
        name: string,
        Obj: ArrayObjType[],
        setObject: (Obj: ArrayObjType[]) => void,
    ) => {
        const newObj = Obj.map(o => o.value === name ?
            { ...o, checked: !o.checked } : o)
        setObject(newObj)
    }

    const handleStocksChange = (name: string) => handleChange(name, stocksValue, setStocksValue)

    const handlePropertiesChange = (name: string) => handleChange(name, propertiesValue, setPropertiesValue)

    const handleBrandsChange = (name: string) => handleChange(name, brandsValue, setBrandsValue)

    const handleManufacturersChange = (name: string) => handleChange(name, manufacturersValue, setManufacturersValue)


    const handleReset = () => {
        setStocksValue(arrayObject(stocks))
        setPropertiesValue(arrayObject(properties))
        setBrandsValue(arrayObject(brands))
        setManufacturersValue(arrayObject(manufacturers))
    }

    const handleSubmit = () => {
        console.log(
            arrayString(stocksValue),
            arrayString(propertiesValue),
            arrayString(brandsValue),
            arrayString(manufacturersValue)
        );
    };


    return (
        <div className='characteristics' >
            <div className='characteristics__price' >
                <h2 onClick={() => setShowPrice(!showPrice)} >Цена
                    {showPrice
                        ? <i className="fa fa-angle-up" aria-hidden="true" />
                        : <i className="fa fa-angle-down" aria-hidden="true" />
                    }
                </h2>
                {
                    showPrice && <div>
                        <div className='characteristics__price__input' >
                            <input value={minPrice !== 0 ? `${minPrice}Ŧ` : minPrice} readOnly />
                            <input value={maxPrice !== 0 ? `${maxPrice}Ŧ` : maxPrice} readOnly />
                        </div>
                        <div className='characteristics__price__slider'>
                            {/* <Slider
                                min={0}
                                max={15045}
                                range
                                value={[minPrice, maxPrice]}
                                onChange={handleRangeChange}
                                trackStyle={{ backgroundColor: 'green' }}
                                handleStyle={{ backgroundColor: '#fff' }}
                            /> */}
                        </div>
                    </div>
                }
            </div>

            <Item
                title='Акции'
                arrayItem={stocksValue}
                showState={showStock}
                setShowState={setShowStock}
                handleChange={(value) => handleStocksChange(value)}
            />
            <Item
                title='Свойства'
                arrayItem={propertiesValue}
                showState={showProperties}
                setShowState={setShowProperties}
                handleChange={(value) => handlePropertiesChange(value)}
            />
            <Item
                title='Бренды'
                arrayItem={brandsValue}
                showState={showBrands}
                setShowState={setShowBrands}
                handleChange={(value) => handleBrandsChange(value)}
            />
            <Item
                title='Производители'
                arrayItem={manufacturersValue}
                showState={showManufacturers}
                setShowState={setShowManufacturers}
                handleChange={(value) => handleManufacturersChange(value)}
            />

            <div>
                <button
                    type="button"
                    onClick={handleReset}
                    className={`cart__inner-notEmpty-makeOrder-promoCode-enter-button`}
                >
                    Сбросить
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className={`button-submit`}
                >
                    Применить
                </button>
            </div>
        </div>
    )
}

export default Categories