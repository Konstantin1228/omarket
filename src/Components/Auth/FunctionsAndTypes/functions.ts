import { ChangeEvent, KeyboardEvent } from "react"
import { UseFormClearErrors, UseFormSetError, UseFormTrigger, UseFormWatch } from "react-hook-form"

export const formattedTelephone = (e: ChangeEvent<HTMLInputElement>, setError: UseFormSetError<any>, clearErrors: UseFormClearErrors<any>) => {
    let inputValue = e.target.value.replace(/\D/g, "")
    let formattedInputValue = ""
    const { selectionStart } = e.target
    if (["7", "8", "9", "3"].indexOf(inputValue[0]) !== -1) {
        const firstSybmol = (inputValue[0] === "8") ? "8" : `+${inputValue[0]}`
        formattedInputValue = e.target.value = firstSybmol
        if (selectionStart === inputValue.length) {
            //@ts-ignore
            const data = e.nativeEvent.data
            if (data && /\D/g.test(data)) e.target.value = inputValue
        }
        if (inputValue.length > 1) {
            formattedInputValue += " (" + inputValue.substring(1, 4)
        }
        if (inputValue.length >= 5) {
            formattedInputValue += ") " + inputValue.substring(4, 7)
        }
        if (inputValue.length >= 8) {
            formattedInputValue += "-" + inputValue.substring(7, 9)
        }
        if (inputValue.length >= 10) {
            formattedInputValue += "-" + inputValue.substring(9, 11)
        }
        if (formattedInputValue.length !== 18) {
            // setError("tel", { type: 'custom', message: 'Введите корректный номер телефона!' })
        } else {
            // clearErrors("tel")
        }
    } else {
        formattedInputValue = "+" + inputValue.substring(0, 14)
        // formattedInputValue.length === 15 ? clearErrors("tel") : setError("tel", { type: 'custom', message: 'Введите корректный номер телефона!' })
    }
    const keyDown = (e: KeyboardEventInit) => {
        // @ts-ignore
        if (e.keyCode === 8 && (e.target.value.length === 2 || e.target.value.length === 1)) {
            // @ts-ignore
            e.target.value = ""
        }
    }
    e.target.addEventListener("keydown", keyDown)
    e.target.value = formattedInputValue
    // console.log(/^[+]{1}[0-9]{1} [(]{1}[0-9]{3}[)]{1} [0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/.test(formattedInputValue));
    return formattedInputValue
}


