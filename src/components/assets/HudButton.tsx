import React, {MouseEvent} from "react";

import {Image} from "react-bootstrap";
import {useTranslation} from "react-i18next";


const IMAGE_STYLE = {
    width: "50px",
    height: "50px",
    padding: "10px"
}

interface HudButtonProps {
    icon: string;
    lang?: string;
    onClick?: (evnt: MouseEvent<any>) => void
    disabled?: boolean
    isActive?: boolean
}


export default function HudButton({
                                      icon,
                                      lang,
                                      onClick,
                                      disabled,
                                      isActive,
                                  }: HudButtonProps) {


    const [t] = useTranslation()

    return (
        <div style={{
            width: "50px",
            height: "70px",
            cursor: disabled ? "" : "pointer",

        }}
             onClick={(evnt) => {
                 console.log("Clicking")
                 if (!disabled && onClick) {
                     onClick(evnt)
                 }
             }}
        >
            <div style={{
                borderRadius: "50%",
                backgroundColor: isActive ? `rgb(100, 0, 0)` : `rgb(30, 30, 30)`,
            }}>
                <div style={{
                    width: "50px",
                    height: "50px",
                }}>
                    <Image style={{
                        ...IMAGE_STYLE,
                    }}
                           src={icon}
                    />
                </div>
            </div>

            {
                lang && <div style={{
                    textAlign: "center",
                    color: "white",
                    margin: "auto",
                }}>{t(lang)}</div>
            }


        </div>
    )
}