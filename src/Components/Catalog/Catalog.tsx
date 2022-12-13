import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import supabase from '../../config/supabseClient';
import Loader from '../Other/Loader';
import CustomCheckbox from './Components/CustomCheckbox';
import CatalogItem, { ItemType } from '../Home/CatalogItem';
import CatalogItemHorizontal from './CatalogItemHorizontal';
import { Close, KeyboardArrowDown } from '@mui/icons-material/';
import { MenuItem, Accordion, AccordionSummary, AccordionDetails, FormGroup, Slider, Select } from '@mui/material/';
import { linkSettings } from '../Other/Header/Header';
import { useForm, useWatch } from "react-hook-form"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import "./catalog.scss"
interface QueryType {
    sortType: string
    priceValue: number
    filterTag: {
        path: string
        text: string
    } | undefined
    tags: string[]
    weightQuery: string[]
    brandsQuery: string[]
}
interface filters {
    properties: string[]
    brands: string[]
}
const Catalog = () => {
    const routeParams = useParams();
    const navigate = useNavigate()
    const location = useLocation()
    const { register, control, trigger, setError, handleSubmit, setValue, watch, reset } = useForm<QueryType>({
        mode: "onChange", defaultValues: {
            sortType: "title true",
            priceValue: 4000,
            filterTag: linkSettings.find(el => el.path === routeParams.sortTag),
            tags: [],
            weightQuery: [],
            brandsQuery: [],
        }
    })

    const [firstLoading, setFirstLoading] = useState(true)
    const [loading, setLoading] = useState(true)
    const [horizontalProductDisplay, setHorizontalProductDisplay] = useState(true)

    const [items, setItems] = useState<ItemType[]>()
    const [queryProperties, setQueryProperties] = useState<filters>({ properties: [], brands: [] })

    const changePrice = (event: Event, newValue: number | number[]) => setValue("priceValue", newValue as number)


    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.currentTarget.value
        const numberInput = Number(inputValue)
        if (numberInput > 10000) {
            setValue("priceValue", Number(inputValue.slice(0, 4)))
            return
        }
        setValue("priceValue", numberInput)
    }

    const deleteFilterTag = () => {
        navigate("/catalog/all")
        // setFilterTag(undefined)
        setValue("filterTag", undefined)
        setLoading(true)
    }

    const resetFilter = () => {
        setLoading(true)
        reset()
    }

    const sortTag = location.pathname.split("/")[2]
    const fetchData = async () => {

        const orderType = watch("sortType").split(" "),
            tags = watch("tags"),
            weightQuery = watch("weightQuery").map(weight => weight.replace(/[\D]+/g, ""))

        // watch("weightQuery").map(weight => console.log( weight.test("/[\D]+/g"))
        const { data, error } = await supabase.from('goods').select().contains("tags", sortTag === "all" ? [...tags,] : [...tags, sortTag])
            .contains("weight", weightQuery).order(orderType[0], { ascending: orderType[1] === "true" })
        // data = data as unknown as ItemType
        if (data) {
            const maxPrice = watch("priceValue")
            const brand = watch("brandsQuery")
            let Data: ItemType[] = data.filter(el => Math.max(...el?.price) <= maxPrice)
            if (brand.length) Data = Data.filter(el => brand.find(brand => el?.title?.toLowerCase().includes(brand.toLowerCase())))
            if (firstLoading) {
                const answerArray: filters = { properties: [], brands: [] }
                data.map((data: any) => {
                    answerArray.properties.push(...data.weight)
                    answerArray.brands.push(data?.title)
                })
                answerArray.properties = Array.from(new Set(answerArray.properties)).sort((a: string, b: string) => (Number(a) - Number(b)))
                    .map((properties, idx) => properties + data[idx].typeOfUnit)
                console.log(answerArray);
                setQueryProperties(answerArray)
                setFirstLoading(false)
            }
            setItems(Data)
            setLoading(false)
        }
        if (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setLoading(true)
        setValue("filterTag", linkSettings.find(el => el.path === routeParams.sortTag))
        if (!linkSettings.find(el => el.path === sortTag)?.path && location.pathname !== '/catalog/all') {
            navigate("/home")
            return
        }
        resetFilter()
        fetchData()
        setFirstLoading(true)
    }, [location.pathname])

    useEffect(() => {
        fetchData()
    }, [loading])

    const fiterTagText = watch("filterTag.text")
    const fiterTagPath = watch("filterTag.path")
    return (
        <div className="catalog">
            <div className="cart__path">
                <ul className='cart__path-ul'>
                    <Link to={"/home"} className={`cart__path-text-gray`} >Главная</Link>
                    <div className={`cart__path-${watch("filterTag.text") ? "gray" : "black"}`}>{">"}</div>
                    <Link to={"/catalog/all"} className={`cart__path-text-${fiterTagText ? "gray" : "black"}`} onClick={() => setLoading(true)}>Категории товара</Link>
                    {(location.pathname !== '/catalog/all' && fiterTagText) &&
                        <>
                            <div className="cart__path-black">{">"}</div>
                            <li className={`cart__path-text-black`}>{fiterTagText}</li>
                        </>
                    }
                </ul>
            </div>
            <h1 className="catalog__category">{sortTag === "all" ? "Категории товаров" : fiterTagText}</h1>
            <div className="catalog__bottom">
                <div className="catalog__bottom-filters">
                    {fiterTagText &&
                        <>
                            <span className='catalog__bottom-filters-selectedSpan'>Выбрано</span>
                            <div className="catalog__bottom-filters-currentTag">
                                <span>{fiterTagText}</span>
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
                                <div className="catalog__bottom-filters-parentAccardion">
                                    <input className='counter' placeholder={`0₽`} disabled />
                                    <span className='dash'>-</span>
                                    <input className='counter' value={watch("priceValue")} onChange={(e) => handleInput(e)} />
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
                                    value={watch("priceValue")}
                                    defaultValue={0}
                                    onChange={changePrice}
                                    valueLabelDisplay="auto"
                                />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<KeyboardArrowDown fontSize='small' />}><span className="bold">Акции</span></AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    <CustomCheckbox setValue={setValue} watch={watch} keyValue={"tags"} label='Новинка' inArray='Новинка' />
                                    <CustomCheckbox setValue={setValue} watch={watch} keyValue={"tags"} label='Хит' inArray='Хит' />
                                    <CustomCheckbox setValue={setValue} watch={watch} keyValue={"tags"} label='Скидочная' inArray='discount' />
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<KeyboardArrowDown fontSize='small' />}><span className="bold">Свойства</span></AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    {queryProperties.properties.length > 4 ?
                                        <>
                                            {queryProperties.properties.slice(0, 4).map((queryPropertie, idx) =>
                                                <CustomCheckbox key={idx} watch={watch} setValue={setValue} keyValue={"weightQuery"} label={queryPropertie} inArray={queryPropertie} />
                                            )}
                                            <button className='showAll'>
                                                <span className='showAll-text'>Показать все</span>
                                                <ChevronRightIcon />
                                            </button>
                                        </>
                                        :
                                        queryProperties.properties.map((queryPropertie, idx) =>
                                            <CustomCheckbox key={idx} watch={watch} setValue={setValue} keyValue={"weightQuery"} label={queryPropertie} inArray={queryPropertie} />
                                        )
                                    }
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<KeyboardArrowDown fontSize='small' />}><span className="bold">Бренды</span></AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    {queryProperties.brands.length > 4 ?
                                        <>
                                            {queryProperties.brands.slice(0, 4).map((brandQuery, idx) =>
                                                <CustomCheckbox key={idx} watch={watch} setValue={setValue} keyValue={"brandsQuery"} label={brandQuery} inArray={brandQuery} />
                                            )}
                                            <button className='showAll'>
                                                <span className='showAll-text'>Показать все</span>
                                                <ChevronRightIcon />
                                            </button>
                                        </>
                                        :
                                        queryProperties.brands.map((brandQuery, idx) =>
                                            <CustomCheckbox key={idx} watch={watch} setValue={setValue} keyValue={"brandsQuery"} label={brandQuery} inArray={brandQuery} />
                                        )
                                    }
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                        <div className="catalog__bottom-filters-accardion-buttons">
                            <button className="catalog__bottom-filters-accardion-buttons-reset" onClick={resetFilter}>Сбросить</button>
                            <button className="button-submit" onClick={() => setLoading(true)}>Применить</button>
                        </div>
                    </div>
                </div>
                {loading ? <Loader /> :
                    <div className="catalog__bottom-items">
                        <div className="catalog__bottom-items-top">
                            <span className="catalog__bottom-items-top-totalItems">Всего {items?.length || 0} продуктов</span>
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
                                        value={watch("sortType")}
                                        onChange={(e) => {
                                            setLoading(true)
                                            setValue("sortType", e.target.value)
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
                                        <MenuItem value={"rating false"}>По популярности</MenuItem>
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