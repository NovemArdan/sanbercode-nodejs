//product.model.ts
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less than 1"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    slug: {  // Adding the slug field
      type: String,
      unique: true
    },
  },
  {
    timestamps: true,
  }
);

// Adding pre-save middleware to generate slug if not provided
ProductsSchema.pre("save", function (next) {
  // Only generate a slug when the name is changed, or a new product is created
  if (this.isModified('name') || this.isNew) {
    this.slug = this.name.toLowerCase().split(' ').join('-');
  }
  next();
});

const ProductsModel = mongoose.model("Products", ProductsSchema);

export default ProductsModel;
