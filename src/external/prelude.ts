import React from "react";

import useCookie from "react-use-cookie";

export const Ext = {
    Cookie: {
        useCookie: useCookie,
        useCookieBoolean: useCookieBoolean
    }
}


function useCookieBoolean(key: string, init_value: boolean): [boolean, (value: boolean) => void] {

    const [value, valueSetter] = useCookie(key, init_value === true ? "true" : "false")

    const [booleanValue, setBooleanValue] = React.useState(value === "true" ? true : false)
    const setNewValue = (newValue: boolean) => {
        setBooleanValue(newValue)
        valueSetter(newValue == true ? "true" : "false")
    }
    return [booleanValue, setNewValue]

}