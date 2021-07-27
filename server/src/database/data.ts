import { Pool, QueryArrayConfig } from 'pg';

const pool = new Pool();

const queryObject  = {
    query: (text?: any , params?: any) => pool.query(text, params),
}
export default queryObject;