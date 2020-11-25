import {Modifier} from './Modifier';
import * as mysql from 'mysql';

export class RoleModifier extends Modifier {
    public constructor(connection: mysql.Connection) {
        super(connection);

        this.fields.set("RoleName", 1);

        this.param_size = 1;

        this.addSQL = "INSERT INTO \"Role\" (RoleName) VALUES (?)";
        this.removeSQL = "DELETE FROM \"Role\" WHERE RoleID = ?";
        this.updateSQL = "UPDATE \"Role\" SET RoleName = ? WHERE RoleID = ?";
    }
}