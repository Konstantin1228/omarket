import React, { useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, FormGroup, Slider } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./catalog.scss"
import CustomCheckbox from './Components/CustomCheckbox';
const Catalog = () => {
    const [value, setValue] = React.useState<number[]>([0, 10]);
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    return (
        <div className="catalog">
            <div className="cart__path">
                <ul>
                    <div className={`cart__path-text-gray`} >Главная</div>
                    <>
                        <li className="cart__path-gray">{">"}</li>
                        <div className={`cart__path-text-black`} >Категории товара</div>
                    </>
                </ul>
            </div>
            <h1 className="catalog__category">Категории товаров</h1>
            <div className="catalog__bottom">
                <div className="catalog__bottom-filters">
                    <Accordion>
                        <AccordionSummary expandIcon={<KeyboardArrowDownIcon fontSize='small' />}><span className="bold">Цена</span></AccordionSummary>
                        <AccordionDetails>
                            <>
                                <div className="catalog__bottom-filters-parentAccardion">
                                    <span className='counter'>{value[0]}</span>
                                    <span className='dash'>-</span>
                                    <span className='counter'>{value[1]}</span>
                                </div>
                                <Slider
                                    sx={{
                                        color: "#00953F",
                                        '& .MuiSlider-thumb': {
                                            width: 17,
                                            height: 17,
                                            backgroundColor: "white",
                                            // content: "",
                                            border: "3px solid #00953F"
                                        },
                                        '& .MuiSlider-valueLabel': {
                                            display: "none"
                                        },
                                    }}
                                    max={15000}
                                    value={value}
                                    defaultValue={0}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                />
                            </>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<KeyboardArrowDownIcon fontSize='small' />}><span className="bold">Акции</span></AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                <CustomCheckbox label='Ценовая' />
                                <CustomCheckbox label='Скидочная' />
                                <CustomCheckbox label='Подарочная' />
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<KeyboardArrowDownIcon fontSize='small' />}><span className="bold">Свойства</span></AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                <CustomCheckbox label='0.5 л.' />
                                <CustomCheckbox label='1 л.' />
                                <CustomCheckbox label='1.5 л.' />
                                <CustomCheckbox label='2 л.' />
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<KeyboardArrowDownIcon fontSize='small' />}><span className="bold">Бренды</span></AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                <CustomCheckbox label='Red Bull' />
                                <CustomCheckbox label='Yeti' />
                                <CustomCheckbox label='Gorilla' />
                                <CustomCheckbox label='Monster' />
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                    <div className="catalog__bottom-filters-buttons">
                        <button className="catalog__bottom-filters-buttons-reset">Сбросить</button>
                        <button className="button-submit bold">Применить</button>
                    </div>
                </div>
                <div className="catalog__bottom-items">
                    <div className="catalog__bottom-items-totalItems">Всего 8 748 продуктов</div>
                    <div className="catalog__bottom-items-right">
                        <div className="catalog__bottom-items-right-displayType">
                            <button className='active'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="4" height="7" rx="1" fill="#9C9C9C" />
                                    <rect y="9" width="4" height="7" rx="1" fill="#9C9C9C" />
                                    <rect x="6" width="4" height="7" rx="1" fill="#9C9C9C" />
                                    <rect x="6" y="9" width="4" height="7" rx="1" fill="#9C9C9C" />
                                    <rect x="12" width="4" height="7" rx="1" fill="#9C9C9C" />
                                    <rect x="12" y="9" width="4" height="7" rx="1" fill="#9C9C9C" />
                                </svg>
                            </button>
                            <button  >
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
                        <div className="catalog__bottom-items-right-filterType">
                            <div className="catalog__bottom-items-right-filterType-text">Сортировать:</div>
                            <button className="catalog__bottom-items-right-filterType-typeFilter">
                                По популярности
                                <svg
                                    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5876 6.19329L8.00096 8.77996L5.4143 6.19329C5.1543 5.93329 4.7343 5.93329 4.4743 6.19329C4.2143 6.45329 4.2143 6.87329 4.4743 7.13329L7.5343 10.1933C7.7943 10.4533 8.2143 10.4533 8.4743 10.1933L11.5343 7.13329C11.7943 6.87329 11.7943 6.45329 11.5343 6.19329C11.2743 5.93996 10.8476 5.93329 10.5876 6.19329V6.19329Z" fill="#0D0D0D" />                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Catalog