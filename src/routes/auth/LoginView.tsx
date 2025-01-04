import {Button, Flex, Form, Input} from "antd";
import {LoginFormLayout} from "./LoginFormLayout";
import {TGui} from "@external/tgui";
import ConstantsApi from "@api/ConstantsApi";
import UsersApi from "@api/UsersApi";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import {useActiveUser} from "@hooks/activeUserZus";


export default function LoginView() {

    const onBack: any = null

    const activeUserZus = useActiveUser()


    const lockZus = useGlobalAppLock()

    const [t] = TGui.T()

    async function tryLogin(email: string, password: string) {
        lockZus.lock()
        const user = await UsersApi.TryLogin(email, password)
        activeUserZus.setActiveUser(user)
        lockZus.unlock()
    }

    return (
        <LoginFormLayout background={"/textures/login.jpeg"}>

            <Form
                style={{
                    minWidth: "400px"
                }}
                layout={"vertical"}
                onFinish={async (data) => {
                    tryLogin(data.email, data.password)
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
                    id={"turtle-email"}
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
                        id={"turtle-email"}
                        placeholder={t("email") as any}
                        style={{
                            borderRadius: "15px",
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name={"password"}
                    id={"turtle-password"}
                    required
                    rules={[
                        {
                            required: true
                        }
                    ]}
                >
                    <Input.Password
                        id={"turtle-password"}
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
                    {t("dive.in")}
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