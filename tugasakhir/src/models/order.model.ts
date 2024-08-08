import mongoose, { Document, Schema } from 'mongoose';

interface OrderItem {
  name: string;
  productId: mongoose.Types.ObjectId;
  price: number;
  quantity: number;
}

interface OrderDocument extends Document {
  grandTotal: number;
  orderItems: OrderItem[];
  createdBy: mongoose.Types.ObjectId;
  status: 'pending' | 'completed' | 'cancelled';
}

const orderItemSchema = new Schema<OrderItem>({
  name: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1, max: 5 }
});

const orderSchema = new Schema<OrderDocument>({
  grandTotal: { type: Number, required: true },
  orderItems: [orderItemSchema],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

const Order = mongoose.model<OrderDocument>('Order', orderSchema);

export default Order;
