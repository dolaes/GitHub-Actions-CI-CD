import fs from 'fs/promises';
import path from 'path';
import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";

// Calculate the absolute path relative to this script's directory
const jsonFilePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'pythonQuestions.json');

(async () => {
  const data = await fs.readFile(jsonFilePath, 'utf-8');
  const pythonQuestions = JSON.parse(data);

  db.once('open', async () => {
    await cleanDB('Question', 'questions');
    await Question.insertMany(pythonQuestions);
    console.log('Questions seeded!');
    process.exit(0);
  });
})();