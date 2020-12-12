import {Modifier} from '../modify/Modifier';
import {Querier} from '../query/Querier';
import {ForumRelation} from './ForumRelation';

export class Comment implements ForumRelation {
    private ID: number = 0;
    private creatorID: number = 0;
    private threadID: number = 0;
    private dateCreated: Date = null;
    private content: string = "";

    constructor(ID: number, creatorID: number, dateCreated: Date, threadID: number, content: string) {
        this.ID = ID;
        this.creatorID = creatorID;
        this.dateCreated = dateCreated;
        this.threadID = threadID;
        this.content = content;
    }

    public getID(): number { return this.ID; }

    public getCreatorID(): number { return this.creatorID; }
    
    public setCreatorID(creatorID: number): void { this.creatorID = creatorID; }

    public getThreadID(): number { return this.threadID; }

    public setThreadID(threadID: number): void { this.threadID = threadID; }

    public getDateCreated(): Date { return this.dateCreated; }

    public setDateCreated(dateCreated: Date): void { this.dateCreated = dateCreated; }

    public getContent(): string { return this.content; }

    public setContent(content: string): void { this.content = content; }

    public addToDatabase(modifier: Modifier): void {}

    public removeFromDatabase(modifier: Modifier): void {}

    public cloneFromDatabase(ID: number, querier: Querier): void {}

    public updateToDatabase(modifier: Modifier): void {}
}