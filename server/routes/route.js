const express = require('express');
const { uploadFile, getImage } = require('../controller/image-controller');
const {createPost, getAllPost, getPost, updatePost, deletePost} = require('../controller/post-controller');
const { userLogin, userSignin, changePassword, forgotPassword } = require('../controller/user-controller');
const router = express.Router();
const upload = require('../utils/upload')
router.post('/create', createPost) 
router.get('/posts', getAllPost)
router.post('/post/:id', getPost);
router.post('/update/:id', updatePost);
router.post('/delete/:id', deletePost);
router.post('/upload/file', upload.single('file'), uploadFile);
router.get('/file/:filename', getImage);
router.post('/login', userLogin);
router.post('/signin', userSignin);
router.post('/updatepassword', changePassword);
router.post('/forgotpassword', forgotPassword);





module.exports = router;



