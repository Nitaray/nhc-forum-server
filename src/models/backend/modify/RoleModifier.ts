import {Modifier} from './Modifier';
import * as pg from 'pg';

export class RoleModifier extends Modifier {
    public constructor(connection: pg.Pool) {
        super(connection);

        this.fields.set("\"RoleName\"", 1);

        this.param_size = 1;

        this.addSQL = "INSERT INTO \"Role\" (\"RoleName\") VALUES ($1)";
        this.removeSQL = "DELETE FROM \"Role\" WHERE \"RoleID\" = $1";
        this.updateSQL = "UPDATE \"Role\" SET \"RoleName\" = $1 WHERE \"RoleID\" = $2";
    }
}