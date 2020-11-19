const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 1818;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
  useNewUrlParser: true, useUnifiedTopology: true,
  useCreateIndex: true, useFindAndModify: false
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

/*
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
*/

const articleTestRouter = require('./routes/articleTestSheets');
const todaysTestRouter = require('./routes/todaysTestSheets');
app.use('/articleTest', articleTestRouter);
app.use('/todaysTest', todaysTestRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});