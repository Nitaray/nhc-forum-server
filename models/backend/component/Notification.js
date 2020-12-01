"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
class Notification {
    constructor(ID, dateSent, content) {
        this.ID = 0;
        this.dateSent = null;
        this.content = "";
        this.ID = ID;
        this.dateSent = dateSent;
        this.content = content;
    }
    getID() { return this.ID; }
    getDateSent() { return this.dateSent; }
    getContent() { return this.content; }
    setContent(content) { this.content = content; }
    addToDatabase(modifier) { }
    removeFromDatabase(modifier) { }
    cloneFromDatabase(ID, querier) { }
    updateToDatabase(modifier) { }
}
exports.Notification = Notification;
