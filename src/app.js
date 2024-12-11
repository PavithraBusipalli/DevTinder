const express = require('express');

const app = express();
const {adminAuth, userAuth} = require('./middleware/auth');

// app.use('/user', adminAuth);
// app.use('/admin', userAuth)

app.get('/user/getAllData', adminAuth, (req, res) => {
    console.log('sent all data');
    res.send('all data sent')
});

app.get('/user/updateData',adminAuth, (req, res) => {
    console.log('updating the user');
    res.send('update success');
});

app.get('/user/deleteUser', adminAuth, (req, res) => {
    console.log('deleting the user');
    res.send('deleting success')   
})

app.get('/admin/getAllData', userAuth, (req, res) => {
    console.log('sent all data');
    res.send('all data sent')
});

app.get('/admin/updateData', userAuth, (req, res) => {
    console.log('updating the user');
    res.send('update success');
});

app.get('/admin/deleteUser', userAuth, (req, res) => {
    console.log('deleting the user');
    res.send('deleting success')   
})


app.listen(3000, () => console.log('Server is listening to the port: 3000..!'));