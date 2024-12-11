const express = require('express');

const app = express();

// Request handlers
app.use('/test', (req, res) => {
    console.log(req.url.length);
    res.send('Testing the handler  yes test')
})


app.listen(2350, () => {
    console.log('server is running..!!');
});