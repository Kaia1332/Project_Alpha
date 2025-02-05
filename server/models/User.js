const db = require('../db/connect');

class User {

    constructor({ user_id, email, password, user_type}) {
        this.user_id = user_id;
        this.email = email;
        this.password = password;
        this.user_type = user_type;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM users WHERE user_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }
    static async getOneByEmail(email) {
        try {
            console.log("Querying for email: ", email);
            const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
            console.log("Database result:", result.rows); // Debugging

            // return result.rows[0]; // Return user object or undefined
            return result.rows.length ? result.rows[0] : null;
        } catch (error) {
            console.error("Database query error:", error);
            throw new Error("Database query failed");
        }
    }
    static async getOneByUsername(email) {
        const response = await db.query("SELECT * FROM users WHERE email = $1;", [email]);
        console.log("response is: " + response.rows.length);

        // if (response.rows.length != 1) {
        //     throw new Error("Unable to locate user.");
        // }
        return new User(response.rows[0]);
    }

    // static async getOneByUsername(username) {
    //     const response = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    //     if (response.rows.length != 1) {
    //         throw new Error("Unable to locate user.");
    //     }
    //     return new User(response.rows[0]);
    // }

    static async create(data) {
        const { user_type, password, email } = data;

        let response = await db.query("INSERT INTO users (email, password, user_type) VALUES ($1, $2, $3) RETURNING user_id;",
            [email, password, user_type]);
            
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }
}

module.exports = User;