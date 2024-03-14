import React from "react"
import "./rc-dock.css"
import {DockLayout} from "rc-dock"


export interface DockingTab {
    content: any
    closable?: boolean,
    title?: string | any
    id: string
}


export interface DockingSplit {
    size: number
    tabs: Array<DockingTab>
}


interface Docking_WorldViewProps {
    headings: Array<DockingTab>
    tabulators: Array<DockingSplit>
}

export function TabScrollWrapperNoMargins({children}) {
    return (
        <div style={{
            overflow: "auto",
            maxHeight: "100%",
            scrollbarWidth: "thin",
        }}>
            {React.Children.toArray(children)}
        </div>
    )
}

export function TabScrollWrapper({children}) {
    return (
        <div style={{
            margin: "15px",
            paddingBottom: "50px",
            overflow: "auto",
            maxHeight: "100%",
            scrollbarWidth: "thin"
        }}>
            {React.Children.toArray(children)}
        </div>
    )
}


export const Docking_WorldView = React.forwardRef(({headings, tabulators}: Docking_WorldViewProps, ref) => {

    const layoutRef = React.useRef<any>()

    const groups = {
        card: {
            floatable: false,
        }
    }


    for (const tab of tabulators) {
        tab["group"] = "card"
    }

    const layout = {
        dockbox: {
            mode: 'vertical',
            children: [
                {
                    size: 25,
                    tabs: headings,
                    group: "card",
                },
                {
                    mode: 'horizontal',
                    children: tabulators
                }
            ]
        }
    }

    function addTab(tab: DockingTab) {
        const dockLayout = layoutRef.current
        const panelData = dockLayout.find("tab1")
        console.log(panelData)
        layoutRef.current.dockMove(tab, panelData, "middle");
    }

    React.useImperativeHandle(ref, () => (
        {
            addTab
        }
    ))

    return (
        <DockLayout
            ref={layoutRef}
            defaultLayout={layout as any}
            style={{
                position: "absolute",
                left: 52,
                top: 0,
                right: 0,
                bottom: 0,
            }}
        />
    )


})

