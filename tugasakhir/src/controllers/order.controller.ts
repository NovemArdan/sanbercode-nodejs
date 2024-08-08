import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Order from '../models/order.model';
import Product from '../models/products.model';
import { sendInvoiceEmail } from '../utils/email';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.body.userId); // Convert to ObjectId
        const { orderItems, customerEmail, customerName } = req.body;

        const grandTotal = orderItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

        // Validate and update product quantities
        for (let item of orderItems) {
            const product = await Product.findById(item.productId);
            if (!product || item.quantity > product.qty) {
                return res.status(400).json({ message: `Not enough stock for product: ${product?.name}` });
            }
            item.name = product.name; // Populate name
            product.qty -= item.quantity;
            await product.save();
        }

        // Create and save the order
        const order = new Order({
            grandTotal,
            orderItems,
            createdBy: userId,
            status: 'pending'
        });

        await order.save();

        // Send the invoice email
        await sendInvoiceEmail(
            order,
            customerEmail,
            customerName,
            'support@yourcompany.com', // Replace with your contact email
            'Your Company Name' // Replace with your company name
        );

        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Failed to create order", error: error.message });
        } else {
            res.status(500).json({ message: "Failed to create order", error: "Unknown error" });
        }
    }
};

export const findOrdersByUser = async (req: Request, res: Response) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId); // Convert to ObjectId
        const { page = 1, limit = 10 } = req.query;

        const orders = await Order.find({ createdBy: userId })
            .limit(parseInt(limit as string))
            .skip((parseInt(page as string) - 1) * parseInt(limit as string))
            .exec();

        const count = await Order.countDocuments({ createdBy: userId });

        res.status(200).json({
            orders,
            totalPages: Math.ceil(count / parseInt(limit as string)),
            currentPage: parseInt(page as string)
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Failed to retrieve orders", error: error.message });
        } else {
            res.status(500).json({ message: "Failed to retrieve orders", error: "Unknown error" });
        }
    }
};
