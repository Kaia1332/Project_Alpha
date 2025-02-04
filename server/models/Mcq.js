const db = require("../db/connect")

class Mcq {
    constructor({question_id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty_level, category}) {
        this.question_id = question_id;
        this.question = question;
        this.option_a = option_a;
        this.option_b = option_b;
        this.option_c = option_c;
        this.option_d = option_d;
        this.correct_answer = correct_answer;
        this.difficulty_level = difficulty_level;
        this.category = category;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM mcq;")
        console.log("DB Query Result:", response.rows);
        if(response.rows.length === 0){
            throw new Error("No questions available")
        }
        // const mcqInstances = response.rows.map(question => new Mcq(question));

        // console.log("Mapped Mcq Instasnces:", mcqInstances); 
        // return mcqInstances;
        return response.rows.map(question => new Mcq(question))
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM mcq WHERE question_id = $1;", [id])
        if(response.rows.length != 1){
            throw new Error("Unable to locate question")
        }
        return new Mcq(response.rows[0])
    }

    // static async create(data) {
    // }

    // async update(data) {

    // }

    // async destroy() {
    // }
}

module.exports = Mcq