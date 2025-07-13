// src/models/Claim.js
import mongoose from "mongoose";
const claimSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    points: { type: Number, required: true },
  },
  { timestamps: true }
);
export default mongoose.model("Claim", claimSchema);
