import { FormControlLabel, Checkbox } from '@mui/material'
import React from 'react'
interface CheckboxProps {
    label: string
}
const CustomCheckbox: React.FC<CheckboxProps> = ({ label }) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    sx={{ color: "#DFDFDF", '&.Mui-checked': { color: "#00953F", }, }}
                // checked={typeOfPayment.isActive}
                // onChange={() => setFilterOrders(({ adresses, payment }) => ({
                //     adresses: adresses, payment: payment.map(({ paymentType, isActive }) => { return { paymentType, isActive: paymentType === typeOfPayment.paymentType ? !isActive : isActive } })
                // }))}
                />
            }
            label={<span className='bold'>{label}</span>}
        />
    )
}

export default CustomCheckbox