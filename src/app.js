const express = require('express');

const app = express();

// Request handlers
// app.get('/user/:userId/:name/:password', (req, res) => {
//     // console.log(req.query );
//     console.log(req.params);
//     res.send('Yesss')
// })

app.use('/user', (req, res, next) => {
    console.log('Handling the route user!');
    // res.send('1st response');
    
    // res.send('1st respo nse');
    next();
},
    (req, res, next) => {
        console.log('Handling the route user 2'); 
        // res.send('2nd response')
        next();
    },
    (req, res) => {
        console.log('Handling the 3rd response!');
        res.send('3r d response');
        // next();
    },
);

app.listen(2350, () => {
    console.log('server is running..!!');
});