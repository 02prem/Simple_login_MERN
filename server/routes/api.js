const router = require('express').Router(); // import express and create instance of Router
const db = require('../models');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// route for POST request to './register'
router.post('/register', async function(req, res, next) {
    try{
        const user = await db.User.create(req.body);
        const {id, username} = user;

        const token = jwt.sign({id, username}, process.env.SECRET);

        res.status(201).json({id, username, token});
    }
    catch(err){
        if(err.code == 11000){
            err.message = 'Sorry, this username is already taken';
        }

        next(err);
    }
});

router.post('/login', async function(req, res, next) {
    try{
        const user = await db.User.findOne({ username: req.body.username, });
        const {id, username} = user;

        const valid = await user.comparePassword(req.body.password);
        if(valid){
            const token = jwt.sign({id, username}, process.env.SECRET);

            res.json({id, username, token});
        }
        else{
            throw new Error();
        }
    }
    catch(err){
        err.message = 'Invalid Username/password';
        next(err);
    }
});

// // Setup Multer for image uploads
// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// // Upload image
// app.post('/api/upload', upload.single('image'), (req, res) => {
//     res.json({ message: 'Image uploaded successfully' });
// });

module.exports = router;
