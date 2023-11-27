const { validationResult } = require("express-validator");
const UserModel = require("../models/User");
const { hashedPassword, createToken, comparePassword } = require("../services/authServices");
const nodemailer = require('nodemailer');
const crypto = require('crypto');


// @route POST /api/register
// @access Public
// @desc Create user and return a token
module.exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {

        const generateReferralCode = () => {
            // Implement your logic to generate a unique referral code (e.g., using a library like shortid)
            // For simplicity, let's assume a random 6-character code
            return Math.random().toString(36).substring(2, 8).toUpperCase();
        };




        const { name, email, password, parentId, phone } = req.body;


          // Find the user with the given referral code
    // const referringUser = await UserModel.findOne({ referralCode:parentId });
    // console.log("referringUser nahi mla", referringUser)

    // // Check if the referring user is found
    // if (!referringUser) {
    //   return res.status(400).json({ message: 'Referring user not found' });
    // }



        // Generate referral code
        const referralCode = generateReferralCode();


        console.log("come from register", req.body)

        try {
            const emailExist = await UserModel.findOne({ email });
            console.log(emailExist)
            if (!emailExist) {
                const hashed = await hashedPassword(password);
                console.log(hashed)


                // Create new user with referral code
                

                const user = await UserModel.create({
                    name,
                    email,
                    password: hashed,
                    Parentrefcode:parentId,
                    referralCode,
                    phonenm: phone,
                    totaldeposit: 0,
                    activedeposit: 0,
                    dailyroi: 0,
                    availableforwithdraw: 0,
                    withdraw: 0,
                    pendingwithdraw: 0,
                    referalcommison: 0,
                    totalreferal: 0,
                    udtwalletadres: "0x0000000000000000043500000000353",
                    totalwithdraw: 0,
                    transationhashvbv: "0x0000000000",
                    depositday: 0,
                    withdrawday: "Monday",
                    screenshhotusdt: "scren",
                    pendingdp:0,



                });


                // Update parent's referrals
                // if (parentId) {
                //     const parentUser = await UserModel.findById(parentId);
                //     console.log("parentUser",parentUser)
                //     if (parentUser) {
                //         parentUser.referrals.push(user._id);
                //         await parentUser.save();
                //     }}



                    const token = createToken({ id: user._id, name: user.name });
                    console.log(token)
                    return res.status(201).json({ msg: 'Your account has been created!', token, user });
                } else {
                    // email already taken
                    return res.status(400).json({ errors: [{ msg: `${email} is already taken`, param: 'email' }] })
                }
            } catch (error) {
                console.log(error.message);
                return res.status(500).json("Server internal error!");
            }
        } else {
            // validations failed
            return res.status(400).json({ errors: errors.array() })
        }
    }

    // @route POST /api/login
    // @access Public
    // @desc Login user and return a token

    module.exports.login = async (req, res) => {
        const { email, password } = req.body;
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const user = await UserModel.findOne({ email });
                if (user) {
                    if (await comparePassword(password, user.password)) {
                        const token = createToken({ id: user._id, name: user.name });
                        if (user.admin) {
                            return res.status(201).json({ token, admin: true });
                        } else {
                            return res.status(201).json({ token, user, admin: false });
                        }
                    } else {
                        return res.status(400).json({ errors: [{ msg: 'password not matched!', param: 'password' }] })
                    }
                } else {
                    return res.status(400).json({ errors: [{ msg: `${email} is not found!`, param: 'email' }] });
                }
            } catch (error) {
                console.log(error.message)
                return res.status(500).json('Server internal error!');
            }
        } else {
            //  validations failed
            return res.status(400).json({ errors: errors.array() })
        }
    }

    module.exports.adminvbc = async (req, res) => {
        const { email, password } = req.body;
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const user = await UserModel.findOne({ email });
                if (user) {
                    if (await comparePassword(password, user.password)) {
                        const token = createToken({ id: user._id, name: user.name });
                        if (user.admin) {
                            return res.status(201).json({ token, admin: true });
                        } else {
                            return res.status(201).json({ token, admin: false });
                        }
                    } else {
                        return res.status(400).json({ errors: [{ msg: 'password not matched!', param: 'password' }] })
                    }
                } else {
                    return res.status(400).json({ errors: [{ msg: `${email} is not found!`, param: 'email' }] });
                }
            } catch (error) {
                console.log(error.message)
                return res.status(500).json('Server internal error!');
            }
        } else {
            //  validations failed
            return res.status(400).json({ errors: errors.array() })
        }
    }


    // Forgot Password - Generate Token

    // Function to generate a unique token
const generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
  };
    
// Configuring NodeMailer with SMTP settings
const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., Gmail, Yahoo, etc.
    auth: {
      user: 'mohsinweb786@gmail.com',
      pass: 'xbrxegprewiowtsa',
    },
  });
  
  // Function to send reset password email
  const sendResetPasswordEmail = (email, token) => {
    const mailOptions = {
      from: 'mohsinweb786@gmail.com',
      to: email,
      subject: 'Reset Your Password',
      html: `<p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
            <p>Please click the following link or paste it into your browser to complete the process:</p>
            <p>http://localhost:3000/rest/${token}</p>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };


    //

    
    module.exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log(req.body)
    console.log("this email for forget pass",email)
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate and save reset token with expiration
      user.resetToken = generateToken();
      user.resetTokenExpiration = Date.now() + 3600000; // 1 hour validity
      await user.save();
  
      // Send reset email
      sendResetPasswordEmail(email, user.resetToken);
  
      res.status(200).json({ message: 'Reset token sent to your email' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };



  // Reset Password
module.exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    console.log("data for rest ",req.body)

    console.log("rest token",token)
    console.log("newPassword", newPassword)
    console.log("data for rest ",req.body)
    try {
      const user = await UserModel.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
      });
      console.log("this user find for rest ",user)
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }

      let newPassworddb
      if(user){
        newPassworddb= await hashedPassword(newPassword)
      }
  
      // Update user's password
      user.password = newPassworddb;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful Now Login With New Password', });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };