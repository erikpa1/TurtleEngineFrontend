import "./TopBarButton.css"

import React from "react";
import {useTranslation} from "react-i18next";
import Stack from "@mui/material/Stack";
import {CircularProgress, Skeleton} from "@mui/material";
import MySkeleton from "@components/MySkeleton";
import Skin from "@data/skin";


interface TopBarButtonProps {
    isActive?: boolean
    icon: string
    lang: string
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
    disabled?: boolean
}

export default function TopBarButton({icon, isActive, disabled, onClick, lang}: TopBarButtonProps) {

    const [t] = useTranslation()


    return (
        <div
            className={"TopBarButton"}
            style={{
                width: "60px",
                padding: "2px",
                margin: "2px",
                ...((isActive ? {backgroundColor: "#dfeacc"} : {})),
                ...((disabled ? {opacity: 0.5} : {cursor: "pointer"}))
            }}
            {...((disabled ? {} : {onClick: onClick}))}


        >
            <Stack>
                <div>
                    <img

                        src={icon}
                        style={{
                            width: '100%',
                            height: 30,
                            marginLeft: "auto"
                        }}
                    />

                </div>

                <div style={{
                    textAlign: "center",
                    marginTop: "auto",
                    fontSize: "11px",
                    color: Skin.FontActive,
                }}>
                    {t(lang)}
                </div>
            </Stack>

        </div>
    )
}

interface TopBarLoadingButtonProps {
    onClick?: () => void
    lang: string
}

export function TopBarLoadingButton({onClick, lang}: TopBarLoadingButtonProps) {

    const [t] = useTranslation()

    return (
        <div
            className={"TopBarButton"}
            style={{
                width: "60px",
                height: "90px",
                padding: "5px",
            }}
            onClick={onClick}
        >
            <Stack>
                <Stack>
                    <CircularProgress/>
                </Stack>

                <div style={{
                    textAlign: "center",
                    marginTop: "auto",
                    fontSize: "11px"
                }}>
                    {t(lang)}
                </div>
            </Stack>

        </div>
    )
}

interface TopBarDropButtonProps {
    isActive?: boolean
    icon: string
    lang: string
    onClick?: () => void
    onDropPicked?: () => void
}


export function TopBarDropButton({icon, isActive, onDropPicked, onClick, lang}: TopBarDropButtonProps) {

    const [t] = useTranslation()

    return (
        <div

            style={{
                width: "60px",
                height: "90px",
                padding: "2.5px",
            }}

        >
            <Stack>

                <div
                    style={{
                        ...((isActive ? {backgroundColor: "#dfeacc"} : {})),
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                    onClick={onClick}
                    className={"TopBarButton"}>

                    <div style={{margin: "auto"}}>
                        <img
                            src={icon}
                            style={{
                                height: "35px",
                                width: "35px",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        />
                    </div>


                    <div style={{
                        textAlign: "center",
                        marginTop: "auto",
                        fontSize: "12px"
                    }}>
                        {t(lang)}
                    </div>

                </div>

                <div
                    onClick={onDropPicked}
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    className={"TopBarButton"}
                >

                    <img
                        src={"/icons/arrow-down.svg"}
                        style={{
                            height: "12px",
                            width: "12px",
                            marginLeft: "auto",
                            marginTop: "auto"
                        }}
                    />
                </div>


            </Stack>

        </div>
    )
}

export function TopBarMiniButton({icon, disabled, isActive, onClick, lang}: TopBarButtonProps) {

    const [t] = useTranslation()

    const _icon = typeof icon === 'string' ? (
        <img
            style={
                {
                    width: "15px",
                    height: "15px",
                    marginRight: "10px",
                    marginTop: "auto",
                    marginBottom: "auto",
                }

            }
            src={icon}
        />
    ) : icon

    return (
        <div
            className={"TopBarButtonMini"}
            onClick={disabled ? null as any : onClick}
            style={({
                ...(isActive && {backgroundColor: "#dfeacc"}),
                ...(disabled && {opacity: 0.5})
            })}

        >
            {_icon}
            <div
                style={{
                    fontSize: "11px"
                }}>
                {t(lang)}
            </div>
        </div>
    )
}


interface TopBarFileButtonProps {
    lang: string
    isActive?: boolean
    onClick?: (e?: any) => void
    disabled?: boolean
}

export function TopBarTextButton({lang, disabled, isActive, onClick}: TopBarFileButtonProps) {

    const [t] = useTranslation()

    return (
        <div style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            cursor: "pointer",
            height: "20px",
            color: Skin.FontActive,
            ...(isActive ? {backgroundColor: Skin.ContainerB} : {color: "grey"}),
            ...(disabled ? {opacity: 0.5} : {})
        }}
             className={"TopBarButton"}
             onClick={onClick}
        >
            {t(lang)}
        </div>
    )
}

export function TopBarSeparator({}) {
    return (
        <div
            style={{
                width: "1px",
                minWidth: "1px",
                height: "100%",
                backgroundColor: "lightgray",
                marginLeft: "2px",
                marginRight: "2px"
            }}
        >
            {" "}
        </div>
    )
}