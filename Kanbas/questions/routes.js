import db from "../Database/index.js";
export default function QuestionRoutes(app) {

    // retrieve all questions associated with the quiz id
    app.get("/api/quizzes/:qid/questions", (req, res) => {
        const { qid } = req.params;
        const questions = db.questions.filter((question) => question.quizId === qid);
        if (!questions) {
            res.status(404).send("Questions not found!");
        }
        res.send(questions);
    });

    // remove a question associated with the quiz id
    app.delete("/api/questions/:questionId", (req, res) => {
        const { questionId } = req.params;
        db.questions = db.questions.filter((question) => question._id !== questionId);
        res.sendStatus(200);
    });

    // add a new question with a unique identifier
    app.post("/api/quizzes/:qid/questions", (req, res) => {
        const { qid } = req.params;
        const question = {...req.body, quizId: qid, _id: new Date().getTime().toString() };
        db.questions.push(question);
        res.send(question);
    });

    // edit/update a question
    app.put("/api/questions/:questionId", (req, res) => {
        const { questionId } = req.params;
        const questionIndex = db.questions.findIndex(
          (question) => question._id === questionId);
        db.questions[questionIndex] = {...db.questions[questionIndex], ...req.body };
        res.send(db.questions[questionIndex]);
    });

}