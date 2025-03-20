import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  emailId: String,
  deliveryDate: String,
});

export default mongoose.model("Order", orderSchema);
