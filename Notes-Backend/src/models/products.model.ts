import mongoose, { Schema, Document} from "mongoose";


interface ProductsSchema extends Document{
    title: string,
    amount: number,
    category: string,
    month: string,
    notes: string,
}


const productSchema = new mongoose.Schema<ProductsSchema>({
    title: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
        category: {
      type: String,
      required: true,
      trim: true,
    },
    
    month: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

}, { timestamps: true })


const productModel = mongoose.models.Products || mongoose.model<ProductsSchema>("Products", productSchema);

export default productModel;