import React from "react"
import { useTranslation } from "react-i18next"
import skSk from "antd/locale/sk_SK"
import csCz from "antd/locale/cs_CZ"
import enEn from "antd/locale/en_US"

import { App as AntdApp, ConfigProvider, ThemeConfig } from "antd"
import ConstantsApi from "@api/ConstantsApi";

export default function AntdConfig({ children }) {
    const [t, tInstance] = useTranslation()

    const antdLocale = React.useMemo(() => {
        const language = tInstance.language
        if (language == "sk") {
            return skSk
        } else if (language == "cs") {
            return csCz
        } else {
            return enEn
        }
    }, [tInstance.language])

    const configProviderTheme: ThemeConfig = {
        token: {
            colorPrimary: ConstantsApi.COLOR_MAIN,
            borderRadius: 15,
        },
        components: {
            Progress: {
                defaultColor: "red",
                circleTextColor: "white",
            },
            Modal: {
                colorPrimary: ConstantsApi.COLOR_MAIN,
            },
            Form: {
                labelColor: "black",
                itemMarginBottom: 14,
            },
            Button: {
                defaultBorderColor:  ConstantsApi.COLOR_SECONDARY,
                colorPrimary:  ConstantsApi.COLOR_MAIN,
            },
            Input: {
                fontSize: 14,
            },
            Select: {
                fontSize: 14,
            },
        },
    }

    return (
        <ConfigProvider locale={antdLocale} theme={configProviderTheme}>
            <AntdApp>{children}</AntdApp>
        </ConfigProvider>
    )
}
