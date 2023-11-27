const mongoose = require("mongoose");

const DdepositSchema = mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },

      amount: {
        type: Number,
        required: true,
        default: 0

      },

      mood: {
        type: String,
        default: 'deposit'
      },
      
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
      },
      name: {
        type: String,
        default: 'any'
      },
      email: {
        type: String,
        default: 'any'
      },
      walletAddress: {
        type: String,
        required: true,
        default: "any"

      },
      transactionHash: {
        type: String,
      },
      timestamp: {
        type: Date,
        default: Date.now
      }

},

{ timestamps: true }


);

const DdepositModel = mongoose.model("withdraw", DdepositSchema);
module.exports = DdepositModel;