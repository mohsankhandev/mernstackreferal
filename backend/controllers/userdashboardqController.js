const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/User");
const DepositModel = require("../models/DepositModel");
const DdepositModel = require("../models/DdepositModel");
const nodemailer = require('nodemailer');



// Configuring NodeMailer with SMTP settings
let transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., Gmail, Yahoo, etc.
  auth: {
    user: 'mohsinweb786@gmail.com',
    pass: 'xbrxegprewiowtsa',
  },
});

// Function to send reset password email
let sendWithdrawReqToAdmin = (userdata, withdrawdata) => {
  const mailOptions = {
    from: 'mohsinweb786@gmail.com',
    to: "muhammadmohsankhanaffliate@gmail.com",
    subject: 'User WITHDRAW REQUEST',
    html: `<p>User Name : ${userdata.name}</p>
    <p>User Id : ${userdata._id}</p>
    <p>User email address : ${userdata.email}</p>
    <p>User Phone  : ${userdata.phonenm}</p>
    <p>User Active Deposit : ${userdata.activedeposit}</p>
    <p>User Daily Roi : ${userdata.dailyroi}</p>
    <p>User Pending Withdraw : ${userdata.pendingwithdraw}</p>
    <p>User Total Referal : ${userdata.totalreferal}</p>
    <p>User Referal Commision : ${userdata.referalcommison}</p>
    <p>User Referal Code  : ${userdata.referralCode}</p>
    <p>User Parent Referal Code  : ${userdata.Parentrefcode}</p>
    <p>User Wallet Address : ${userdata.udtwalletadres}</p>
    
          <p>: this is User New Withdraw Request And Withdraw Details</p>
          <p>User Withdraw Id : ${withdrawdata._id}</p>
    <p> TYPE : ${withdrawdata.mood}</p>
    <p>Amount : ${withdrawdata.amount}</p>
    <p>Status : ${withdrawdata.status}</p>
    <p>Wallet Address : ${withdrawdata.walletAddress}</p>
    <p>Trx : ${withdrawdata.transactionHash}</p>
    <p>Time : ${withdrawdata.timestamp}</p>
          <p>I.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};


let sendDepositReqToAdmin = (userdata, withdrawdata) => {
  const mailOptions = {
    from: 'mohsinweb786@gmail.com',
    to: "muhammadmohsankhanaffliate@gmail.com",
    subject: 'User Deposit REQUEST',
    html: `<p>User Name : ${userdata.name}</p>
    <p>User Id : ${userdata._id}</p>
    <p>User email address : ${userdata.email}</p>
    <p>User Phone  : ${userdata.phonenm}</p>
    <p>User Active Deposit : ${userdata.activedeposit}</p>
    <p>User Daily Roi : ${userdata.dailyroi}</p>
    <p>User Pending Withdraw : ${userdata.pendingwithdraw}</p>
    <p>User Total Referal : ${userdata.totalreferal}</p>
    <p>User Referal Commision : ${userdata.referalcommison}</p>
    <p>User Referal Code  : ${userdata.referralCode}</p>
    <p>User Parent Referal Code  : ${userdata.Parentrefcode}</p>
    <p>User Wallet Address : ${userdata.udtwalletadres}</p>
    
          <p>: this is User New Deposit  Request And Deposit Details</p>
          <p>User Withdraw Id : ${withdrawdata._id}</p>
    <p> TYPE : ${withdrawdata.mood}</p>
    <p>Amount : ${withdrawdata.amount}</p>
    <p>Status : ${withdrawdata.status}</p>
    <p>Wallet Address : ${withdrawdata.walletAddress}</p>
    <p>Trx : ${withdrawdata.transactionHash}</p>
    <p>Time : ${withdrawdata.timestamp}</p>
          <p>I.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

class userdashboardController {
 

//coming from user dashboard componennt 1 dashboard service front end userdashboardcontroller 1
  async getref(req, res) {
    const { refcode } = req.params;
    console.log(refcode)
    // const perPage = 5;
    // const skip = (page - 1) * perPage;
    try {
      // const count = await UserModel.find({}).countDocuments();
      const responseu = await UserModel.findOne({referralCode:refcode});

      // const responseu = await UserModel.find({referralCode:refcode}).select('dailyroi')
      let responserefc=0
       responserefc = await UserModel.find({Parentrefcode:refcode}).countDocuments();

      //  10
       
      let activereferal = await UserModel.findOne({ referralCode:refcode });

      if(responserefc >0){
        activereferal.totalreferal = responserefc;
        await activereferal.save();
      }
      





     const response = await UserModel.find({Parentrefcode:refcode}).select('name email activedeposit ');



// Update the total referall commison update in user profile 

     const users = await UserModel.find({Parentrefcode:refcode}).select('activedeposit');
     let totalDeposit = 0;
 
     users.forEach((user) => {
       // Add each user's deposit to the total
       totalDeposit += user.activedeposit/100 * 10;
     });
     console.log("hi ",totalDeposit)
     

     if(totalDeposit >0){
      const totalDepositUser = await UserModel.findOne({ referralCode:refcode });
         totalDepositUser.referalcommison = totalDeposit;
         await totalDepositUser.save();
    }

    let userfordepo = await UserModel.findOne({ referralCode:refcode });
    console.log("first  this user details ",userfordepo)


    let pendingWithdrawals=0
    pendingWithdrawals = await DepositModel.find({ userId:userfordepo._id }).countDocuments();
     console.log("find withdraw",pendingWithdrawals)

     let pendingWithdrawal =[];

  if(pendingWithdrawals > 0){

      // Find pending withdrawals based on userId
       pendingWithdrawal = await DepositModel.find({ userId:userfordepo._id});
      console.log("pending call", pendingWithdrawal)

    // return pendingWithdrawal
    }
    

     

        console.log("am runing",responseu)
      return res.status(200).json({products: response ,responseu,responserefc,pendingWithdrawal});
    } catch (error) {
      console.log("this s=file ")
      console.log(error.message);
    }
  }

// get user for  withdraw page from user dashboard 4  dashboard service front end  userdashboardcontroller 4
async getuserdepandwit(req, res) {
    const { refcode } = req.params;
    console.log(refcode)
   
    try {
  

      const responseu = await UserModel.findOne({referralCode:refcode}).select('name email phonenm udtwalletadres pendingwithdraw dailyroi')
    
        console.log("am runing",responseu)
      return res.status(200).json(responseu);
    } catch (error) {
      console.log("this s=file ")
      console.log(error.message);
    }
  }

 //coming from withdraw componnent  page 3 dashboard service front end  userdashboardcontroller 3
 async updateuserdeposit(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const {
          _id,
          name,
          email,
          phonenm,
          totaldeposit,
          activedeposit,
          dailyroi,
          availableforwithdraw,
          withdraw,
          pendingwithdraw,
          referalcommison,
          totalreferal,
          udtwalletadres,
          totalwithdraw,
          transationhashvbv,
          depositday,
          withdrawday,
          screenshhotusdt,
          pendingdp,
          hash

          
        } = req.body;
        const incomingPendingwwd = parseInt(pendingwithdraw, 10);


        const user = await UserModel.findById(_id);
        console.log("this user is in data base available",user)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }


          if (user.dailyroi < incomingPendingwwd) {
            return res.status(400).json({ error: 'Insufficient balance' });
          }

          // Deduct withdrawal amount from user balance
          user.dailyroi -= incomingPendingwwd;
          user.pendingwithdraw += incomingPendingwwd;
        let userdata=  await user.save();

        // Save withdrawal details in PendingWithdraw model
        const withdrawal = new DepositModel({ userId:_id, amount:pendingwithdraw ,walletAddress:udtwalletadres ,transactionHash:hash? hash :"waiting"});
       let withdrawdata= await withdrawal.save();
        console.log("user withdraw save",withdrawal)
        // const newdepositcr=DepositModel.create()
        console.log("data come for update from dashboaard",req.body)
        const response = await UserModel.updateOne(
          { _id },
          {
            $set: {
              phonenm,
            
              // pendingwithdraw,
             
              udtwalletadres,
              transationhashvbv:hash,
              // withdrawday,
              // screenshhotusdt,
            },
          }
        );

        sendWithdrawReqToAdmin(userdata,withdrawdata )

        console.log("this responce back for dashboard update deposit",response)
        return res.status(200).json({ msg: "Product has updated", response });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: error });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }

  




//coming from depositg component and dashboard service come  2 front end userdashboardcontroller 2
// async updateProductdp(req, res) {
//     const errors = validationResult(req);
//     if (errors.isEmpty()) {
//       try {
//         const {
//           _id,
//           name,
//           email,
//           phonenm,
//           totaldeposit,
//           activedeposit,
//           dailyroi,
//           availableforwithdraw,
//           withdraw,
//           pendingwithdraw,
//           referalcommison,
//           totalreferal,
//           udtwalletadres,
//           totalwithdraw,
//           transationhashvbv,
//           depositday,
//           withdrawday,
//           screenshhotusdt,
//           pendingdp,
//           hash

          
//         } = req.body;
        
//         console.log("data come for update from dashboaard",req.body)

//         const depositsave = new DdepositModel({ userId:_id, amount:pendingdp ,walletAddress:udtwalletadres ,name,email ,transactionHash:hash });

//         await depositsave.save();



//         const response = await UserModel.updateOne(
//           { _id },
//           {
//             $set: {
//               pendingdp,
//               phonenm,
//               udtwalletadres,
//               transationhashvbv:hash,
            
//               // screenshhotusdt,
//             },
//           }
//         );
//         console.log("this responce back for dashboard update deposit",response)
//         return res.status(200).json({ msg: "Product has updated", response });
//       } catch (error) {
//         console.log(error);
//         return res.status(500).json({ errors: error });
//       }
//     } else {
//       return res.status(400).json({ errors: errors.array() });
//     }
//   }


  


  //



  async updateProductdp(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const {
          _id,
          name,
          email,
          phonenm,
          totaldeposit,
          activedeposit,
          dailyroi,
          availableforwithdraw,
          withdraw,
          pendingwithdraw,
          referalcommison,
          totalreferal,
          udtwalletadres,
          totalwithdraw,
          transationhashvbv,
          depositday,
          withdrawday,
          screenshhotusdt,
          pendingdp,
          hash

          
        } = req.body;
        const incomingPendingDP = parseInt(pendingdp, 10);

        console.log("data come for update from dashboaard",req.body)

        const depositsave = new DdepositModel({ userId:_id, amount:incomingPendingDP ,walletAddress:udtwalletadres ,name,email ,transactionHash:hash });

        console.log("this data save for ddmodel",depositsave)
       let dddpsave= await depositsave.save();

        const user = await UserModel.findById(_id);
        console.log("this user detail already",user)
        // user.pendingdp += pendingdp;
        // user.pendingdp += Number(pendingdp);
         user.pendingdp  +=incomingPendingDP ;

        console.log("sadasd")

     let savedad=   await user.save();
     console.log("savedad data this",savedad)
     sendDepositReqToAdmin(savedad,dddpsave)

        // const response = await UserModel.updateOne(
        //   { _id },
        //   {
        //     $set: {
        //       phonenm,
        //       udtwalletadres,
        //       transationhashvbv:hash,
            
        //       // screenshhotusdt,
        //     },
        //   }
        // );
        
        console.log("this responce back for dashboard update deposit",savedad)
        return res.status(200).json({ msg: "Product has updated", savedad });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: error });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }






//   async updateuserdeposit(req, res) {
//     const errors = validationResult(req);
//     if (errors.isEmpty()) {
//       try {
//         const {
//           _id,
//           name,
//           email,
//           phonenm,
//           totaldeposit,
//           activedeposit,
//           dailyroi,
//           availableforwithdraw,
//           withdraw,
//           pendingwithdraw,
//           referalcommison,
//           totalreferal,
//           udtwalletadres,
//           totalwithdraw,
//           transationhashvbv,
//           depositday,
//           withdrawday,
//           screenshhotusdt,
//           pendingdp,
//           hash

          
//         } = req.body;

//         const user = await UserModel.findById(_id);
//         console.log("this user is in data base available",user)

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//           }


//           if (user.dailyroi < pendingwithdraw) {
//             return res.status(400).json({ error: 'Insufficient balance' });
//           }

//           // Deduct withdrawal amount from user balance
//           user.dailyroi -= pendingwithdraw;
//           await user.save();

//         // Save withdrawal details in PendingWithdraw model
//         const withdrawal = new DepositModel({ userId:_id, amount:pendingwithdraw ,walletAddress:udtwalletadres ,transactionHash:hash? hash :"waiting"});
//         await withdrawal.save();
//         console.log("user withdraw save",withdrawal)
//         // const newdepositcr=DepositModel.create()
//         console.log("data come for update from dashboaard",req.body)
//         const response = await UserModel.updateOne(
//           { _id },
//           {
//             $set: {
//               phonenm,
            
//               pendingwithdraw,
             
//               udtwalletadres,
//               transationhashvbv:hash,
//               withdrawday,
//               // screenshhotusdt,
//             },
//           }
//         );
//         console.log("this responce back for dashboard update deposit",response)
//         return res.status(200).json({ msg: "Product has updated", response });
//       } catch (error) {
//         console.log(error);
//         return res.status(500).json({ errors: error });
//       }
//     } else {
//       return res.status(400).json({ errors: errors.array() });
//     }
//   }








}
module.exports = new userdashboardController();