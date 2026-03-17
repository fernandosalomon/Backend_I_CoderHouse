import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
      }
    ],
  },
  { timestamp: true },
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;