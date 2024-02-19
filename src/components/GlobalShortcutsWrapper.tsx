import ProjectApi from "@api/project/ProjectApi";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import React from "react";
import anyEventEmmiter, {Shortcuts} from "@components/AnyEventEmmiter";

export default function GlobalShortcutsWrapper({children}) {


    const locker = useGlobalAppLock()

    async function save(e) {
        e.preventDefault()
        locker.lock()
        await ProjectApi.SaveProject()

        console.log("Saving project")

        setTimeout(() => {
            locker.unlock()
        }, 1000)

    }

    async function testShortcut() {
        locker.lock()

        locker.unlock()

    }

    React.useEffect(() => {
        anyEventEmmiter.on(Shortcuts.Ctrl("s"), save)
        anyEventEmmiter.on(Shortcuts.Ctrl("d"), testShortcut)
        return () => {
            anyEventEmmiter.off(Shortcuts.Ctrl("s"), save)
            anyEventEmmiter.off(Shortcuts.Ctrl("d"), testShortcut)
        }

    }, [])

    return (
        children
    )
}