import dbConnection from '../utils/index.js'
import bcrypt from 'bcrypt'
const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};
class User {
   
    static async create(username,password) {
        const database = await dbConnection();
        const hashedPassword = hashPassword(password);
        const sql = await database.query(
            'INSERT INTO users(user_name, password_hash) VALUES (?,?)',
            [username, hashedPassword]

        );
return sql.rows[0]
        
    }
    static async findAll() {
        const database = await dbConnection();
        const sql = await database.query('SELECT id, user_name FROM users ORDER BY id');
        return XPathResult.rows;
    }
      static async findByUsername(username) {
    const database = await dbConnection();
    const sql = await database.query(
      'SELECT * FROM users WHERE user_name = $1',
      [username]
    );
    return sql.rows[0];
    }
     static async delete(id) {
    const database = await dbConnection();
    const sql = await database.query(
      'DELETE FROM users WHERE id = $1 RETURNING id, user_name',
      [id]
    );
    return sql.rows[0];
    }
      static async checkPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
export default User;
