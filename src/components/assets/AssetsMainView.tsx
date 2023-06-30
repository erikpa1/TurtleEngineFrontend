import React from "react";
import {useTranslation} from "react-i18next";

import Switch, {Case} from "react-switch-case/lib/esm";

import {Box, Tab, Tabs} from "@mui/material";

import {TabContext} from "@mui/lab";

import {ViewContainer} from "@components/ViewContainer";

import {Ext} from "@external/prelude";

import UniversalAssetList from "@components/assets/UniversalAssetList";


import {Assets, AssetsTypeMap} from "@platform/assets/Assets";
import {useParams} from "react-router-dom";


export default function AssetsMainView({}) {

    const [t] = useTranslation()


    const [tabValue, setTabValue] = Ext.Cookie.useCookie("assets-tab-main", "0")

    const tabChanged = (e: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue)
    }

    return (
        <ViewContainer>

            <div className={"vstack gap-3"}>
                <TabContext value={tabValue}>

                    <Box
                        sx={{borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper'}}
                    >
                        <Tabs
                            value={tabValue}
                            onChange={tabChanged}
                            aria-label="Asset tabs"
                            textColor="inherit"
                        >
                            <Tab label={"World"} value={"world"}/>
                            <Tab label={"Media"} value={"media"}/>
                            <Tab label={"Data"} value={"data"}/>
                        </Tabs>

                    </Box>
                </TabContext>

                <_SubView type={tabValue}/>

            </div>


        </ViewContainer>

    )
}

function _SubView({type}) {

    const [t] = useTranslation()

    const {projectuid} = useParams()

    const [tabValue, setTabValue] = Ext.Cookie.useCookie(`assets-tab-${type}`, Assets[`${type}Assets`]()[0].TYPE)

    const tabChanged = (e: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue)
    }

    React.useEffect(() => {
        setTabValue(Assets[`${type}Assets`]()[0].TYPE)
    }, [type])

    return (
        <div className={"vstack gap-3"}>
            <TabContext value={tabValue}>

                <Box
                    sx={{borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper'}}
                >
                    <Tabs
                        value={tabValue}
                        onChange={tabChanged}
                        aria-label="Asset tabs"
                        variant={"scrollable"}
                        scrollButtons={"auto"}
                        textColor="inherit"
                    >
                        {
                            Assets[`${type}Assets`]().map((value) => {
                                return (
                                    <Tab key={value.TYPE} label={t(value.LANG_PLURAL)} value={value.TYPE}/>
                                )
                            })
                        }
                    </Tabs>

                </Box>
            </TabContext>

            <UniversalAssetList
                parentProjectUid={projectuid ?? ""}
                assetDefinition={AssetsTypeMap.get(tabValue)}
            />

        </div>

    )
}


function _SubTypeView({}) {
    return (
        <></>
    )
}


