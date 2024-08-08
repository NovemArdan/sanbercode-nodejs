import express from 'express';
import { single, multiple } from './middlewares/upload.middleware';
import { handleUpload } from './utils/cloudinary';
import categoriesController from './controllers/categories.controller';
import productsController from './controllers/product.controller'; // Make sure the controller is correctly named
import * as orderController from './controllers/order.controller'; // Import order controllers

const router = express.Router();

// Route for single file upload
router.post('/upload/single', single, async (req, res) => {
    if (!req.file || !req.file.buffer) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    try {
        const result = await handleUpload(req.file.buffer);
        res.json({ message: 'File uploaded successfully!', data: result });
    } catch (error: any) { // Type the error as any or as a specific type if known
        res.status(500).json({ message: 'Failed to upload image', error: error.message });
    }
});

// Route for multiple file uploads
router.post('/upload/multiple', multiple, async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded.' });
    }
    try {
        const results = await Promise.all(
            (req.files as Express.Multer.File[]).map(file => {
                if (file.buffer) {
                    return handleUpload(file.buffer);
                } else {
                    throw new Error("Buffer is missing in one of the files");
                }
            })
        );
        res.json({ message: 'Files uploaded successfully!', data: results });
    } catch (error: any) { // Type the error as any or as a specific type if known
        res.status(500).json({ message: 'Failed to upload images', error: error.message });
    }
});

// CRUD operations for Categories
router.get("/categories", categoriesController.findAll);
router.post("/categories", categoriesController.create);
router.get("/categories/:id", categoriesController.findOne);
router.put("/categories/:id", categoriesController.update);
router.delete("/categories/:id", categoriesController.delete);

// CRUD operations for Products
router.get("/products", productsController.findAll);
router.post("/products", productsController.create);
router.get("/products/:id", productsController.findOne);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.delete);

// Routes for Order Management
router.post('/orders', orderController.createOrder);
router.get('/orders/user/:userId', orderController.findOrdersByUser);

export default router;
