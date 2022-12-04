import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import supabase from '../../config/supabseClient';
import Loader from '../Other/Loader';
import CustomCheckbox from './Components/CustomCheckbox';
import CatalogItem, { itemType } from '../Home/CatalogItem';
import CatalogItemHorizontal from './CatalogItemHorizontal';
import { Close, KeyboardArrowDown } from '@mui/icons-material/';
import { MenuItem, Accordion, AccordionSummary, AccordionDetails, FormGroup, Slider, Select } from '@mui/material/';
import { linkSettings } from '../Other/Header/Header';
import "./catalog.scss"
const Catalog = () => {
    const routeParams = useParams();
    const navigate = useNavigate()
    const location = useLocation()

    const [horizontalProductDisplay, setHorizontalProductDisplay] = useState(true)
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState<itemType[]>()
    const [sortType, setSortType] = useState("title true")
    const [priceValue, setPriceValue] = useState<number>(4000);
    const [inputPriceValue, setInputPriceValue] = useState(4000)
    const [weightQuery, setWeightQuery] = useState<number[]>([])
    const [tags, setTags] = useState<string[]>([])
    const [brand, setBrand] = useState<string[]>([])
    const [filterTag, setFilterTag] = useState(linkSettings.find(el => el.path === routeParams.sortTag))

    const changePrice = (event: Event, newValue: number | number[]) => {
        setInputPriceValue(newValue as number)
        setPriceValue(newValue as number);
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.currentTarget.value
        const numberInput = Number(inputValue)
        if (inputValue.charAt(0) === "0") {
            setInputPriceValue(0)
            setPriceValue(0)
        } else {
            if (numberInput > 10000) {
                setInputPriceValue(10000)
                setPriceValue(10000)
                return
            }
            setPriceValue(numberInput)
            setInputPriceValue(numberInput)
        }
    }

    const deleteFilterTag = () => {
        navigate("/catalog/all")
        setFilterTag(undefined)
        setLoading(true)
    }

    const resetFilter = () => {
        setPriceValue(4000)
        setInputPriceValue(4000)
        setWeightQuery([])
        setTags([])
        setBrand([])
        setLoading(true)
    }

    const sortTag = location.pathname.split("/")[2]
    const fetchData = async () => {
        const order = sortType.split(" ")
        let { data, error } = await supabase.from('goods').select().contains("tags", sortTag === "all" ? [...tags,] : [...tags, sortTag])
            .contains("weight", weightQuery).order(order[0], { ascending: order[1] === "true" ? true : false })
        let Data = data?.filter(el => Math.max(...el?.price) <= priceValue)
        if (brand.length) Data = Data?.filter(el => brand.find(brand => el?.title?.toLowerCase().includes(brand.toLowerCase())))
        setItems(Data)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        setFilterTag(linkSettings.find(el => el.path === routeParams.sortTag))
        if (!linkSettings.find(el => el.path === sortTag)?.path && location.pathname !== '/catalog/all') {
            navigate("/home")
            return
        }
        resetFilter()
    }, [location.pathname])


    useEffect(() => {
        fetchData()
    }, [loading])
    
    
    return (
        <div className="catalog">
            <div className="cart__path">
                <ul>
                    <li className={`cart__path-text-gray`} >Главная</li>
                    <div className={`cart__path-${filterTag?.text ? "gray" : "black"}`}>{">"}</div>
                    <Link to={"/catalog/all"} className={`cart__path-text-${filterTag?.text ? "gray" : "black"}`} onClick={() => setLoading(true)}>Категории товара</Link>
                    {(location.pathname !== '/catalog/all' && filterTag?.text) &&
                        <>
                            <div className="cart__path-black">{">"}</div>
                            <li className={`cart__path-text-black`}>{filterTag.text}</li>
                        </>
                    }
                </ul>
            </div>
            <h1 className="catalog__category">{sortTag === "all" ? "Категории товаров" : filterTag?.text}</h1>
            <div className="catalog__bottom">
                <div className="catalog__bottom-filters">
                    {filterTag?.text &&
                        <>
                            <span className='catalog__bottom-filters-selectedSpan'>Выбрано</span>
                            <div className="catalog__bottom-filters-currentTag">
                                <span>{filterTag.text}</span>
                                <button onClick={deleteFilterTag}>
                                    <Close sx={{ color: "white" }} fontSize="small" />
                                </button>
                            </div>
                        </>
                    }
                    <div className="catalog__bottom-filters-accardion">
                        <Accordion>
                            <AccordionSummary expandIcon={<KeyboardArrowDown fontSize='small' />}><span className="bold">Цена</span></AccordionSummary>
                            <AccordionDetails>
                                <>
                                    <div className="catalog__bottom-filters-parentAccardion">
                                        <input className='counter' placeholder={`0₽`} disabled />
                                        <span className='dash'>-</span>
                                        {/* value={inputPriceValue} */}
                                        <input className='counter' value={inputPriceValue} onChange={(e) => handleInput(e)} />
                                    </div>
                                    <Slider
                                        sx={{
                                            color: "#00953F",
                                            '& .MuiSlider-thumb': {
                                                width: "1.1rem",
                                                height: "1.1rem",
                                                backgroundColor: "white",
                                                border: "3px solid #00953F",
                                            },
                                            '& .MuiSlider-valueLabel': {
                                                display: "none",
                                            },
                                        }}
                                        max={10000}
                                        value={priceValue}
                                        defaultValue={0}
                                        onChange={changePrice}
                                        valueLabelDisplay="auto"
                                    />
                                </>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<KeyboardArrowDown fontSize='small' />}><span className="bold">Акции</span></AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    <CustomCheckbox state={tags} updateState={setTags} label='Новинка' inArray='Новинка' />
                                    <CustomCheckbox state={tags} updateState={setTags} label='Хит' inArray='Хит' />
                                    <CustomCheckbox state={tags} updateState={setTags} label='Скидочная' inArray='discount' />
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<KeyboardArrowDown fontSize='small' />}><span className="bold">Свойства</span></AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    {(filterTag?.path === "drink" || filterTag?.path === "milkProducts") ?
                                        <>
                                            <CustomCheckbox updateState={setWeightQuery} state={weightQuery} label='100мл.' inArray='0.1' />
                                            <CustomCheckbox updateState={setWeightQuery} state={weightQuery} label='500мл.' inArray='0.5' />
                                            <CustomCheckbox updateState={setWeightQuery} state={weightQuery} label='700мл.' inArray='0.7' />
                                            <CustomCheckbox updateState={setWeightQuery} state={weightQuery} label='1л.' inArray='1' />
                                            <CustomCheckbox updateState={setWeightQuery} state={weightQuery} label='2л.' inArray='2' />
                                        </>
                                        :
                                        <>
                                            <CustomCheckbox updateState={setWeightQuery} state={weightQuery} label='100гр.' inArray='0.1' />
                                            <CustomCheckbox updateState={setWeightQuery} state={weightQuery} label='300гр.' inArray='0.3' />
                                            <CustomCheckbox updateState={setWeightQuery} state={weightQuery} label='500гр.' inArray='0.5' />
                                            <CustomCheckbox updateState={setWeightQuery} state={weightQuery} label='700гр.' inArray='0.7' />
                                            <CustomCheckbox updateState={setWeightQuery} state={weightQuery} label='1кг.' inArray='1' />
                                            <CustomCheckbox updateState={setWeightQuery} state={weightQuery} label='1.5кг.' inArray='1.5' />
                                            <CustomCheckbox updateState={setWeightQuery} state={weightQuery} label='2кг.' inArray='2' />
                                        </>
                                    }
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                        {filterTag?.path &&
                            <Accordion>
                                <AccordionSummary expandIcon={<KeyboardArrowDown fontSize='small' />}><span className="bold">Бренды</span></AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        {filterTag?.path === "drink" &&
                                            <>
                                                <CustomCheckbox updateState={setBrand} state={brand} label="Red Bull" inArray='Red' />
                                                <CustomCheckbox updateState={setBrand} state={brand} label='Yeti' inArray='Yeti' />
                                                <CustomCheckbox updateState={setBrand} state={brand} label='Gorilla' inArray='Gorilla' />
                                                <CustomCheckbox updateState={setBrand} state={brand} label='Monster' inArray='Monster' />
                                                <CustomCheckbox updateState={setBrand} state={brand} label='Сады придонья' inArray='Сады придонья' />
                                                <CustomCheckbox updateState={setBrand} state={brand} label='Lanson Black Label' inArray='Lanson Black Label' />
                                            </>
                                        }
                                        {filterTag?.path === "grocery" &&
                                            <>
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label="Red Bull" inArray='Red' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Yeti' inArray='Yeti' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Gorilla' inArray='Gorilla' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Monster' inArray='Monster' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Сады придонья' inArray='Сады придонья' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Lanson Black Label' inArray='Lanson Black Label' /> */}
                                            </>
                                        }
                                        {filterTag?.path === "milkProducts" &&
                                            <>
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label="Red Bull" inArray='Red' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Yeti' inArray='Yeti' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Gorilla' inArray='Gorilla' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Monster' inArray='Monster' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Сады придонья' inArray='Сады придонья' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Lanson Black Label' inArray='Lanson Black Label' /> */}
                                            </>
                                        }

                                        {filterTag?.path === "frozen" &&
                                            <>
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label="Red Bull" inArray='Red' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Yeti' inArray='Yeti' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Gorilla' inArray='Gorilla' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Monster' inArray='Monster' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Сады придонья' inArray='Сады придонья' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Lanson Black Label' inArray='Lanson Black Label' /> */}
                                            </>
                                        }
                                        {filterTag?.path === "natural" &&
                                            <>
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label="Red Bull" inArray='Red' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Yeti' inArray='Yeti' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Gorilla' inArray='Gorilla' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Monster' inArray='Monster' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Сады придонья' inArray='Сады придонья' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Lanson Black Label' inArray='Lanson Black Label' /> */}
                                            </>
                                        }
                                        {filterTag?.path === "home" &&
                                            <>
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label="Red Bull" inArray='Red' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Yeti' inArray='Yeti' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Gorilla' inArray='Gorilla' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Monster' inArray='Monster' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Сады придонья' inArray='Сады придонья' /> */}
                                                {/* <CustomCheckbox updateState={setBrand} state={brand} label='Lanson Black Label' inArray='Lanson Black Label' /> */}
                                            </>
                                        }
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                        }
                        <div className="catalog__bottom-filters-accardion-buttons">
                            <button className="catalog__bottom-filters-accardion-buttons-reset" onClick={resetFilter}>Сбросить</button>
                            <button className="button-submit" onClick={() => setLoading(true)}>Применить</button>
                        </div>
                    </div>
                </div>
                {loading ? <Loader /> :
                    <div className="catalog__bottom-items">
                        <div className="catalog__bottom-items-top">
                            <span className="catalog__bottom-items-top-totalItems">Всего {items?.length} продуктов</span>
                            <div className="catalog__bottom-items-top-right">
                                <div className="catalog__bottom-items-top-right-displayType">
                                    <button className={!horizontalProductDisplay ? 'active' : ""} onClick={() => setHorizontalProductDisplay(false)}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="4" height="7" rx="1" fill="#9C9C9C" />
                                            <rect y="9" width="4" height="7" rx="1" fill="#9C9C9C" />
                                            <rect x="6" width="4" height="7" rx="1" fill="#9C9C9C" />
                                            <rect x="6" y="9" width="4" height="7" rx="1" fill="#9C9C9C" />
                                            <rect x="12" width="4" height="7" rx="1" fill="#9C9C9C" />
                                            <rect x="12" y="9" width="4" height="7" rx="1" fill="#9C9C9C" />
                                        </svg>
                                    </button>
                                    <button className={horizontalProductDisplay ? 'active' : ""} onClick={() => setHorizontalProductDisplay(true)}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="4" width="4" height="4" rx="1" transform="rotate(90 4 0)" fill="#9C9C9C" />
                                            <rect x="4" y="6" width="4" height="4" rx="1" transform="rotate(90 4 6)" fill="#9C9C9C" />
                                            <rect x="4" y="12" width="4" height="4" rx="1" transform="rotate(90 4 12)" fill="#9C9C9C" />
                                            <rect x="16" width="4" height="10" rx="1" transform="rotate(90 16 0)" fill="#9C9C9C" />
                                            <rect x="16" y="6" width="4" height="10" rx="1" transform="rotate(90 16 6)" fill="#9C9C9C" />
                                            <rect x="16" y="12" width="4" height="10" rx="1" transform="rotate(90 16 12)" fill="#9C9C9C" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="catalog__bottom-items-top-right-filterType">
                                    <span className="catalog__bottom-items-top-right-filterType-text">Сортировать:</span>
                                    <Select
                                        value={sortType}
                                        onChange={(e) => {
                                            setLoading(true)
                                            setSortType(e.target.value)
                                        }}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                padding: 0
                                            },
                                            ".MuiOutlinedInput-notchedOutline": {
                                                border: "none"
                                            }
                                        }}
                                    >
                                        <MenuItem value={"rating true"}>По популярности</MenuItem>
                                        <MenuItem value={"title true"}>По названия A-Я</MenuItem>
                                        <MenuItem value={"title false"}>По названия Я-А</MenuItem>
                                        <MenuItem value={"price false"}>Сначало дороже</MenuItem>
                                        <MenuItem value={"price true"}>Сначало дешевле</MenuItem>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className={`catalog__bottom-items-bottom-${horizontalProductDisplay ? "block" : "grid"}`}>
                            {items?.length !== 0 ?
                                items?.map((el, idx) => horizontalProductDisplay ? <CatalogItemHorizontal key={idx} {...el} /> : <CatalogItem key={idx} {...el} />)
                                :
                                <span className="catalog__bottom-items-top-totalItems">Нет продуктов по выбранным параметрам</span>
                            }
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default Catalog