"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModifier = void 0;
const Modifier_1 = require("./Modifier");
class RoleModifier extends Modifier_1.Modifier {
    constructor(connection) {
        super(connection);
        this.fields.set("RoleName", 1);
        this.param_size = 1;
        this.addSQL = "INSERT INTO \"Role\" (RoleName) VALUES ($1)";
        this.removeSQL = "DELETE FROM \"Role\" WHERE RoleID = $1";
        this.updateSQL = "UPDATE \"Role\" SET RoleName = $1 WHERE RoleID = $2";
    }
}
exports.RoleModifier = RoleModifier;
