import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";

(async () => {
  // Dynamically import the JSON data
  const { default: pythonQuestions } = await import('./pythonQuestions.json');

  db.once('open', async () => {
    await cleanDB('Question', 'questions');
    await Question.insertMany(pythonQuestions);
    console.log('Questions seeded!');
    process.exit(0);
  });
})();
