/*
Copied from:
https://github.com/erikpa1/InfinityTwinMobile/tree/main
 */

import React from "react"
import {useTranslation} from "react-i18next"


import {Divider, Flex, Typography} from "antd"


interface ErrorBoundaryProps {
    children: any
    onError?: any
    onErrorCustom?: any
}

export default class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    any
> {
    constructor(props) {
        super(props)
        this.state = {error: ""}
    }

    componentDidCatch(error) {
        this.setState({error: `${error.name}: ${error.message}`})
    }

    render(): any {
        const {error} = this.state as any

        if (error) {
            if (this.props.onError) {
                return this.props.onError
            } else if (this.props.onErrorCustom) {
                return React.createElement(this.props.onErrorCustom, {
                    error: error,
                })
            } else {
                return <_ErrorView error={error}/>
            }
        } else {
            return <>{this.props.children}</>
        }
    }
}

function _ErrorView({error = ""}): any {
    const [t] = useTranslation()
    const {Text} = Typography
    const [isClosed, setIsClosed] = React.useState(false)

    const [errorType, errorText] = error.toString().split(":") || [
        "Error",
        error.toString(),
    ]
    const styles: {
        [key: string]: React.CSSProperties
    } = {
        FirstLevel: {
            position: "fixed",
            left: "0px",
            right: "0px",
            width: "100vw",
            height: "100vh",
            background: "white",
            padding: "8vh 12vw 4vh 12vw",
        },
        SecondLevel1Row: {height: "50%"},
        SecondLevel2Row: {
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "top",
        },
        imgOuter: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
        },
        img: {
            objectFit: "scale-down",
        },
        shadBox: {
            height: "100%",
            marginTop: "4vh",
            backgroundColor: "transparent",
            boxShadow: "none",
        },
        ErrorPlace: {
            width: "85%",
            height: "100%",
        },
        ErrorType: {
            fontWeight: "900",
            fontSize: "16px",
            marginBottom: "4px",
            cursor: "default",
        },
        ErrorText: {
            fontFamily: "system-ui",
            margin: 0,
            fontWeight: "1000",
            textAlign: "center",
        },
        MainButton: {
            borderRadius: "6px",
            backgroundColor: "#e1636b",
            fontWeight: "1000",
            padding: "20px 28px",
            width: "100%",
        },
        Divider: {
            borderBlockStart: "2px",
            borderColor: "#d5d5d5",
            margin: "0px",
            padding: "0px",
        },
        ResetButton: {
            padding: "6px",
            height: "20px",
            borderRadius: "4px",
        },
        ResetButtonText: {cursor: "pointer"},
        OR: {
            fontSize: "13px",
            cursor: "default",
        },
        OuterButtons: {
            marginTop: "4%",
        },
        OuterDivider: {
            padding: "8px",
            paddingBottom: "0px",
        },
    }
    if (isClosed) {
        return <></>
    } else {
        return (
            <div style={styles.FirstLevel}>
                <div style={styles.SecondLevel1Row}>
                    <div style={styles.imgOuter}>
                        <img
                            src={"/textures/error_screen.png"}
                            height={"85%"}
                            width={"85%"}
                            style={styles.img}
                        />
                    </div>
                </div>
                <div style={styles.SecondLevel2Row}>
                    <div style={styles.ErrorPlace}>
                        <Flex
                            gap={1}
                            align="center"
                            justify="center"
                            vertical={true}
                            wrap={false}
                        >
                            <Text disabled style={styles.ErrorType}>
                                {errorType}:
                            </Text>

                            <Typography.Title
                                level={4}
                                style={styles.ErrorText}
                            >
                                {errorText}
                            </Typography.Title>


                        </Flex>

                    </div>
                </div>
            </div>
        )
    }
}

export function CompactErrorView({error = ""}): any {
    const [t] = useTranslation()

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                background: "#272730",
            }}
        >
            <div
                style={{
                    color: "white",
                }}
            >
                <div
                    className={"vstack gap-3"}
                    style={{
                        textAlign: "center",
                    }}
                >
                    Opps, something went wrong, restart the app
                    <div style={{color: "red"}}>{error}</div>
                </div>
            </div>
        </div>
    )
}
