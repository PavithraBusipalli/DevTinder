const express = require('express');

const app = express();

app.get('/getUserData', (req, res, next) => {
    throw new Error('something went wrong');
    res.send('User data sending..!');
});

app.use('/', (err, req, res, next) => {
    if(err) {
        // console.log(err);
        res.status(500).send('Something went wrong!!');
    }
})

app.listen(3000, () => console.log('Server is listening to the port: 3000..!'));