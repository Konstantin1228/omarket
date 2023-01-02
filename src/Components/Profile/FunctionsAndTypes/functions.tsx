import { NumberFormatBase } from "react-number-format";

export function CardExpiry(props: any) {
    const format = (val: string) => {
        if (val === "") return "";
        let month = val.substring(0, 2);
        let year = val.substring(2, 4);
        if (month.length === 1 && Number(month[0]) > 1) {
            month = `0${month[0]}`;
        } else if (month.length === 2) {
            if (Number(month) === 0) {
                month = `01`;
            } else if (Number(month) > 12) {
                month = "12";
            }
        }
        if (year.length === 1 && Number(year[0]) >= 0) {
            year = `2`;
        } else if (year.length === 2) {
            if (Number(year) === 0) {
                year = `20`;
            } else if (Number(year) >= 29) {
                year = "29";
            }
            else if (Number(year) <= 22) {
                year = "22"
            }
        }
        return `${month}/${year}`;
    };

    return <NumberFormatBase placeholder='ММ/ГГ'  {...props } format = { format } />;
}