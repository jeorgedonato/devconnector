//Calling Express and db config
const express = require('express');
const connectDB = require('./config/db');
const path = require('path')

const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('API Running'));

//Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

//Serve Static Assests in production
if (process.env.NODE_ENV == 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//End Routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
