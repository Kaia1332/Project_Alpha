const db = require('../db/connect');

class UserResponse {
    constructor({response_id,user_id,score}){
        this.response_id= response_id,
        this.user_id= user_id,
        this.score = score
    }
    static async getOneById(id) {
        const response = await db.query("SELECT * FROM user_responses WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new UserResponse(response.rows[0]);
    }
    static async create(data) {
        const { user_id, score } = data;
        let response = await db.query("INSERT INTO user_account (user_id, score) VALUES ($1, $2);",[user_id,score]);
        const newScore = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }
}