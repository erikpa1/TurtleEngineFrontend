import {Button, Flex, Form, Input} from "antd";
import {LoginFormLayout} from "./LoginFormLayout";
import {TGui} from "@external/tgui";
import ConstantsApi from "@api/ConstantsApi";


export default function LoginView() {

    const onBack: any = null

    const [t] = TGui.T()

    return (
        <LoginFormLayout background={"/textures/login.jpeg"}>

            <Form
                style={{
                    minWidth: "400px"
                }}
                layout={"vertical"}
                onFinish={async (data) => {


                }}
            >
                {/* <Flex align={"center"} justify={"center"}>
                    <img src={Icons.infinity_twin_logo} style={{
                        width: "100px",
                        height: "100px"
                    }} />
                </Flex> */}

                <Flex
                    align="center"
                    justify="center"
                    style={{
                        fontWeight: "bold",
                        fontSize: "32px",
                        color: ConstantsApi.COLOR_MAIN
                    }}
                >
                    {t("login")}
                </Flex>

                <Form.Item
                    name={"email"}
                    style={{
                        padding: "30px 0 0 0"
                    }}
                    rules={[
                        {
                            required: true,
                            type: "email"
                        }
                    ]}
                >
                    <Input
                        placeholder={t("email") as any}
                        style={{
                            borderRadius: "15px",
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name={"password"}
                    required
                    rules={[
                        {
                            required: true
                        }
                    ]}
                >
                    <Input.Password
                        placeholder={t("password") as any}
                        style={{
                            borderRadius: "15px",
                        }}
                    />
                </Form.Item>

                <Button
                    type="primary"
                    style={{
                        width: "100%"
                    }}
                    htmlType={"submit"}
                >
                    {t("log.in")}
                </Button>

                {onBack && <Flex
                    style={{
                        paddingTop: "20px"
                    }}
                >
                    <Button
                        type="text"
                        shape={"round"}
                        style={{
                            width: "100%",
                            color: "black",
                            textDecoration: "underline"
                        }}
                        onClick={() => {
                            onBack && onBack()
                        }}
                    >
                        {t("back")}
                    </Button>
                </Flex>}

            </Form>
        </LoginFormLayout>
    )


}