const User = require('../schema/userSchema')
const mongoose = require('mongoose');


const userLogin = async (req, res) => {
    const {username, password} = req.body;
    try {
        // console.log("userLogin: ", req);
        const getuser = await User.findOne({ username: username });
        // console.log(getuser);
        const isFound = await getuser.matchPassword(password);
        // console.log(isFound);
        if(!isFound) {
            res.status(500).json({
                status: "user not found "+error
            })
        }
        else {
            sendToken(getuser, 200, res);
        }

    } catch (error) {
        // console.log("userLogin Error");
        res.status(500).json({
            status: "error"+error
        })
    }
}

const userSignin = async (req, res) => {
    const {username, email, password} = req.body
    try {
        // console.log("userSignin", req.headers);

        let user = await User.findOne({email: email})
     
        if(!user){
          user = await User.create({
            _id: new mongoose.Types.ObjectId,
            username: username,
            email: email,
            password: password,
        });

        res.status(200).json({
          status: "userCreated",
          user: user
        });
        }
        else {
            res.status(200).json({
                status: "user Already Exist",
                user: user
              });
        }

    } catch (error) {
        // console.log("userLogin Error");
        res.status(500).json({
            status: "error"+error
        })
    }
}

const changePassword = async (req, res) => {
    try {
        // console.log("userLogin");
        const {email, oldpassword, newpassword} = req.body;
        const getuser = await User.findOne({ email: email });
        const isFound = await getuser.matchPassword(oldpassword);
        res.status(200).json({
            status: "working"
        })

    } catch (error) {
        // console.log("userLogin Error");
        res.status(500).json({
            status: "error"+error
        })
    }
}

const forgotPassword = async (req, res) => {
    try {
        // console.log("userLogin");
        // const {email, oldpassword, newpassword} = req.body;
        // const getuser = await User.findOne({ email: email });
        // const isFound = await getuser.matchPassword(oldpassword);
        res.status(200).json({
            status: "working"
        })

    } catch (error) {
        console.log("userLogin Error");
        res.status(500).json({
            status: "error"+error
        })
    }
}

const sendToken = (user, statusCode, res) => {
    const authToken = user.getSignedJwtToken();
    const { password, ...userdetails } = user._doc;
    res.status(statusCode).json({
      success: true,
      userdetails,
      authToken,
    });
  };


module.exports = {userLogin, userSignin, changePassword, forgotPassword}
