import React, { ChangeEvent, useState } from 'react'
import Slider from 'rc-slider'
import "../../../scss/components/categories.scss"
import 'rc-slider/assets/index.css';
import Item from './CategoriesItem/CategoriesItem';


type PropsType = {
    // minPrice: number
    // maxPrice: number
    // stock: string[]
    // brands: string[]
    // properties: string[]
    // manufacturers: string[]
}

const Categories: React.FC<PropsType> = ({ }) => {

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000)

    const stock = ['Все', 'Ценовая', 'Скидочная', 'Подарочная']
    const brands = ['Red Bull', 'Yeti', 'Gorilla', 'Monster']
    const properties = ['0.5л', '1л', '1.5л', '2л', '2,5л', '3л']
    const manufacturers = ['Омаркет']



    const [stockValue, setStockValue] = useState([] as string[])
    const [propertiesValue, setPropertiesValue] = useState([] as string[])
    const [brandsValue, setBrandsValue] = useState([] as string[])
    const [manufacturersValue, setManufacturersValue] = useState([] as string[])

    const [showPrice, setShowPrice] = useState(true)
    const [showStock, setShowStock] = useState(true)
    const [showProperties, setShowProperties] = useState(true)
    const [showBrands, setShowBrands] = useState(true)
    const [showManufacturers, setShowManufacturers] = useState(true)

    const handleRangeChange = (value: any) => {
        setMinPrice(value[0])
        setMaxPrice(value[1])
    }

    const addOrRemove = (
        e: ChangeEvent<HTMLInputElement>,
        state: string[],
        setState: (state: string[]) => void
    ) => {
        const checked = e.target.checked
        const event = e.currentTarget.id

        if (checked) setState([...state, event])
        else if (!checked) setState([...state.filter(v => v !== event)])
    }

    const handleStockChange = (e: ChangeEvent<HTMLInputElement>) => {
        addOrRemove(e, stockValue, setStockValue)
    }
    const handlePropertiesChange = (e: ChangeEvent<HTMLInputElement>) => {
        addOrRemove(e, propertiesValue, setPropertiesValue)
    }
    const handleBrandsChange = (e: ChangeEvent<HTMLInputElement>) => {
        addOrRemove(e, brandsValue, setBrandsValue)
    }
    const handleManufacturersChange = (e: ChangeEvent<HTMLInputElement>) => {
        addOrRemove(e, manufacturersValue, setManufacturersValue)
    }

    const handleReset = () => {
        setMinPrice(0)
        setMaxPrice(1000)
        setStockValue([])
        setPropertiesValue([])
        setBrandsValue([])
        setManufacturersValue([])
    }

    const handleSubmit = () => {
        console.log(minPrice);
        console.log(maxPrice);
        console.log(stockValue);
        console.log(propertiesValue);
        console.log(brandsValue);
        console.log(manufacturersValue);
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
                            <Slider
                                min={0}
                                max={15045}
                                range
                                value={[minPrice, maxPrice]}
                                onChange={handleRangeChange}
                                trackStyle={{ backgroundColor: 'green' }}
                                handleStyle={{ backgroundColor: '#fff' }}
                            />
                        </div>
                    </div>
                }
            </div>
            <Item
                title='Акции'
                arrayItem={stock}
                state={showStock}
                setState={setShowStock}
                handleChange={handleStockChange} />
            <Item
                title='Свойства'
                arrayItem={properties}
                state={showProperties}
                setState={setShowProperties}
                handleChange={handlePropertiesChange} />
            <Item
                title='Бренды'
                arrayItem={brands}
                state={showBrands}
                setState={setShowBrands}
                handleChange={handleBrandsChange} />
            <Item
                title='Производители'
                arrayItem={manufacturers}
                state={showManufacturers}
                setState={setShowManufacturers}
                handleChange={handleManufacturersChange}
            />
            <div>
                <button
                    type="button"
                    className={`cart__inner-notEmpty-makeOrder-promoCode-enter-button`}
                    onClick={handleReset}

                >
                    Сбросить
                </button>
                <button
                    onClick={handleSubmit}
                    type="button"
                    className={`cart__inner-notEmpty-makeOrder-submitOrder`}
                >
                    Применить
                </button>
            </div>
        </div>
    )
}

export default Categories