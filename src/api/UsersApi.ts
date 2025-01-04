import User from "@data/users/User";
import Axios from "@api/AxiosProvider";

export default class UsersApi {

    static USER = new User()


    static async TryLogin(login: string, password: string): Promise<User | null> {

        const formData = new FormData()
        formData.append("login", login)
        formData.append("password", password)
        const response = (await Axios.post("/api/login", formData)).data

        const user = new User()
        user.FromJson(response)

        return user
    }


}