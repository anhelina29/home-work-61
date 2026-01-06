const express = require('express');
const session = require('express-session');
const indexRouter = require('./api/index.router');
const app = express();
const logMiddleware = require('./api/middleware');
const users = require('./api/users/users.ctrl');
const products = require('./api/products/products.ctrl');
const path = require('path');

const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware)
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));
app.use('/api', indexRouter)
app.set('views', path.join(__dirname, 'views'));

// pug
app.engine('pug', require('pug').__express);


app.get('/users', (req, res) => {
    const data = {
        title: 'Users',
        users: users.users
    }
    res.render('users.pug', data);
})

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.users.find(user => user.id.toString() === userId.toString());
    const data = {
        title: 'Users',
        user: user
    }
    res.render('users.pug', data);
})

// ejs
app.engine('ejs', require('ejs').__express);

app.get('/products', (req, res) => {
    const data = {
        title: 'Products',
        product: null,
        products: products.products
    }
    res.render('products.ejs', data);
})

app.get('/products/:id', (req, res) => {
    const productId = req.params.id
    const product = products.products.find(product => product.id.toString() === productId.toString());
    const data = {
        title: 'Products',
        product: product
    }
    res.render('products.ejs', data);
})

app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
})


app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})