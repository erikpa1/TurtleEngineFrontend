import React from "react";

import {useTranslation} from "react-i18next";

import {useNavigate} from "react-router-dom";

import "./MainNavBar.css";

import {Container, Drawer, Stack, Typography} from "@mui/material";
import {MiddleSpinner} from "@components/Spinners";
import Skin from "@data/skin";


const ProjectsView = React.lazy(() => import("@views/project/ProjectsView"));


export default function AppNavbarNew() {
    const [t] = useTranslation();


    const WIDTH = "50px"

    return (
        <div
            className={"navbarbody"}
            id="navbar"
            style={{
                width: WIDTH,
                height: "100vh",
                float: "left",
            }}
        >
            <div

                style={{
                    // boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
                    touchAction: "none",
                    position: "fixed",
                    left: "0px",
                    height: "100vh",
                    width: WIDTH,
                    zIndex: 1,
                    backgroundColor: Skin.ContainerA,
                }}
            >


                <Stack gap={3}>

                    <div style={{
                        marginTop: "5px"
                    }}/>

                    <_ProjectsBar/>

                    {/*<MyNavbarItem*/}
                    {/*    lang={"I/O"}*/}
                    {/*    link={"/io"}*/}
                    {/*    icon={"/icons/spot.svg"}*/}
                    {/*/>*/}

                    <hr style={{color: "lightgray"}}/>


                    <_Version/>

                </Stack>


            </div>
        </div>
    );
}


interface MyNavbarItemProps {
    lang: string;
    icon: string;
    link?: string;
    onClick?: () => void;
}

function MyNavbarItem({lang, icon, link, onClick}: MyNavbarItemProps) {
    const navigate = useNavigate();

    const [t] = useTranslation();

    const iconComponent = (
        <img
            src={icon}
            style={{
                margin: "auto",
                width: "20px",
                height: "20px",
            }}
        />
    );

    return (
        <div
            className={"navbaritem"}
            onMouseDown={(e) => {
                if (e.button === 1) {
                    window.open(`${window.origin}/#${link}`, "_blank")
                }
            }}
            onClick={() => {
                if (onClick) {
                    onClick();
                } else if (link) {
                    navigate(link);
                }
            }}
            style={{
                paddingTop: "2.5px",
                paddingBottom: "2.5px",
            }}
        >
            <Stack>
                {iconComponent}
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "10px"
                    }}
                >
                    {t(lang)}
                </Typography>
            </Stack>
        </div>


    );
}

function _Version({}) {
    return (
        <div style={{
            position: "absolute",
            bottom: "0px",
            left: "50%",
            transform: "translate(-50%, 0)",
            color: "lightgray"
        }}>
            <_SettingsNavItem/>
            v0.1.1
        </div>
    )
}


function _SettingsNavItem({}) {
    const navigate = useNavigate()

    const [t] = useTranslation()
    const [visible, setVisible] = React.useState(false)

    return (
        <>
            <MyNavbarItem
                icon={"/icons/Settings.svg"}
                lang={"settings"}
                onClick={() => {
                    setVisible(true)
                }}
            />

        </>
    )
}


function _ProjectsBar({}) {

    const [visible, setIsVisible] = React.useState(false)

    function clickPressed() {
        setIsVisible(true)
    }

    return (
        <>
            <MyNavbarItem
                lang={"Projects"}
                icon={"/icons/Projects.svg"}
                onClick={clickPressed}
            />

            {
                visible &&
                <Drawer
                    anchor={"right"}
                    open={true}
                    onClose={() => setIsVisible(false)}
                >
                    <Container
                        style={{
                            width: "40em",
                            marginTop: "2em"
                        }}>
                        <React.Suspense fallback={<MiddleSpinner/>}>
                            <ProjectsView onProjectPicked={() => {
                                setIsVisible(false)
                            }}/>
                        </React.Suspense>
                    </Container>
                </Drawer>
            }

        </>

    )
}