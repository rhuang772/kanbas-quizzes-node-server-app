import db from "../Database/index.js";
function QuizRoutes(app) {
  app.delete("/api/quizzes/:mid", (req, res) => {
    const { mid } = req.params;
    db.quizzes = db.quizzes.filter((m) => m._id !== mid);
    res.sendStatus(200);
  });

  app.post("/api/courses/:cid/quizzes", (req, res) => {
    const { cid } = req.params;
    const newQuiz = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.quiz.push(newQuiz);
    res.send(newQuiz); 
  });

  app.get("/api/courses/:cid/quizzes", (req, res) => {
    const { cid } = req.params;
    const quizzes = db.quizzes.filter((m) => m.course === cid);
    res.send(quizzes);
  });

  app.put("/api/quizzes/:mid", (req, res) => {
    const { mid } = req.params;
    const quizIndex = db.quizzes.findIndex(
      (m) => m._id === mid);
    db.quizzes[quizIndex] = {
      ...db.quizzes[quizIndex],
      ...req.body
    };
    res.sendStatus(204);
  });

}
export default QuizRoutes;
