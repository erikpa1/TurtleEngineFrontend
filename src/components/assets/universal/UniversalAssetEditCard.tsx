import Asset from "@platform/assets/Asset";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import ExamAssetData from "@platform/assets/exam";
import AssetsApi from "@api/AssetsApi";
import {TGui} from "@external/tgui";
import FsTools from "@api/FsTools";
import React from "react";
import PlatformDispatcher from "@api/PlatformDispatcher";
import ImagesApi from "@api/ImagesApi";
import {showSimpleStringInput} from "@components/Modals";


interface UniversalAssetEditCardProps {
    asset: Asset
}

export function UniversalAssetEditCard({asset}: UniversalAssetEditCardProps) {


    const [_asset, setAsset] = React.useState([asset])

    const lock = useGlobalAppLock()

    const exam: ExamAssetData = asset.data

    const inputRef = React.useRef<any>()

    function refresh() {
        setAsset([asset])
    }

    async function takeSnapshotPressed() {

        lock.lock()

        if (PlatformDispatcher.IsDesktop()) {
            const filePath = await PlatformDispatcher.OpenAnySingleFileDialog("Image", "png")

            if (filePath !== "") {
                const pathToSave = `${asset.GetFolderPath()}/Preview.png`

                await ImagesApi.GeneratePreviewDesktop(filePath, pathToSave, 512)
            }
            lock.unlock()

        } else {
            const curr: any = inputRef.current
            curr.click()
        }
    }

    async function renamePressed() {
        showSimpleStringInput("asset.new.name", "change.and.save", (value) => {
            asset.name = value

            lock.lock()

            AssetsApi.UpdateAsset(asset).then(() => {
                lock.unlock()
                refresh()
            })

        })
    }

    async function savePressed() {
        lock.lock()

        await AssetsApi.UploadAssetData(asset.parent_project_uid, asset.uid, exam.ToJson())
        lock.unlock()
    }

    return (

        <TGui.Card style={{backgroundColor: TGui.Colors.WhiteMiddle}}>

            <TGui.CardMedia
                sx={{height: 120}}
                image={FsTools.ConvertFilePathRnd(_asset[0].GetPreviewPath())}
            />


            <TGui.CardContent>
                <TGui.Typography>
                    {_asset[0].name}
                </TGui.Typography>
            </TGui.CardContent>

            <TGui.CardActions>
                <TGui.Button
                    onClick={savePressed}
                    label={"save"}
                />
                <TGui.Button
                    label={"snapshot"}
                    onClick={takeSnapshotPressed}
                />
                <input
                    ref={inputRef}
                    onChange={takeSnapshotPressed}
                    type={"file"}
                    hidden
                />
                <TGui.Button
                    label={"rename"}
                    onClick={renamePressed}
                />

            </TGui.CardActions>
        </TGui.Card>
    )
}
