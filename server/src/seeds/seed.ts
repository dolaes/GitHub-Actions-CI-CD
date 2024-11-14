import fs from 'fs/promises';
import path from 'path';
import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";

(async () => {
  // Read and parse JSON data
  const jsonFilePath = path.resolve('server', 'seeds', 'pythonQuestions.json');
  const data = await fs.readFile(jsonFilePath, 'utf-8');
  const pythonQuestions = JSON.parse(data);

  db.once('open', async () => {
    await cleanDB('Question', 'questions');
    await Question.insertMany(pythonQuestions);
    console.log('Questions seeded!');
    process.exit(0);
  });
})();