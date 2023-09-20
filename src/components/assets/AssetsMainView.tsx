import React from "react";

import {Box, Tab, Tabs} from "@mui/material";

import {TabContext} from "@mui/lab";

import {ViewContainer} from "@components/ViewContainer";

import UniversalAssetList from "@components/assets/UniversalAssetList";

import Assets, {AssetsTypeMap} from "@platform/assets/Assets";

import {TGui} from "@external/tgui";

import {useParams} from "react-router-dom";

import {Ext} from "@external/prelude";
import UniversalAssetsTable from "@components/assets/UniversalAssetsTable";

export default function AssetsMainView({}) {

    // return (
    //     <ViewContainer>
    //         <_ViewAsTiles/>
    //     </ViewContainer>
    // )

    const {projectuid}: any = useParams()

    const [tabView, setTabView] = React.useState("0")

    return (
        <ViewContainer>
            <TGui.Stack gap={3}>
                <TGui.Card>
                    <TGui.Tabs
                        value={tabView}
                        onChange={(_, value) => setTabView(value)}
                        centered
                    >
                        <TGui.Tab label={"table"} value={"0"}/>
                        <TGui.Tab label={"tiles"} value={"1"}/>
                    </TGui.Tabs>
                </TGui.Card>


                <TGui.Switch condition={tabView}>
                    <TGui.Case value={"0"}>
                        <UniversalAssetsTable parentProjectUid={projectuid}/>
                    </TGui.Case>
                    <TGui.Case value={"1"}>
                        <_ViewAsTiles/>
                    </TGui.Case>
                </TGui.Switch>
            </TGui.Stack>

        </ViewContainer>
    )
}


function _ViewAsTiles({}) {

    const [t] = TGui.T()


    // const [tabValue, setTabValue] = Ext.Cookie.useCookie("assets-tab-main", "0")
    const [tabValue, setTabValue] = React.useState("world")

    const tabChanged = (e: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue)
    }


    return (
        <div className={"vstack gap-3"}>
            <TabContext value={tabValue}>

                <TGui.Box
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
                        <Tab label={"Vts"} value={"vts"}/>
                    </Tabs>

                </TGui.Box>
            </TabContext>

            <TGui.Switch condition={tabValue}>
                <TGui.Case value={"world"}>
                    <_SubView type={"world"}/>
                </TGui.Case>
                <TGui.Case value={"media"}>
                    <_SubView type={"media"}/>
                </TGui.Case>
                <TGui.Case value={"data"}>
                    <_SubView type={"data"}/>
                </TGui.Case>
                <TGui.Case value={"vts"}>
                    <_SubView type={"vts"}/>
                </TGui.Case>
            </TGui.Switch>

        </div>

    )
}

function _SubView({type}) {


    const [t] = TGui.T()

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

                <TGui.Box
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

                </TGui.Box>
            </TabContext>

            <UniversalAssetList
                parentProjectUid={projectuid ?? ""}
                assetDefinition={AssetsTypeMap.get(tabValue)}
            />

        </div>

    )
}




