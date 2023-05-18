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
                        className={"turtle-shaded-bar"}
                    >
                        <Tabs
                            value={tabValue}
                            onChange={tabChanged}
                            aria-label="basic tabs example"
                            centered
                            scrollButtons={true}
                            textColor="inherit"
                        >
                            {/*<Tab label={t("core.all")} value={"0"}/>*/}
                            <Tab label={t("core.quizzes")} value={"1"}/>
                            <Tab label={t("core.images")} value={"2"}/>
                            <Tab label={t("core.videos")} value={"3"}/>
                            <Tab label={t("core.panoramas")} value={"4"}/>
                            <Tab label={t("core.pointclouds")} value={"5"}/>
                            <Tab label={t("core.meshes")} value={"6"}/>
                            <Tab label={t("core.materials")} value={"7"}/>
                        </Tabs>

                    </Box>
                </TabContext>

                <Switch condition={tabValue}>
                    {/*<Case value={"0"}><UniversalAssetList assetType={Assets.Material.TYPE}/></Case>*/}
                    <Case value={"1"}><UniversalAssetList assetType={Assets.Quiz.TYPE}/></Case>
                    <Case value={"2"}><UniversalAssetList assetType={Assets.Image.TYPE}/></Case>
                    <Case value={"3"}><UniversalAssetList assetType={Assets.Video.TYPE}/></Case>
                    <Case value={"4"}><UniversalAssetList assetType={Assets.Panorama.TYPE}/></Case>
                    <Case value={"5"}><UniversalAssetList assetType={Assets.PointCloud.TYPE}/></Case>
                    <Case value={"6"}><UniversalAssetList assetType={Assets.Mesh.TYPE}/></Case>
                    <Case value={"7"}><UniversalAssetList assetType={Assets.Material.TYPE}/></Case>
                </Switch>

            </div>


        </ViewContainer>

    )
}