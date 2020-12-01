"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
class Comment {
    constructor(ID, creatorID, dateCreated, threadID, content) {
        this.ID = 0;
        this.creatorID = 0;
        this.threadID = 0;
        this.dateCreated = null;
        this.content = "";
        this.ID = ID;
        this.creatorID = creatorID;
        this.dateCreated = dateCreated;
        this.threadID = threadID;
        this.content = content;
    }
    getID() { return this.ID; }
    getCreatorID() { return this.creatorID; }
    setCreatorID(creatorID) { this.creatorID = creatorID; }
    getThreadID() { return this.threadID; }
    setThreadID(threadID) { this.threadID = threadID; }
    getDateCreated() { return this.dateCreated; }
    setDateCreated(dateCreated) { this.dateCreated = dateCreated; }
    getContent() { return this.content; }
    setContent(content) { this.content = content; }
    addToDatabase(modifier) { }
    removeFromDatabase(modifier) { }
    cloneFromDatabase(ID, querier) { }
    updateToDatabase(modifier) { }
}
exports.Comment = Comment;
