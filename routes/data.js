const express = require('express');
const router = express.Router();

userRegisterList = [];
userLoginDetails = { userid: 'hardik123', password: 'password' };
userProfileList = [
                    { name: 'Hardik Lakdawala', email: 'hardik_h27@ymail.com',  gender: 'Male', hobbies: ['sports', 'movies'] },
                    { name: 'Yogesh Joshi', email: 'yogjoshi@gmail.com', gender: 'Male', hobbies: ['sports', 'movies']},
                    { name: 'Rahul Malhotra', email: 'rashulmalhotra@gmail.com', gender: 'Male', hobbies:['sports', 'movies']}
                  ];


router.get('/fetch/users', function(req, res) {
    console.log('in -- /fetch/users');
    console.log(userRegisterList);
    res.send(JSON.stringify(userRegisterList));
});

router.post('/fetch/specific', function(req, res) {
    console.log('-- in /fetch/specific --');
    let id = parseInt(req.body.id);
    console.log('id: '+id);
    if(userRegisterList[id])
        res.send(JSON.stringify({ result: 'done', response: userRegisterList[id]}));
    else
        res.send(JSON.stringify({result: 'fail', response: 'Invalid id'}));
});


router.post('/register/user', function(req, res) {
    console.log('/register/user');  
    userRegisterList.push(JSON.parse(req.body.userdetails));
    res.send(JSON.stringify({result: 'done' }))
});

router.post('/update/user', function(req, res) {
    console.log('in /update/user');
    console.log(req.body);
    console.log('userdetails: ' + req.body.userdetails);
    console.log('id: ' + req.body.id);
    let id = parseInt(req.body.id);
    if(id < userRegisterList.length) {
        userRegisterList.splice(id, 1, JSON.parse(req.body.userdetails));
        res.send(JSON.stringify({result: 'done'}));
    }

});

router.post('/delete/user', function(req, res) {
    console.log('in /delete/user');
    console.log(req.body.email);
    let email = req.body.email;
    userRegisterList.forEach((currentVal, index, array) => {
        if(currentVal.email === email) {
            array.splice(index, 1);
        }
    });

    res.send(JSON.stringify(userRegisterList));

});

module.exports = router;