import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { MenuItem, Accordion, AccordionSummary, AccordionDetails, FormGroup, Slider, Select } from '@mui/material/';
import { useForm } from "react-hook-form"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { linkSettings } from '../../../Other/Header/Header';
import supabase from '../../../../config/supabseClient';
import { Close, KeyboardArrowDown } from '@mui/icons-material';
import Loader from '../../../Other/Loader/Loader';
import { BlockItemsIcon } from '../../Icons/BlockItemsIcon';
import { HorizontalItemsIcon } from '../../Icons/HorizontalItemsIcon';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import { QueryType, filters } from '../../Types/types';
import CatalogItemHorizontal from '../CatalogItemHorizontal/CatalogItemHorizontal';
import CatalogItem from '../../../Home/CatalogItem/CatalogItem';
import { CatalogItemProps } from '../../../Home/Types/types';
import "./catalog.scss"

const Catalog = () => {
    const routeParams = useParams();
    const navigate = useNavigate()
    const location = useLocation()
    const { setValue, watch, reset } = useForm<QueryType>({
        mode: "onChange", defaultValues: {
            sortType: "title true",
            priceValue: 4000,
            tags: [],
            weightQuery: [],
            brandsQuery: [],
        }
    })

    const [loadersStatus, setLoadersStatus] = useState({ mainLoading: true, firstLoading: true })
    const [horizontalProductDisplay, setHorizontalProductDisplay] = useState(true)
    const [listStatus, setListStatus] = useState({ isFullFirst: false, isFullSecond: false })

    const [items, setItems] = useState<CatalogItemProps[]>()
    const [queryProperties, setQueryProperties] = useState<filters>({ properties: [], brands: [] })
    const [queryTag, setQueryTag] = useState(linkSettings.find(el => el.path === routeParams.sortTag))
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
        setQueryTag(undefined)
        setLoadersStatus(prev => ({ ...prev, mainLoading: true }))
    }

    const resetFilter = () => {
        setLoadersStatus(prev => ({ ...prev, mainLoading: true }))
        reset()
    }

    const sortTag = location.pathname.split("/")[2]
    const fetchData = async () => {
        const regExp = new RegExp(/[^.\d]/g),
            orderType = watch("sortType").split(" "),
            tags = watch("tags"),
            weightQuery = watch("weightQuery").map(weight => weight.replace(regExp, "")),
            { data, error } = await supabase.from('goods').select()
                .contains("tags", sortTag === "all" ? [...tags,] : [...tags, sortTag])
                .contains("weight", weightQuery)
                .order(orderType[0], { ascending: orderType[1] === "true" })
        if (data) {
            const maxPrice = watch("priceValue")
            const brand = watch("brandsQuery")
            let Data: CatalogItemProps[] = data.filter(el => Math.max(...el?.price) <= maxPrice)
            if (brand.length) Data = Data.filter(el => brand.find(brand => el?.title?.toLowerCase().includes(brand.toLowerCase())))
            if (loadersStatus.firstLoading) {
                const answerArray: filters = { properties: [], brands: [] }
                data.forEach((data: any) => {
                    if (data.brand.length) answerArray.brands = Array.from(new Set([...answerArray.brands, data.brand]))
                    answerArray.properties = Array.from(new Set([...answerArray.properties, ...data.weight])).sort((a, b) => a - b)
                })
                answerArray.properties = answerArray.properties.map((el) => el + data.find(element => element.weight.includes(el)).typeOfUnit)
                setQueryProperties(answerArray)
                setLoadersStatus(prev => ({ ...prev, firstLoading: false, }))
            }
            setItems(Data)
            setLoadersStatus(prev => ({ ...prev, mainLoading: false }))
        }
        if (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setQueryTag(linkSettings.find(el => el.path === routeParams.sortTag))
        setLoadersStatus(prev => ({ ...prev, mainLoading: true }))
        if (!linkSettings.find(el => el.path === sortTag)?.path && location.pathname !== '/catalog/all') {
            navigate("/home")
        } else {
            resetFilter()
            fetchData()
            setLoadersStatus(prev => ({ ...prev, firstLoading: true }))
        }
    }, [location.pathname])

    useEffect(() => {
        fetchData()
    }, [loadersStatus.mainLoading])

    const fiterTagText = queryTag?.text
    return (
        <div className="catalog">
            <div className="cart__path">
                <ul className='cart__path-ul'>
                    <Link to={"/home"} className={`cart__path-text-gray`} >Главная</Link>
                    <div className={`cart__path-${fiterTagText ? "gray" : "black"}`}>{">"}</div>
                    <Link to={"/catalog/all"} className={`cart__path-text-${fiterTagText ? "gray" : "black"}`} onClick={() => setLoadersStatus(prev => ({ ...prev, mainLoading: true }))}>
                        Категории товара
                    </Link>
                    {(location.pathname !== '/catalog/all' && fiterTagText) &&
                        <>
                            <div className="cart__path-black">{">"}</div>
                            <li className={`cart__path-text-black`}>{fiterTagText}</li>
                        </>
                    }
                </ul>
            </div >
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
                                {
                                    queryProperties.brands.length !== 0 ?
                                        <FormGroup>
                                            {listStatus.isFullFirst ?
                                                <>
                                                    {queryProperties.properties.map((queryPropertie, idx) =>
                                                        <CustomCheckbox key={idx} watch={watch} setValue={setValue} keyValue={"weightQuery"} label={queryPropertie + "."} inArray={queryPropertie} />
                                                    )}
                                                    < button className='hide' onClick={() => setListStatus(prev => ({ ...prev, isFullFirst: false }))}>Скрыть</button>
                                                </>
                                                :
                                                <>
                                                    {queryProperties.properties.slice(0, 4).map((queryPropertie, idx) =>
                                                        <CustomCheckbox key={idx} watch={watch} setValue={setValue} keyValue={"weightQuery"} label={queryPropertie + "."} inArray={queryPropertie} />
                                                    )}
                                                    {queryProperties.properties.length >= 5 &&
                                                        < button className='showAll' onClick={() => setListStatus(prev => ({ ...prev, isFullFirst: true }))}>
                                                            <span className='showAll-text'>Показать все</span>
                                                            <ChevronRightIcon />
                                                        </button>
                                                    }
                                                </>
                                            }
                                        </FormGroup>
                                        :
                                        <span className="catalog__bottom-items-top-totalItems">Не найдено свойств.</span>
                                }
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<KeyboardArrowDown fontSize='small' />}><span className="bold">Бренды</span></AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    {queryProperties.brands.length !== 0 ?
                                        listStatus.isFullSecond ?
                                            <>
                                                {queryProperties.brands.map((brandQuery, idx) =>
                                                    <CustomCheckbox key={idx} watch={watch} setValue={setValue} keyValue={"brandsQuery"} label={brandQuery} inArray={brandQuery} />
                                                )}
                                                < button className='hide' onClick={() => setListStatus(prev => ({ ...prev, isFullSecond: false }))}>Скрыть</button>
                                            </>
                                            :
                                            <>
                                                {queryProperties.brands.slice(0, 4).map((brandQuery, idx) =>
                                                    <CustomCheckbox key={idx} watch={watch} setValue={setValue} keyValue={"brandsQuery"} label={brandQuery} inArray={brandQuery} />
                                                )}
                                                {queryProperties.brands.length >= 5 &&
                                                    < button className='showAll' onClick={() => setListStatus(prev => ({ ...prev, isFullSecond: true }))}>
                                                        <span className='showAll-text'>Показать все</span>
                                                        <ChevronRightIcon />
                                                    </button>
                                                }
                                            </>
                                        :
                                        <span className="catalog__bottom-items-top-totalItems">Не найдено брендов.</span>
                                    }
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                        <div className="catalog__bottom-filters-accardion-buttons">
                            <button className="catalog__bottom-filters-accardion-buttons-reset" onClick={resetFilter}>Сбросить</button>
                            <button className="button-submit" onClick={() => setLoadersStatus(prev => ({ ...prev, mainLoading: true }))}>Применить</button>
                        </div>
                    </div>
                </div>
                {loadersStatus.mainLoading ?
                    <div className="catalog__bottom-loader">
                        <Loader />
                    </div>
                    :
                    <div className="catalog__bottom-items">
                        <div className="catalog__bottom-items-top">
                            <span className="catalog__bottom-items-top-totalItems">
                                {items?.length ? "Всего " + items.length + " продуктов" : "Нет продуктов по выбранным параметрам"}
                            </span>
                            <div className="catalog__bottom-items-top-right">
                                <div className="catalog__bottom-items-top-right-displayType">
                                    <button className={!horizontalProductDisplay ? 'active' : ""} onClick={() => setHorizontalProductDisplay(false)}>
                                        <BlockItemsIcon />
                                    </button>
                                    <button className={horizontalProductDisplay ? 'active' : ""} onClick={() => setHorizontalProductDisplay(true)}>
                                        <HorizontalItemsIcon />
                                    </button>
                                </div>
                                <div className="catalog__bottom-items-top-right-filterType">
                                    <span className="catalog__bottom-items-top-right-filterType-text">Сортировать:</span>
                                    <Select
                                        value={watch("sortType")}
                                        onChange={(e) => {
                                            setLoadersStatus(prev => ({ ...prev, mainLoading: true }))
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
                            {items?.map((el, idx) => horizontalProductDisplay ? <CatalogItemHorizontal key={idx} {...el} /> : <CatalogItem key={idx} {...el} />)}
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default React.memo(Catalog)