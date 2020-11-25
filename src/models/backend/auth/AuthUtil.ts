import * as crypto from 'crypto';

export class AuthUtil {
    public static hashString(str: string):string {
        var hashedString: string = crypto.createHash('sha256').update(str).digest('hex');
        return hashedString;
    }
}