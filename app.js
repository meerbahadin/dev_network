const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');
const path = require('path');


const app = express();
connectDb();

//cors
app.use(cors());

//body parse
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.send('API Running');
});


//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('App listening on port 5000');
});
