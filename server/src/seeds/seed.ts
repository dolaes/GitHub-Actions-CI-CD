import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";
import fs from 'fs';
import path from 'path';

// Read the JSON file
const pythonQuestions = JSON.parse(fs.readFileSync(path.resolve('/pythonQuestions.json'), 'utf-8'));

db.once('open', async () => {
  await cleanDB('Question', 'questions');
  await Question.insertMany(pythonQuestions);
  console.log('Questions seeded!');
  process.exit(0);
});