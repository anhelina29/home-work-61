const express = require('express');
const session = require('express-session');
const indexRouter = require('./api/index.router');
const app = express();
const logMiddleware = require('./api/middleware');

const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware)
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));
app.use('/api', indexRouter)



app.get('/', (req, res) => {
    res.send('Welcome to the server!');
})

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})