import User from "@data/users/User";

export default class UsersApi {

    static USER = new User()


    static async TryLogin(login: string, password: string): Promise<User>{

        return new User()
    }



}