
const { validationResult } = require("express-validator");

const UserModel = require("../models/User");
const DepositModel = require("../models/DepositModel");
const DdepositModel = require("../models/DdepositModel");

class Product {
 

  async create(req, res) {
  
    try {
      const users = await UserModel.find()
      // const users = await User.find();
  
      users.forEach(async (user) => {
        // const daysSinceLastUpdate = Math.floor(
        //   (new Date() - new Date(user.lastRoiUpdatevbv)) / (3000)
          // (new Date() - new Date(user.lastRoiUpdatevbv)) / (1000 * 60 * 60 * 24)
          

        // );


        const number = 10;
        let daddd=0
        let newRoi=0

        if (user.activedeposit  == 100) {
         daddd= (user.activedeposit / 100) + 2
         newRoi=user.dailyroi + daddd


          console.log('Number is greater than 10');
        } else if (user.activedeposit == 200) {
           daddd= (user.activedeposit / 200) + 5
          newRoi=user.dailyroi + daddd


          console.log('Number is exactly 10');
        } else if (user.activedeposit == 300) {
          daddd= (user.activedeposit / 300) + 8
           newRoi=user.dailyroi + daddd
          console.log('Number is less than 10');
        }
        else if (user.activedeposit / 500) {
          daddd= (user.activedeposit / 500) + 14
           newRoi=user.dailyroi + daddd
          console.log('Number is less than 10');
        }
        
        
        else {
           daddd= (user.activedeposit >0) + 0
           newRoi=user.dailyroi + daddd
          console.log('This will only execute if none of the above conditions are true');
        }




        // const daddd= (user.activedeposit / 100) + 2
        // const newRoi=user.dailyroi + daddd
  
        // Assuming ROI increases by 3% daily
        // const dailyRoiIncrease =30;
        // const newRoi = user.dailyroi + dailyRoiIncrease * daysSinceLastUpdate;
  
        // Update the user document in the database
        await UserModel.findByIdAndUpdate(user._id, {
          dailyroi: Math.floor(newRoi),
          // lastRoiUpdatevbv: new Date(),
        });
      });
  
      res.json({ message: 'Daily ROI updated successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

  }






  async get(req, res) {
    // const { page } = req.params;
    // const perPage = 5;
    // const skip = (page - 1) * perPage;
    try {
      // const count = await UserModel.find({}).countDocuments();
      const response = await UserModel.find()
        // .skip(skip)
        // .limit(perPage)
        // .sort({ updatedAt: -1 });
      return res.status(200).json({ products: response });
    } catch (error) {
      console.log(error.message);
    }
  }


  async getpd(req, res) {
    // const { page } = req.params;
    // const perPage = 5;
    // const skip = (page - 1) * perPage;
    try {
      // const count = await UserModel.find({}).countDocuments();

          // Find users with withdraw amounts greater than 0

      const response = await UserModel.find({ pendingwithdraw: { $gt: 0  } })
      let withdrawals =[]
      
       withdrawals = await DepositModel.find();
        // .skip(skip)
        // .limit(perPage)
        // .sort({ updatedAt: -1 });
      return res.status(200).json({ products: response ,withdrawals});
    } catch (error) {
      console.log(error.message);
    }
  }



  async getpddespot(req, res) {
    // const { page } = req.params;
    // const perPage = 5;
    // const skip = (page - 1) * perPage;
    console.log("hello deposit")
    try {
      // const count = await UserModel.find({}).countDocuments();
      
          // Find users with withdraw amounts greater than 0

      const response = await UserModel.find({ pendingdp: { $gt: 0  } })

      let deposiitt =[]
      
       deposiitt = await DdepositModel.find();
      
        // .skip(skip)
        // .limit(perPage)
        // .sort({ updatedAt: -1 });
        console.log("peding deposit responce from 300 ",response)
      return res.status(200).json({ products: response ,deposiitt});
    } catch (error) {
      console.log(error.message);
    }
  }





  async getProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await UserModel.findOne({ _id: id });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
      console.log(error.message);
    }
  }



  // async getProduct(req, res) {
  //   const { id } = req.params;
  //   try {
  //     const product = await ProductModel.findOne({ _id: id });
  //     return res.status(200).json(product);
  //   } catch (error) {
  //     return res.status(500).json({ error: error.message });
  //     console.log(error.message);
  //   }
  // }


  // async updateProduct(req, res) {
  //   const errors = validationResult(req);
  //   if (errors.isEmpty()) {
  //     try {
  //       const {
  //         _id,
  //         name,
  //         email,
  //         phonenm,
  //         totaldeposit,
  //         activedeposit,
  //         dailyroi,
  //         availableforwithdraw,
  //         withdraw,
  //         pendingwithdraw,
  //         referalcommison,
  //         totalreferal,
  //         udtwalletadres,
  //         totalwithdraw,
  //         transationhashvbv,
  //         depositday,
  //         withdrawday,
  //         screenshhotusdt,

          
  //       } = req.body;
  //       console.log("this user data come from frontend ",req.body)
  //       const response = await UserModel.updateOne(
  //         { _id },
  //         {
  //           $set: {
  //             name,
  //             email,
  //             phonenm,
  //             totaldeposit,
  //             activedeposit,
  //             dailyroi,
  //             availableforwithdraw,
  //             withdraw,
  //             pendingwithdraw,
  //             referalcommison,
  //             totalreferal,
  //             udtwalletadres,
  //             totalwithdraw,
  //             transationhashvbv,
  //             depositday,
  //             withdrawday,
  //             screenshhotusdt,
  //           },
  //         }
  //       );
  //       console.log("updates data base is this",response)
  //       return res.status(200).json({ msg: "Product has updated", response });
  //     } catch (error) {
  //       console.log(error);
  //       return res.status(500).json({ errors: error });
  //     }
  //   } else {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  // }



  

  //this use for update user data its come from admin dashboard
  async updateProduct(req, res) {
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
        
        console.log("data come for update from user",req.body)
        const response = await UserModel.updateOne(
          { _id },
          {
            $set: {
              name,
              email,
              pendingdp,
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
              transationhashvbv:hash,
              depositday,
              withdrawday,
              pendingdp
              // screenshhotusdt,
            },
          }
        );
        console.log("this responce back for user update deposit",response)
        return res.status(200).json({ msg: "Product has updated", response });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: error });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }






  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      // const product = await ProductModel.findOne({ _id: id });
 
      await UserModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ msg: "Product has been deleted successfully" });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //user withdraw update from admin dashboard 
  async updateWithdrawalStatus(req, res) {


    const { withdrawalId, status ,trx } = req.body;
    console.log("this data ",req.body)

    try {
      const withdrawal = await DepositModel.findById(withdrawalId);
      if (!withdrawal) {
        return res.status(404).json({ error: 'Withdrawal not found' });
      }
  
      withdrawal.status = status;
      withdrawal.transactionHash=trx
    let  whatdatais= await withdrawal.save();
    console.log("then new withdraaw",whatdatais)

      const user = await UserModel.findById(withdrawal.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if(whatdatais?.status == "rejected"){
        console.log("done")
        user.pendingwithdraw -= withdrawal.amount
        user.dailyroi += withdrawal.amount
        await user.save();


        return res.status(404).json({ error: 'User withdraw reject' });
  
      }
      console.log("continue")
       // Update user model: Deduct pending withdraw and update total withdraw
    user.pendingwithdraw -= withdrawal.amount;
    user.totalwithdraw += withdrawal.amount;
    await user.save();

      return res.status(200).json({ message: 'Withdrawal status updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
    // const { id } = req.params;
    // try {
    //   // const product = await ProductModel.findOne({ _id: id });
 
    //   await UserModel.findByIdAndDelete(id);
    //   return res
    //     .status(200)
    //     .json({ msg: "Product has been deleted successfully" });
    // } catch (error) {
    //   throw new Error(error.message);
    // }
  }



  //user deposit update from admin dashboard 

  async updateDepositStatus(req, res) {


    const { withdrawalId, status } = req.body;
    console.log("this data ",req.body)

    try {
      const depositt = await DdepositModel.findById(withdrawalId);
      if (!depositt) {
        return res.status(404).json({ error: 'deposit not found' });
      }
  
      depositt.status = status;
    let whatdatais=  await depositt.save();
    console.log("wjat respoce after status change ",whatdatais)


    

      const user = await UserModel.findById(depositt.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if(whatdatais?.status === "rejected"){
        console.log("done")
        user.pendingdp -= depositt.amount;
        await user.save();


        return res.status(404).json({ error: 'User deposit reject' });
  
      }
      console.log("continue")
  
       // Update user model: Deduct pending withdraw and update total withdraw
    user.pendingdp -= depositt.amount;
    user.activedeposit += depositt.amount;
    await user.save();

      return res.status(200).json({ message: 'Withdrawal status updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
    // const { id } = req.params;
    // try {
    //   // const product = await ProductModel.findOne({ _id: id });
 
    //   await UserModel.findByIdAndDelete(id);
    //   return res
    //     .status(200)
    //     .json({ msg: "Product has been deleted successfully" });
    // } catch (error) {
    //   throw new Error(error.message);
    // }
  }

  //searchuserdata from any thins staert its come from admin dashboard
  
  async getsearchuserdata(req, res) {
    // const { email } = req.body;
    const { email } = req.params;

    console.log("email a rahi ha backend ma ",email)
  
    try { 
     
      // const response = await UserModel.find({ pendingwithdraw: { $gt: 0  } })
      let users = await UserModel.findOne({ email });

      if (!users) {
        return res.status(404).json({ message: 'User not found' });
        // console.log("no user")
      }


     console.log(users)


    

    let  responserefc = await UserModel.find({Parentrefcode:users.referralCode}).countDocuments();
    console.log("total referal ",responserefc)

      if(responserefc == 0){
        console.log("no referal")

        return res.status(200).json({users});

        // return res.status(404).json({ message: 'User not found' });


      }


      const response = await UserModel.find({Parentrefcode:users.referralCode}).select('name email activedeposit ');
          console.log("this data send to backend",users,response)
      return res.status(200).json({users,response,responserefc});


   
    } catch (error) {
      console.log(error.message);
    }
  }
  //searchuserdata from any thins end

}
module.exports = new Product();
