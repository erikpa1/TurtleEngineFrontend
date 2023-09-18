
import React from "react";

export default function WasmView({path}){


    const [lazy, setLazy] = React.useState<any>(null)


    React.useEffect(() => {

        import('./wasm/asny/web.js').then((val : any) => {
            val.default()

        })
    }, [])


    return (
        <div>

            <canvas style={{
                backgroundColor: "red",
                width:"100%",
                height:"100%"
            }}/>

        </div>
    )
}