import React from "react";
import {useTranslation} from "react-i18next";


interface ErrorBoundaryProps {
    children: any
    onError: any
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, any> {
    constructor(props) {
        super(props);
        this.state = {error: ""};
    }

    componentDidCatch(error) {
        this.setState({error: `${error.name}: ${error.message}`});
    }

    render(): any {
        const {error} = this.state as any;

        if (error) {
            if (this.props.onError) {
                return this.props.onError
            } else {
                return (
                    <_ErrorView/>
                );
            }


        } else {
            return <>{this.props.children}</>;
        }
    }
}

function _ErrorView({error = ""}): any {

    const [t] = useTranslation()

    const [isClosed, setIsClosed] = React.useState(false)


    if (isClosed) {
        return <></>
    } else {
        return (
            <div style={{
                position: "fixed",
                left: "0px",
                right: "0px",
                width: "100%",
                height: "100%",
                background: "#272730",
            }}>
                <div style={{
                    color: "white",
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%)"
                }}>
                    <div className={"vstack gap-3"}>
                        Opps, something went wrong, restart the app
                        <div style={{margin: "auto"}}>
                            <button
                                className={"btn btn-secondary"}
                                onClick={() => {
                                    setIsClosed(true)
                                }}
                            >
                                {t("continue")}
                            </button>
                        </div>
                    </div>
                </div>
                {error}
            </div>
        )
    }


}