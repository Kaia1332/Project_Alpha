const db = require('../db/connect');

class UserResponse {
    constructor({ response_id, user_id, score, incorrect_categories }) {
        this.response_id = response_id;
        this.user_id = user_id;
        this.score = score;
        this.incorrect_categories = incorrect_categories
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM user_responses WHERE user_id = $1", [id]);
        if (response.rows.length !== 1) {
            throw new Error("Unable to locate user.");
        }
        return new UserResponse(response.rows[0]);
    }

    static async create(data) {
        console.log('hit user_res_controller');
        const { user_id, score, incorrect_categories } = data;
        
        let response = await db.query(
            "INSERT INTO user_responses (user_id, score,incorrect_categories) VALUES ($1, $2, $3) RETURNING *;",
            [user_id, score, incorrect_categories]
        );

        const newUserResponse = response.rows[0];
        return new UserResponse(newUserResponse);
    }
}

module.exports = UserResponse;
