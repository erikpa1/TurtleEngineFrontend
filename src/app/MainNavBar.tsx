import React from "react"

import * as sb from "react-pro-sidebar"

import {useTranslation} from "react-i18next";

import {useNavigate} from "react-router-dom";

import {Image} from "react-bootstrap";

import "./MainNavBar.css"

import {Project} from "@data/project/Project";

import {Ext} from "@external/prelude";

import {useActiveProjectZus} from "@platform/zustands/projectZuses";

import RoutesManager from "@platform/RoutesManager";
import AppApi from "@api/AppApi";


export default function MainNavBar() {


    const [isCollapsed, setisCollapsed] = Ext.Cookie.useCookieBoolean("navbar-collapsed", false)

    const collapse = () => {
        setisCollapsed(!isCollapsed as any)
    }


    return (

        <div style={{
            width: isCollapsed ? "79px" : "200px",
            height: "100vh",
            float: "left",
            backgroundColor: "#002c3d",
        }}>
            <sb.Sidebar
                backgroundColor={"rgba(0, 0,0, 0.5)"}
                image={"/textures/AppBackgroundBlured.png"}
                width={isCollapsed ? "80px" : "200px"}
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    touchAction: "none",
                    position: "fixed",
                    left: "0px",
                    height: "100vh",
                    zIndex: 1000

                }}
            >
                <sb.Menu>
                    <div
                        style={{
                            padding: '24px',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: "white",
                            cursor: "pointer",

                        }} onClick={() => {
                        collapse()
                    }}>
                        {"Turtle Engine"}
                    </div>

                </sb.Menu>


                {
                    AppApi.IsEditor() && <_EditorMenu/>
                }
                {
                    AppApi.IsPlayer() && <_PlayerMenu/>
                }


            </sb.Sidebar>
        </div>

    )
}

function _PlayerMenu() {

    const projectZus = useActiveProjectZus()

    return (
        <sb.Menu>
            <MyNavbarItem lang={"projects"}
                          link={RoutesManager.ROUTE_PROJECTS} icon={"/icons/Projects.svg"}/>

            <MyNavbarItem lang={"users"}
                          link={RoutesManager.ROUTE_TRAINING_USERS} icon={"/icons/Users.svg"}/>

            <MyNavbarItem lang={"statistics"}
                          link={RoutesManager.ROUTE_TRAINING_STATISTICS}
                          icon={"/icons/PieChart.svg"}/>

            <MyNavbarItem lang={"trainings"}
                          link={RoutesManager.ROUTE_TRAININGS}
                          icon={"/icons/Trainings.svg"}/>
        </sb.Menu>
    )
}


function _EditorMenu() {

    const projectZus = useActiveProjectZus()


    return (
        <>
            <sb.Menu>
                <MyNavbarItem lang={"projects"} link={"/projects"} icon={"/icons/Projects.svg"}/>
                <MyNavbarItem lang={"management"} link={"/management"} icon={"/icons/Management.svg"}/>
                <MyNavbarItem lang={"rendering"} link={"/rendering"} icon={"/icons/Scene.svg"}/>
            </sb.Menu>

            <Hr/>

            {
                projectZus.project && <_ActiveProjectBar project={projectZus.project}/>
            }

            <sb.Menu
                style={{
                    position: "absolute",
                    bottom: "0px",
                    width: "100%"
                }}
            >
                <Hr/>
                {/*<_SettingsNavItem/>*/}

            </sb.Menu>
        </>
    )
}


interface MyNavbarItemProps {
    lang: string
    icon: string
    link?: string
    onClick?: () => void
}


function MyNavbarItem({lang, icon, link, onClick}: MyNavbarItemProps) {

    const navigate = useNavigate()

    const [t] = useTranslation()

    const iconComponent = (
        <>
            <div style={{
                height: "100%",
                width: "1px",
                backgroundColor: "#006ba8"
            }}/>
            <Image src={icon} style={{
                margin: "auto",
                width: "20px",
                height: "20px"
            }}/>

        </>
    )

    return (
        <sb.MenuItem
            icon={iconComponent}
            onClick={() => {
                if (onClick) {
                    onClick()
                } else if (link) {
                    navigate(link)
                }
            }}
            className={"navbaritem"}
        >
            {t(lang)}

        </sb.MenuItem>
    )
}


function MyNavbarSubItem({children, lang, icon}) {

    const navigate = useNavigate()

    const [t] = useTranslation()

    const iconComponent = (
        <Image src={icon} style={{
            margin: "auto",
            width: "20px",
            height: "20px"
        }}/>
    )

    return (
        <sb.SubMenu
            title={t(lang) as string}
            icon={iconComponent}
            color={"white"}

        >
            <div style={{backgroundColor: "rgb(10, 10, 10)"}}>
                {
                    React.Children.toArray(children)
                }
            </div>
        </sb.SubMenu>
    )
}

function _SettingsNavItem({}) {

    const [show, setShow] = React.useState(false)

    return (
        <>
            <MyNavbarItem
                icon={"/icons/settings.svg"}
                lang={"settings"}
                onClick={() => {
                    setShow(true)
                }}
            />
            {/*{*/}
            {/*    show &&*/}
            {/*    <SettingsOffcanvas onHide={() => setShow(false)}/>*/}
            {/*}*/}
        </>
    )
}

interface _ActiveProjectBarProps {
    project: Project
}


function Hr() {
    return (
        <hr color={"white"}/>
    )
}

function _ActiveProjectBar({project}: _ActiveProjectBarProps) {

    return (
        <sb.Menu>
            <MyNavbarItem
                lang={"project"}
                link={RoutesManager.ProjectConfig(project.uid)}
                icon={"/icons/Alchemy.svg"}/>

            <MyNavbarItem
                lang={"assets"}
                link={RoutesManager.Assets(project.uid)}
                icon={"/icons/Assets.svg"}/>

            <MyNavbarItem
                lang={"play"}
                link={RoutesManager.Play(project.uid)}
                icon={"/icons/Spot.svg"}/>

        </sb.Menu>
    )

}