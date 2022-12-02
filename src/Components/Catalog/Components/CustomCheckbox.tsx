import { FormControlLabel, Checkbox } from '@mui/material'
import React from 'react'
interface CheckboxProps {
    label: string
    inArray: string
    updateState: React.Dispatch<React.SetStateAction<any>>
    state: any[]
}

const CustomCheckbox: React.FC<CheckboxProps> = ({ updateState, state, label, inArray }) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    sx={{ color: "#DFDFDF", '&.Mui-checked': { color: "#00953F", }, }}
                    checked={state.includes(inArray )}
                    onChange={() => updateState((prevData: string[]) => state.includes(inArray) ? state.filter(el => el !== inArray) :
                        [...prevData, inArray])}
                />
            }
            label={<span className='bold'>{label}</span>}
        />
    )
}

export default React.memo(CustomCheckbox)