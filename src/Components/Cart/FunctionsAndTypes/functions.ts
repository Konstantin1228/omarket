import { useMediaQuery } from "react-responsive";


export function calcCrow(lat1: any, lon1: any, lat2: any, lon2: any) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    //@ts-ignore
    var lat1 = toRad(lat1);
    //@ts-ignore
    var lat2 = toRad(lat2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;

    function toRad(Value: number) {
        return Value * Math.PI / 180;
    }
}

export const onlyNumberInput = (value: string, setValue: Function, lenght: number, register: string) => {
    value = value.replace(/\D/g, "")
    setValue(`${register}`, value.slice(0, lenght))
}



