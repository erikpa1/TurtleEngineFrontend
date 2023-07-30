import {TGui} from "@external/tgui";
import React from "react";
import LanguagesApi, {LangsMap} from "@api/LanguagesApi";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import {useParams} from "react-router-dom";


interface _LanguagesTableProps {
    langs: LangsMap
    avlLangs: Set<string>
}

export default function LanguagesEditTable({langs, avlLangs}: _LanguagesTableProps) {

    const {projectuid}: any = useParams()

    const lock = useGlobalAppLock()

    function savePressed() {
        lock.lock()
        LanguagesApi.SaveAll(projectuid, avlLangs, langs).then(() => {
            lock.unlock()

        })
    }

    function addKeyPressed() {

    }

    return (
        <>
            <TGui.Stack gap={3} direction={"horizontal"}>
                <TGui.Button
                    label={"save"}
                    onClick={savePressed}
                />
                <TGui.Button
                    label={"add"}
                    onClick={addKeyPressed}
                />

            </TGui.Stack>

            <_Table langs={langs} avlLangs={avlLangs}/>

        </>
    )
}

function _createTableColumn(data) {
    return {}
}

function _Table({langs, avlLangs}: _LanguagesTableProps) {


    const avlLangsArray = Array.from(avlLangs.values())

    return (
        <TGui.Card style={{backgroundColor: TGui.Colors.WhiteMiddle}}>
            <TGui.Table size="small">
                <_THead avlLangs={avlLangs}/>
                <TGui.TableBody>
                    {
                        Array.from(langs.entries()).map((keyAndValues) => {
                            return (
                                <TGui.TableRow key={keyAndValues[0]}>
                                    <_LanguageEditRow
                                        avlLangsArray={avlLangsArray}
                                        keyAndValues={keyAndValues}
                                    />
                                </TGui.TableRow>
                            )
                        })
                    }
                </TGui.TableBody>
            </TGui.Table>
        </TGui.Card>
    )
}

interface _LanguageEditRowProps {
    keyAndValues: [string, Map<string, string | any>]
    avlLangsArray: Array<string>
}

function _LanguageEditRow({keyAndValues, avlLangsArray}: _LanguageEditRowProps) {


    return (
        <>
            <TGui.TableCell>
                <input
                    value={keyAndValues[0]}
                    onChange={() => {
                        console.log("Key change is not implemented")
                    }}
                />
            </TGui.TableCell>

            {
                avlLangsArray.map((langMut) => {
                    return (
                        <_LangInputCell key={langMut} keyAndValues={keyAndValues} langMut={langMut}/>
                    )
                })
            }

        </>
    )
}

function _LangInputCell({keyAndValues, langMut}) {

    const [cellValue, setCellValue] = React.useState(keyAndValues[1].get(langMut) ?? "")

    function typing(mutation: string, newValue: string) {
        keyAndValues[1].set(mutation, newValue)
        setCellValue(newValue)
    }


    return (
        <TGui.TableCell>
            <input
                value={cellValue}
                onChange={(e) => {
                    typing(langMut, e.target.value)
                }}
            />
        </TGui.TableCell>
    )
}

function _THead({avlLangs}: { avlLangs: Set<string> }) {
    return (
        <TGui.TableHead>
            <TGui.TableRow>

                <TGui.TableCell>Key</TGui.TableCell>

                {
                    Array.from(avlLangs.values()).map((value) => {
                        return (<TGui.TableCell key={value}>{value}</TGui.TableCell>)
                    })
                }


            </TGui.TableRow>
        </TGui.TableHead>
    )
}