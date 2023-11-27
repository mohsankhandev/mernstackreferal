const mongoose = require("mongoose");

const DepositSchema = mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },

      amount: {
        type: Number,
        required: true,
        default: 0

      },
      mood: {
        type: String,
        default: 'withdraw'
      },
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
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

const DepositModel = mongoose.model("deposit", DepositSchema);
module.exports = DepositModel;