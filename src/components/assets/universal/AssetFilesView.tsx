import Asset from "@platform/assets/Asset";
import {TGui} from "@external/tgui";


interface AssetFilesViewProps {
    asset: Asset
}

export function AssetFilesView({asset}: AssetFilesViewProps) {
    return (
        <>Files</>
    )
}

export function AssetFilesSideView({asset}: AssetFilesViewProps) {

    const [t] = TGui.T()

    return (
        <TGui.Card style={{backgroundColor: TGui.Colors.WhiteMiddle}}>
            <TGui.CardContent>
                <TGui.Typography>
                    {t("files")}
                </TGui.Typography>

                <TGui.Card style={{
                    padding: "1em"
                }}>
                    <TGui.Stack gap={3}>
                        {
                            [0, 1, 2, 3].map((value) => {
                                return (
                                    <TGui.Typography key={value}>
                                        {value}.png
                                    </TGui.Typography>
                                )
                            })
                        }
                    </TGui.Stack>
                </TGui.Card>

            </TGui.CardContent>
        </TGui.Card>
    )
}