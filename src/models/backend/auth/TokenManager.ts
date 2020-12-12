import { AuthUtil } from "./AuthUtil";

export class TokenManager {
    private static timestamps: Array<string> = new Array<string>();
    private static users: Array<string> = new Array<string>();

    public static createNewToken(userID: string): string {
        this.users.push(userID);

        let now = Date.now().toString();
        this.timestamps.push(now);

        return AuthUtil.hashString(userID + now);
    }

    public static checkToken(userID: string, token: string): boolean {
        for (let i = 0; i < this.users.length; ++i) {
            if (userID == this.users[i]) {
                // user logged in, check token
                let original_token = AuthUtil.hashString(userID + this.timestamps[i]);

                console.log(original_token);
                console.log(token);

                if (original_token == token)
                    return true;
                else
                    return false;
            }
        }

        return false; //the control reaches here if user does not exists
    }
}