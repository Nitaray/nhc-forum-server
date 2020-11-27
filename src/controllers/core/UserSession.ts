export class UserSession {
    private static userID: number = 0;
    private static username: string = "";
    private static userRoleID: number = 0;
    private static loggedIn: boolean = false;

    public static getUserID(): number {
        return this.userID;
    }

    public static setUserID(userID: number): void {
        UserSession.userID = userID;
    }

    public static getUsername(): string {
        return this.username;
    }

    public static setUsername(username: string): void {
        UserSession.username = username;
    }

    public static getUserRoleID(): number {
        return this.userRoleID;
    }

    public static setUserRoleID(userRoleID: number): void {
        UserSession.userRoleID = userRoleID;
    }

    public static isLoggedIn(): boolean {
        return this.loggedIn;
    }

    public static setLoggedIn(loggedIn: boolean): void {
        UserSession.loggedIn = loggedIn;
    }

    public static reset(): void {
        this.userID = 0;
        this.username = "";
        this.userRoleID = 0;
        this.loggedIn = false;
    }
}
