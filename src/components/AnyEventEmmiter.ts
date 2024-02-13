import React from "react";

class AnyEventEmmiter {

    events = {}


    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(func => func !== listener);
        }
    }

    emit(event, data?) {
        const evnt = this.events[event]
        if (evnt) {
            evnt.forEach(listener => {
                if (data) {
                    listener(data)
                } else {
                    listener()
                }
            });
        }
    }


}

const anyEventEmmiter = new AnyEventEmmiter();

const CONVERTMAP = new Map([
    [46, 'del'],
    [83, 's'],
    [68, 'd'],
    [32, 'space'],
])


export function anyReceiver(evt: KeyboardEvent) {

    const keyCode = evt.keyCode
    const hasCtrl = evt.ctrlKey


    const conversion: string = CONVERTMAP.get(keyCode) ?? ""

    if (conversion !== "") {
        if (hasCtrl) {
            anyEventEmmiter.emit(`keydown-ctrl-${conversion}`, evt)
        } else {
            anyEventEmmiter.emit(`keydown-${conversion}`, evt)
        }
    }
}


export default anyEventEmmiter;

export function useAnyEventEmmiter(key: string, fun: any): [] {


    React.useEffect(() => {
        anyEventEmmiter.on(key, fun)
        return () => {
            anyEventEmmiter.off(key, fun)
        }
    })

    return []
}

console.log("Any event emmiter inited")