import React from 'react'
import { FormControlLabel, Checkbox } from '@mui/material'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'

interface CheckboxProps {
    setValue: UseFormSetValue<any>
    watch: UseFormWatch<any>
    keyValue: string
    inArray: string
    label: string
}

const CustomCheckbox: React.FC<CheckboxProps> = ({ setValue, watch, keyValue, label, inArray }) => {
    const array = watch(keyValue)
    const handleChange = () => array.includes(inArray) ? setValue(keyValue, array.filter((el: number | string) => el !== inArray)) : setValue(keyValue, [...array, inArray])
    return (
        <FormControlLabel
            // background: #00953F;
            // border-radius: 4px;    
            control={
                <Checkbox
                    sx={{
                        // '& .MuiSvgIcon-root': {
                        // color: "#00953F",
                        // },
                        '&.Mui-checked': { color: "#00953F", }
                    }}
                    checked={array.includes(inArray)}
                    onChange={handleChange}
                />
            }
            label={< span className='bold' > {label}</span >}
        />
    )
}

export default CustomCheckbox