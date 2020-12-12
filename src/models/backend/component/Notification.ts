import {Modifier} from '../modify/Modifier';
import {Querier} from '../query/Querier';
import {ForumRelation} from './ForumRelation';

export class Notification implements ForumRelation {
    private ID: number = 0;
    private dateSent: Date = null;
    private content: string = "";

    constructor(ID: number, dateSent: Date, content: string) {
        this.ID = ID;
        this.dateSent = dateSent;
        this.content = content;
    }

    public getID(): number { return this.ID; }

    public getDateSent(): Date { return this.dateSent; }

    public getContent(): string { return this.content; }

    public setContent(content: string): void { this.content = content; }

    public addToDatabase(modifier: Modifier): void {}

    public removeFromDatabase(modifier: Modifier): void {}

    public cloneFromDatabase(ID: number, querier: Querier): void {}

    public updateToDatabase(modifier: Modifier): void {}
}