"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
class Role {
    constructor(ID, roleName) {
        this.ID = 0;
        this.roleName = "";
        this.ID = ID;
        this.roleName = roleName;
    }
    getID() { return this.ID; }
    getRoleName() { return this.roleName; }
    setRoleName(roleName) { this.roleName = roleName; }
    addToDatabase(modifier) { }
    removeFromDatabase(modifier) { }
    cloneFromDatabase(ID, querier) { }
    updateToDatabase(modifier) { }
}
exports.Role = Role;
