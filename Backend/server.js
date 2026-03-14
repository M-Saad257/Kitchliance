import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { createServer } from 'http';
import { Server } from 'socket.io';
import fs from "fs";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Frontend port
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// MongoDB Connection
const mongoURI = 'mongodb+srv://saadprocoder_db_user:wkr2PwGTxrVZfSed@kitchliance.do6pail.mongodb.net/kitchliance';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Schemas
const productSchema = new mongoose.Schema({
    title: String,
    category: String,
    price: Number,
    rating: Number,
    featured: Boolean,
    image: String,
    images: [String],
    longDescription: String,
    link: String,
});

const blogSchema = new mongoose.Schema({
    title: String,
    excerpt: String,
    date: String,
    image: String,
});

const reviewSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    comment: String,
    date: String,
});

const Product = mongoose.model('Product', productSchema);
const Blog = mongoose.model('Blog', blogSchema);
const Review = mongoose.model('Review', reviewSchema);

// Routes for Products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/products', upload.array('images', 10), async (req, res) => {
    try {
        const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
        const product = new Product({
            title: req.body.title,
            category: req.body.category,
            price: parseFloat(req.body.price) || 0,
            rating: parseFloat(req.body.rating) || 0,
            featured: req.body.featured === 'on' || req.body.featured === 'true',
            image: imageUrls[0] || '',
            images: imageUrls,
            longDescription: req.body.longDescription,
            link: req.body.link
        });
        await product.save();
        io.emit('productAdded', product);
        res.json(product);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        io.emit('productUpdated', product);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        io.emit('productDeleted', req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Routes for Blogs
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/blogs', upload.single('image'), async (req, res) => {
    try {
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
        const blog = new Blog({
            ...req.body,
            image: imageUrl
        });
        await blog.save();
        io.emit('blogAdded', blog);
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        io.emit('blogUpdated', blog);
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        io.emit('blogDeleted', req.params.id);
        res.json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Routes for Reviews
app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/reviews', async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        io.emit('reviewAdded', review);
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        io.emit('reviewUpdated', review);
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/reviews/:id', async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        io.emit('reviewDeleted', req.params.id);
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
