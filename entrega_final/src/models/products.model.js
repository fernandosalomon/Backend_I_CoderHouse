import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 40,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      minLength: 2,
      maxLength: 100,
      trim: true,
      required: true,
    },
    code: {
      type: String,
      minLength: 6,
      maxLength: 16,
      uppercase: true,
      trim: true,
      required: true,
    },
    price: {
      type: mongoose.Types.Decimal128,
      min: 0,
      required: true,
    },
    status: {
      type: Boolean,
      defaut: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      minLength: 2,
      maxLength: 25,
      trim: true,
      required: true,
    },
    thumbnails: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
      default: ["/public/img/default_product.png"],
    },
  },
  { timestamps: true },
);

mongoose.plugin(paginate);

ProductSchema.index({ title: 1 }, { unique: true });
ProductSchema.index({ code: 1 }, { unique: true });

ProductSchema.index({ title: "text" });
ProductSchema.index({ description: "text" });

ProductSchema.index({ price: 1 });
ProductSchema.index({ category: 1 });

const Product = mongoose.model("Product", ProductSchema);

export default Product;
