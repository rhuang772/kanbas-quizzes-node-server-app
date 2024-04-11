import db from "../Database/index.js";
export default function QuizRoutes(app) {

    // retrieve all quizzes associated with a specific course id
    app.get("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const quizzes = db.quizzes.find((q) => q.course === cid);
        if (!quizzes) {
            res.status(404).send("Quizzes not found!");
        }
        res.send(quizzes);
    });

    // remove a quiz 
    app.delete("/api/quizzes/delete/:qid", (req, res) => {
        const { qid } = req.params;
        db.quizzes = db.quizzes.filter((q) => q._id !== qid);
        res.sendStatus(204);
    });

    // add a new quiz to the db with a unique identifier
    app.post("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const quiz = { ...req.body, course: cid, _id: new Date().getTime().toString() };
        db.quizzes.push(quiz);
        res.sendStatus(204);
    });

    // edit a quiz
    app.put("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        const quizIndex = db.quizzes.findIndex(
            (q) => q._id === qid);
        db.quizzes[quizIndex] = {
            ...db.quizzes[quizIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

    // publish a quiz by setting its published status to true
    app.put("/api/quizzes/publish/:qid", (req, res) => {
        const { qid } = req.params;
        const quizIndex = db.quizzes.findIndex(
            (q) => q._id === qid);
        db.quizzes[quizIndex].published = !db.quizzes[quizIndex].published;
        res.send(db.quizzes[quizIndex].published);
    }) 
}