import {Modifier} from '../modify/Modifier';
import {Querier} from '../query/Querier';

export interface ForumRelation {
    addToDatabase(modifier: Modifier): void;
    removeFromDatabase(modifier: Modifier): void;
    cloneFromDatabase(ID: number, querier: Querier): void;
    updateToDatabase(modifier: Modifier): void;
}