import React from "react";
import {Button, Card, Flex, Layout} from "antd";
import {Spinner} from "react-bootstrap";


interface LogoutLayoutProps {
    children?: React.ReactNode
    background?: string | null
    logo?: string
}

export function LoginFormLayout({children, background = null}: LogoutLayoutProps) {
    const [load, setLoad] = React.useState(true)

    React.useEffect(() => {
        if (background) {
            setLoad(true)

            const img = new Image();
            img.src = background;
            img.onload = () => {
                setLoad(false);
            };

        } else {
            setLoad(false);
        }
    }, [background])

    if (load) {
        return (
            <Layout
                style={{
                    height: "100vh", // Full viewport height
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Spinner/> {/* Show a loading spinner while background is loading */}
            </Layout>
        );
    }

    return (
        <Layout
            style={{
                height: "100vh", // Full viewport height
            }}
        >
            {background && <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${background})`, // Replace with your image URL
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    filter: "blur(2px)",
                    zIndex: 0, // Ensures it stays behind other content
                }}
            />}

            <Layout.Header
                style={{
                    background: "none",
                    paddingLeft: "10px",
                    paddingTop: "40px",
                    height: "100px",
                    zIndex: 1,
                }}
            >

            </Layout.Header>
            <Layout.Content
                style={{
                    zIndex: 1
                }}
            >
                <Flex
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    align={"center"}
                    justify={"center"}
                >
                    <Flex
                        style={{
                            minWidth: "400px",
                            padding: "30px",
                            borderRadius: "15px",
                            background: "rgb(245, 245, 245, 0.8)",
                        }}
                        vertical
                    >
                        {children}

                    </Flex>
                </Flex>
            </Layout.Content>
            <Layout.Footer>

                <Flex
                    align={"center"}
                    justify={"center"}
                    vertical
                >
                    {/* <img
                            style={{
                                maxWidth: "650px",
                                width: "100%",
                                height: "auto",
                            }}
                            src={"/loga_npo.png"}
                        /> */}

                    <Button
                        type="text"
                        style={{
                            width: "90px",
                            border: "none"
                        }}
                        onClick={() => {
                            window.open("https://www.google.sk", "_blank")
                        }}
                        icon={
                            <img
                                style={{
                                    width: "40px",
                                    height: "40px",
                                }}
                                src={"/icons/Create.Mesh.svg"}
                            />
                        }
                    >
                    </Button>
                </Flex>

            </Layout.Footer>
        </Layout>

    )
}