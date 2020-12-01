"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thread = void 0;
const ThreadQuerier_1 = require("../query/ThreadQuerier");
const DatabaseConnectionManager_1 = require("../../../controllers/core/DatabaseConnectionManager");
class Thread {
    constructor(creatorID, title, content, ID, dateCreated) {
        this.ID = 0;
        this.creatorID = 0;
        this.dateCreated = null;
        this.title = "";
        this.content = "";
        if (ID)
            this.ID = ID;
        else
            this.ID = null;
        this.creatorID = creatorID;
        if (dateCreated)
            this.dateCreated = dateCreated;
        else
            this.dateCreated = new Date(Date.now());
        this.title = title;
        this.content = content;
    }
    getID() { return this.ID; }
    getCreatorID() { return this.creatorID; }
    getTitle() { return this.title; }
    setTitle(title) { this.title = title; }
    getDateCreated() { return this.dateCreated; }
    getContent() { return this.content; }
    setContent(content) { this.content = content; }
    addToDatabase(modifier) {
        let values = [
            { key: "CreatorID", value: this.creatorID },
            { key: "DateCreated", value: this.dateCreated },
            { key: "ThreadTitle", value: this.title },
            { key: "Content", value: this.content }
        ];
        modifier.add(values);
        this.ID = (new ThreadQuerier_1.ThreadQuerier(DatabaseConnectionManager_1.DatabaseConnectionManager.getConnection()))
            .getThreadIDByUserIDAndTime(this.creatorID, this.dateCreated);
    }
    removeFromDatabase(modifier) { }
    cloneFromDatabase(ID, querier) { }
    updateToDatabase(modifier) {
        let values = [
            { key: "CreatorID", value: this.creatorID },
            { key: "DateCreated", value: this.dateCreated },
            { key: "ThreadTitle", value: this.title },
            { key: "Content", value: this.content }
        ];
        modifier.update(this.ID, values);
    }
}
exports.Thread = Thread;
