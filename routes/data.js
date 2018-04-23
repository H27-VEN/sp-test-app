const express = require('express');
const router = express.Router();
var multer = require('multer');
var fs = require('fs');

var upload = multer({ dest: 'uploads/' })

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


router.post('/register/user', upload.single('profile_pic'), function(req, res) {
    console.log('/register/user'); 
    console.log('body: ', req.body);
    console.log('file: ', req.file);
    console.log('file: ', req.file.path);
    
    let tmp_path = req.file.path;
    let file_name = Date.now() + '_' + req.file.originalname;
    let target_path = 'uploads/' + file_name;
    let src = fs.createReadStream(tmp_path);
    let dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function () { 
        console.log('-- end --');
        console.log('req.body: ',req.body);
        let userData = req.body;
        console.log('userData', userData);
        userData.profile_pic_url = 'http://localhost:5000/' + file_name;
        console.log('userData profile_pic: ',userData.profile_pic_url);
        userRegisterList.push(userData);
        res.send(JSON.stringify({ result: 'done' }));   
    });
    src.on('error', function (err) { 
        console.log('-- error --');
        res.send(JSON.stringify({ result: 'error', response: 'error uploading file' })); 
    });
    
});

router.post('/update/user', upload.single('profile_pic'), function(req, res) {
    console.log('/update/user');
    console.log('body: ', req.body);
    console.log('file: ', req.file);
    console.log('file: ', req.file.path);

    let tmp_path = req.file.path;
    let file_name = Date.now() + '_' + req.file.originalname;
    let target_path = 'uploads/' + file_name;
    let src = fs.createReadStream(tmp_path);
    let dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function () {
        console.log('-- end --');
        console.log('req.body: ', req.body);
        let userData = req.body;
        console.log('userData', userData);
        userData.profile_pic_url = 'http://localhost:5000/' + file_name;
        console.log('userData profile_pic: ', userData.profile_pic_url);
        id = parseInt(userData.id);
        if(id < userRegisterList.length) {
            userRegisterList.splice(id, 1, userData);
            res.send(JSON.stringify({ result: 'done' }));
        }
              
    });
    src.on('error', function (err) {
        console.log('-- error --');
        res.send(JSON.stringify({ result: 'error', response: 'error uploading file' }));
    });

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