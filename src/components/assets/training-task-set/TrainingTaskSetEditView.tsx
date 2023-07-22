import React from "react";
import {TGui} from "@external/tgui";
import Asset from "@platform/assets/Asset";
import TrainingTaskSetData, {TrainingTask} from "@platform/assets/trainingTaskSetData";
import Modals from "@components/Modals";


interface TrainingTaskSetEditViewProps {
    asset: Asset
}

export default function TrainingTaskSetEditView({asset}: TrainingTaskSetEditViewProps) {


    const [_asset, setAsset] = React.useState<[Asset]>([asset])

    function refresh() {
        setAsset([asset])
    }

    return (
        <TGui.Row>

            <_TasksList asset={_asset} onFullRefresh={refresh}/>

        </TGui.Row>
    )
}

interface _TasksListProps {
    asset: [Asset]
    onFullRefresh: any
}

function _TasksList({asset, onFullRefresh}: _TasksListProps) {


    const _asset: Asset = asset[0] as any
    const _data: TrainingTaskSetData = _asset.data as any

    const [tasks, setTasks] = React.useState(_data.tasks)

    function refresh() {
        setTasks([..._data.tasks])
    }


    return (
        <TGui.Card style={{backgroundColor: TGui.Colors.WhiteMiddle}}>

            <TGui.CardContent>
                <TGui.Stack gap={3}>


                    <_AddButton
                        index={0}
                        taskset={_data}
                        onRefresh={refresh}
                    />

                    {
                        _data.tasks.map((value, index) => {
                            return (
                                <React.Fragment key={value.uid}>
                                    <_TaskListItem
                                        index={index}

                                        item={value}
                                        onFullRefresh={refresh}
                                    />

                                    <_AddButton
                                        index={index + 1}
                                        taskset={_data}
                                        onRefresh={refresh}
                                    />

                                </React.Fragment>

                            )
                        })
                    }

                </TGui.Stack>
            </TGui.CardContent>

        </TGui.Card>

    )
}

function _AddButton({index, taskset, onRefresh}) {

    function addPressed() {
        const newTask = new TrainingTask()
        taskset.tasks.splice(index, 0, newTask)
        onRefresh()
    }

    return (
        <TGui.IconClickButton
            image={"/icons/Add.svg"}
            onClick={addPressed}
            style={{
                marginLeft: "auto",
                marginRight: "auto",
            }}
        />
    )
}

interface _TaskListItemProps {
    item: TrainingTask
    index: number
    onFullRefresh: any
}

function _TaskListItem({item, index, onFullRefresh}: _TaskListItemProps) {

    const [t] = TGui.T()

    const [name, setName] = React.useState(item.name)
    const [lang, setLang] = React.useState(item.text)

    function moveUp() {
        //pass
    }

    function moveDown() {
        //pass
    }

    function deleteConfirmed() {
        const _parent: TrainingTask = item._parent
        _parent.tasks = _parent.tasks.filter(value => value !== item)
        onFullRefresh()
    }

    function deleteTask() {
        Modals.showYesNoModal({
            lang: "question.delete.task",
            onYes: deleteConfirmed
        })
    }

    return (
        <TGui.Stack gap={3}>
            <TGui.Card style={{margin: "0.1em", padding: "0.5em"}}>
                <TGui.Stack direction={"horizontal"} gap={3}>
                    <div>{index + 1}.</div>

                    <TGui.TextMicro>
                        {t("name")}:
                    </TGui.TextMicro>

                    <input value={name} onChange={(e) => {
                        item.name = e.target.value
                        setName(item.name)
                    }}/>

                    <TGui.TextMicro>
                        {t("lang")}:
                    </TGui.TextMicro>

                    <input value={lang} onChange={(e) => {
                        item.name = e.target.value
                        setLang(item.name)
                    }}/>


                    <TGui.Stack
                        direction={"horizontal"}
                        style={{
                            marginLeft: "auto"
                        }}
                        gap={1}
                    >
                        <TGui.IconClickButton
                            onClick={moveUp}
                            image={"/icons/Arrow.Up.svg"}
                        />
                        <TGui.IconClickButton
                            onClick={moveDown}
                            image={"/icons/Arrow.Down.svg"}
                        />
                        <TGui.IconClickButton
                            onClick={deleteTask}
                            image={"/icons/Delete.svg"}
                        />

                    </TGui.Stack>

                </TGui.Stack>
            </TGui.Card>

        </TGui.Stack>
    )
}

function _TasksEditList({asset}: _TasksListProps) {
    return (
        <TGui.Stack gap={3}>
            <TGui.Card style={{backgroundColor: TGui.Colors.WhiteMiddle}}>
                A
                B
                C
            </TGui.Card>

        </TGui.Stack>
    )
}