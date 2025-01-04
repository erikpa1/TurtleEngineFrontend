import {App} from "antd";
import axios, {AxiosError} from "axios";
import {useEffect} from "react";
import {TGui} from "@external/tgui";
import {useActiveUser} from "@hooks/activeUserZus";

const Axios = axios.create();

const AxiosProvider = ({children}) => {
    const {setActiveUser} = useActiveUser()
    const {message} = App.useApp()
    const [t] = TGui.T()

    useEffect(() => {
        // const requestInterceptor = (config) => {
        //     const token = localStorage.getItem("token");

        //     if (token) {
        //         if (config.headers) {
        //             config.headers["Authorization"] = `Bearer ${token}`;
        //         }
        //     }

        //     return config;
        // };

        const responseInterceptor = (response) => {
            return response;
        };

        const errorInterceptor = (error: AxiosError) => {
            if (error.response && error.response.status === 401) {
                message.error(t("Unauthorized"))

                setActiveUser(null)
            } else {
                message.error({
                    content: `${error.name}: ${error.message}`,
                })
            }

            return Promise.reject();
        };

        // const interceptorRequest =
        //     Axios.interceptors.request.use(requestInterceptor);

        const interceptorResponse = Axios.interceptors.response.use(
            responseInterceptor,
            errorInterceptor
        );

        return () => {
            // Axios.interceptors.request.eject(interceptorRequest);
            Axios.interceptors.response.eject(interceptorResponse);
        };
    }, []);

    return children;
};

export default Axios;
export {AxiosProvider};
