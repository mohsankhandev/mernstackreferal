const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    phonenm: {
      type: String,
      default: "0"

  },
    password: {
        required: true,
        type: String,

    },
    totaldeposit: {
        required: true,
        type: Number,
        default: 0

      },
      activedeposit: {
        required: true,
        type: Number,
        default: 0

      },
      dailyroi: {
        required: true,
        type: Number,
        default: 0

      },
      availableforwithdraw: {
        required: true,
        type: Number,
        default: 0

      },
      withdraw: {
        required: true,
        type: Number,
        default: 0

      },
      pendingwithdraw: {
        required: true,
        type: Number,
        default: 0

      },
      referalcommison: {
        required: true,
        type: Number,
        default: 0

      },
      totalreferal: {
        required: true,
        type: Number,
        default: 0

      },
      udtwalletadres: {
        required: true,
        type: String,
        default: "false"

      },
      totalwithdraw: {
        required: true,
        type: Number,
        default: 0

      },

      transationhashvbv: {
        required: true,
        type: String,
        default:" 0"

      },

      depositday: {
        required: true,
        type: Number,
        default: 0

      },


      withdrawday: {
        required: true,
        type: String,
        default: 0

      },

      screenshhotusdt: {
        required: true,
        type: String,
        default: "string"

      },   
      pendingdp:{
        // required: true,
        type: Number,
        default:0
      } , 

    admin: {
        required: true,
        type: Boolean,
        default: false
    },
    // new code 
    Parentrefcode: {
      type: String,
      default: "false"

    },    
  
    referralCode: { type: String, unique: true },

    // parentId: {type:String},

    // referrals: {type:String},
},
{ timestamps: true }


);

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;