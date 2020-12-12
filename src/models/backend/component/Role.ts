import {Modifier} from '../modify/Modifier';
import {Querier} from '../query/Querier';
import {ForumRelation} from './ForumRelation';

export class Role implements ForumRelation {
    private ID: number = 0;
    private roleName: string = "";

    constructor(ID: number, roleName: string) {
        this.ID = ID;
        this.roleName = roleName;
    }

    public getID(): number { return this.ID; }

    public getRoleName(): string { return this.roleName; }

    public setRoleName(roleName: string): void { this.roleName = roleName; }

    public addToDatabase(modifier: Modifier): void {}

    public removeFromDatabase(modifier: Modifier): void {}

    public cloneFromDatabase(ID: number, querier: Querier): void {}

    public updateToDatabase(modifier: Modifier): void {}
}