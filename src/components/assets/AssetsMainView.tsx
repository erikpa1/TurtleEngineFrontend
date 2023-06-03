import React from "react";
import {useTranslation} from "react-i18next";

import Switch, {Case} from "react-switch-case/lib/esm";

import {Box, Tab, Tabs} from "@mui/material";

import {TabContext} from "@mui/lab";

import {ViewContainer} from "@components/ViewContainer";

import {Ext} from "@external/prelude";

import UniversalAssetList from "@components/assets/UniversalAssetList";


import MaterialAsset from "@platform/assets/MaterialAsset";
import {Assets} from "@platform/assets/Assets";
import {useParams} from "react-router-dom";


export default function AssetsMainView({}) {

    const [t] = useTranslation()

    const {projectuid} = useParams()

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
                        className={"turtle-shaded-bar"}
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
                                Assets.values().map((value) => {
                                    return (
                                        <Tab key={value.TYPE} label={t(value.LANG_PLURAL)} value={value.TYPE}/>
                                    )
                                })
                            }
                        </Tabs>

                    </Box>
                </TabContext>

                <Switch condition={tabValue}>
                    {
                        Assets.values().map((value) => {
                            return (
                                <Case key={value} value={value.TYPE}>
                                    <UniversalAssetList parentProjectUid={projectuid ?? ""} assetType={value.TYPE}/>
                                </Case>
                            )
                        })
                    }

                </Switch>

            </div>


        </ViewContainer>

    )
}