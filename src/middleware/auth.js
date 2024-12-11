const adminAuth =  (req, res, next) => {
    let token = 'abc';
    let adminAuth = token === 'abc';
    if(!adminAuth) {
        res.status(401).send('Unauthorized access...!');
    }
    else{
        next();
    }
};

const userAuth = (req, res, next) => {
    let token = 'xyz';
    let userAuth = token === 'xyrz'
    if(!userAuth) {
        res.status(401).send('Unauthorized user access ...!');
    }
    else {
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}