const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/User");
class Product {
  // async create(req, res) {
  //   const form = formidable({ multiples: true });
  //   form.parse(req, async (err, fields, files) => {
  //     if (!err) {
  //       const parsedData = JSON.parse(fields.data);
  //       const errors = [];
  //       if (parsedData.title.trim().length === 0) {
  //         errors.push({ msg: "Title is required" });
  //       }
  //       if (parseInt(parsedData.price) < 1) {
  //         errors.push({ msg: "Price should be above $1" });
  //       }
  //       if (parseInt(parsedData.discount) < 0) {
  //         errors.push({ msg: "Discount should not be negative" });
  //       }
  //       if (parseInt(parsedData.stock) < 20) {
  //         errors.push({ msg: "Stock should be above 20" });
  //       }
  //       if (fields.description.trim().length === 0) {
  //         errors.push({ msg: "Description is required" });
  //       }
  //       if (errors.length === 0) {
  //         if (!files["image1"]) {
  //           errors.push({ msg: "Image1 is required" });
  //         }
  //         if (!files["image2"]) {
  //           errors.push({ msg: "Image2 is required" });
  //         }
  //         if (!files["image3"]) {
  //           errors.push({ msg: "Image3 is required" });
  //         }
  //         if (errors.length === 0) {
  //           const images = {};
  //           for (let i = 0; i < Object.keys(files).length; i++) {
  //             const mimeType = files[`image${i + 1}`].mimetype;
  //             const extension = mimeType.split("/")[1].toLowerCase();
  //             if (
  //               extension === "jpeg" ||
  //               extension === "jpg" ||
  //               extension === "png"
  //             ) {
  //               const imageName = uuidv4() + `.${extension}`;
  //               const __dirname = path.resolve();
  //               const newPath =
  //                 __dirname + `/../client/public/images/${imageName}`;
  //               images[`image${i + 1}`] = imageName;
  //               fs.copyFile(files[`image${i + 1}`].filepath, newPath, (err) => {
  //                 if (err) {
  //                   console.log(err);
  //                 }
  //               });
  //             } else {
  //               const error = {};
  //               error["msg"] = `image${i + 1} has invalid ${extension} type`;
  //               errors.push(error);
  //             }
  //           }
  //           if (errors.length === 0) {
  //             try {
  //               const response = await ProductModel.create({
  //                 title: parsedData.title,
  //                 price: parseInt(parsedData.price),
  //                 discount: parseInt(parsedData.discount),
  //                 stock: parseInt(parsedData.stock),
  //                 category: parsedData.category,
  //                 colors: parsedData.colors,
  //                 sizes: JSON.parse(fields.sizes),
  //                 image1: images["image1"],
  //                 image2: images["image2"],
  //                 image3: images["image3"],
  //                 description: fields.description,
  //               });
  //               return res
  //                 .status(201)
  //                 .json({ msg: "Product has created", response });
  //             } catch (error) {
  //               console.log(error);
  //               return res.status(500).json(error);
  //             }
  //           } else {
  //             return res.status(400).json({ errors });
  //           }
  //         } else {
  //           return res.status(400).json({ errors });
  //         }
  //       } else {
  //         return res.status(400).json({ errors });
  //       }
  //     }
  //   });
  // }

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
     console.log(totalDeposit)
     

     if(totalDeposit >0){
      const totalDepositUser = await UserModel.findOne({ referralCode:refcode });
         totalDepositUser.referalcommison = totalDeposit;
         await totalDepositUser.save();
    }


     
// Update the total referall commison update in user profile 


      // const dataname=response.name
      // const datadp=response.activedeposit
        // .skip(skip)
        // .limit(perPage)
        // .sort({ updatedAt: -1 });
      return res.status(200).json({products: response ,responseu,responserefc});
    } catch (error) {
      console.log(error.message);
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
      
        // .skip(skip)
        // .limit(perPage)
        // .sort({ updatedAt: -1 });
      return res.status(200).json({ products: response });
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
      
        // .skip(skip)
        // .limit(perPage)
        // .sort({ updatedAt: -1 });
        console.log("peding deposit responce from 300 ",response)
      return res.status(200).json({ products: response });
    } catch (error) {
      console.log(error.message);
    }
  }



  // async get(req, res) {
  //   const { page } = req.params;
  //   const perPage = 5;
  //   const skip = (page - 1) * perPage;
  //   try {
  //     const count = await UserModel.find({}).countDocuments();
  //     const response = await UserModel.find({})
  //       .skip(skip)
  //       .limit(perPage)
  //       .sort({ updatedAt: -1 });
  //     return res.status(200).json({ products: response, perPage, count });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }


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

          
        } = req.body;
        const response = await UserModel.updateOne(
          { _id },
          {
            $set: {
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
            },
          }
        );
        return res.status(200).json({ msg: "Product has updated", response });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: error });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }


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
        
        console.log(req.body)
        const response = await UserModel.updateOne(
          { _id },
          {
            $set: {
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
              transationhashvbv:hash,
              depositday,
              withdrawday,
              pendingdp
              // screenshhotusdt,
            },
          }
        );
        // console.log(response)
        return res.status(200).json({ msg: "Product has updated", response });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: error });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }
  // async deleteProduct(req, res) {
  //   const { id } = req.params;
  //   try {
  //     const product = await ProductModel.findOne({ _id: id });
  //     [1, 2, 3].forEach((number) => {
  //       let key = `image${number}`;
  //       console.log(key);
  //       let image = product[key];
  //       let __dirname = path.resolve();
  //       let imagePath = __dirname + `/../client/public/images/${image}`;
  //       fs.unlink(imagePath, (err) => {
  //         if (err) {
  //           throw new Error(err);
  //         }
  //       });
  //     });
  //     await UserModel.findByIdAndDelete(id);
  //     return res
  //       .status(200)
  //       .json({ msg: "Product has been deleted successfully" });
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }





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

}
module.exports = new Product();
