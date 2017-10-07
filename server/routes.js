let transactionController = require("../server/controllers/transactionController");
let userController = require("../server/controllers/userController");

module.exports = function(app, passport) {

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
       res.render('index.ejs');
    });


    app.get('/getTransactions', async function (req, res) {

        console.log(req.isAuthenticated());

        let transactions = await transactionController.findAll();
        res.json({results: transactions});

    });

    app.get('/fetchLatest', async function (req, res) {

        //console.log(req.isAuthenticated());
        let transactions = await transactionController.fetchLastTransaction();
        res.json({results: transactions});

    });

    app.get('/getTransactionsFromBank', async function (req, res) {

        let noOfDays = 30;
        let transactions = await transactionController.fetchAndInsert(noOfDays);
        res.json({results: transactions});

    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    // process the login form
    app.post('/login', passport.authenticate('local-login'), async function (req, res) {

        console.log("I am logged in");
        console.log(req.body);
        res.send({message : "Success"})

    });


    // process the signup form
    app.post('/signup', async function (req, res) {

        console.log(req.body);

        let insertResult = await userController.insertUser(req.body);

        console.log("I am signed in");
        console.log(req.body);
        res.send({message : "Success"})

    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
