import React from "react";
import {ViewContainer} from "@components/ViewContainer";
import WasmView from "../../WasmEntry";

export default function VtsStatisticsView({}) {
    return (
            <WasmView path={'./wasm/asny/web.js'}/>
    )
}