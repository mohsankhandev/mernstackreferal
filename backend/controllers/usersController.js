const { validationResult } = require("express-validator");
const UserModel = require("../models/User");
const { hashedPassword, createToken, comparePassword } = require("../services/authServices");

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