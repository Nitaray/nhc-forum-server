import {Modifier} from '../modify/Modifier';
import {Querier} from '../query/Querier';
import {ThreadQuerier} from '../query/ThreadQuerier';
import {ForumRelation} from './ForumRelation';
import {StringValuePair} from '../../types/StringValuePair';
import {DatabaseConnectionManager} from '../database/DatabaseConnectionManager';

export class Thread implements ForumRelation {
    private ID: number = 0;
    private creatorID: number = 0;
    private dateCreated: Date = null;
    private title: string = "";
    private content: string = "";

    constructor(creatorID: number, title: string, content: string, ID?: number, dateCreated?: Date) {
        if (ID) this.ID = ID;
        else this.ID = null;

        this.creatorID = creatorID;
        
        if (dateCreated) this.dateCreated = dateCreated;
        else this.dateCreated = new Date(Date.now());

        this.title = title;
        this.content = content;
    }

    public getID(): number { return this.ID; }

    public getCreatorID(): number { return this.creatorID; }
    
    public getTitle(): string { return this.title; }

    public setTitle(title: string): void { this.title = title; }

    public getDateCreated(): Date { return this.dateCreated; }

    public getContent(): string { return this.content; }

    public setContent(content: string): void { this.content = content; }

    public addToDatabase(modifier: Modifier): void {
        let values: Array<StringValuePair> = [
            {key: "\"CreatorID\"", value: this.creatorID},
            {key: "\"DateCreated\"", value: this.dateCreated},
            {key: "\"ThreadTitle\"", value: this.title},
            {key: "\"Content\"", value: this.content}
        ];

        modifier.add(values);
        this.ID = (new ThreadQuerier(DatabaseConnectionManager.getConnection()))
                    .getThreadIDByUserIDAndTime(this.creatorID, this.dateCreated);
    }

    public removeFromDatabase(modifier: Modifier): void {}

    public cloneFromDatabase(ID: number, querier: Querier): void {}

    public updateToDatabase(modifier: Modifier): void {
        let values: Array<StringValuePair> = [
            {key: "\"CreatorID\"", value: this.creatorID},
            {key: "\"DateCreated\"", value: this.dateCreated},
            {key: "\"ThreadTitle\"", value: this.title},
            {key: "\"Content\"", value: this.content}
        ];

        modifier.update(this.ID, values);
    }
}