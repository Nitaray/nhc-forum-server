import { timeStamp } from "console";
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

                console.log(token + "\n" + original_token);

                if (original_token == token)
                    return true;
            }
        }

        return false; //the control reaches here if user have not logged
    }

    public static deleteUserTokenOfID(userID: string, userToken: string): boolean {
        let idx = -1;
        for (let i = 0; i < this.users.length; ++i) {
            if (this.users[i] == userID) {
                let token = AuthUtil.hashString(userID + this.timestamps[i]);
                if (token == userToken) {
                    idx = i;
                    break;
                }
            }
        }

        console.log(idx);

        if (idx > -1) {
            this.users = this.users.slice(idx, 1);
            this.timestamps = this.timestamps.slice(idx, 1);
            return true;
        }
        return false;
    }
}