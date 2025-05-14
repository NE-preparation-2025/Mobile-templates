import express from 'express';
import Book from '../models/books.js'; // Adjust the path to your Book model
import cloudinary from '../lib/cloudinary.js'; // For image uploading
const router = express.Router();
import protectRoute from '../middleware/auth.middleware.js'; // For authentication middleware

//create
router.post('/',protectRoute, async (req, res) => {
    try {
         // Assuming req.user contains the authenticated user's information
        const { title, caption, image, rating, user } = req.body;
        if (!title || !caption || !image || !rating || !user) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //upload image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        const imageUrl = uploadResponse.secure_url;
        
        //save to database

        const newBook = new Book({
            title,
            caption,
            image:imageUrl,
            rating,
            user:req.user._id, // Assuming req.user contains the authenticated user's information
        });
        await newBook.save();
        res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//pagination => infinite loading
router.get('/',protectRoute, async (req, res) => {
//example call from react native - frontend
//const response = await fetch("http://localhost:3000/api/books?page=3&limit=5");
    try {
        const page= req.query.page || 1;
        const limit= req.query.limit || 5;
        const skip= (page - 1) * limit;
       const books= await Book.find()
       .sort({ createdAt: -1 })
       .skip(skip)
       .limit(limit)
       .populate('user', 'username profileImage');
       const totalBooks = await Book.countDocuments(); // Get the total number of books
       res.send({
        books,
        currentPage: page,
        totalBooks,
        totalPages: Math.ceil(totalBooks / limit),
    });
      
    //    .exec();
    //     res.status(200).json({ message: 'Books fetched successfully', books });
       
       
       
    } catch (error) {
        console.log("Error fetching books:", error);    
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
router.delete('/:id',protectRoute, async (req, res) => {
    try {
        const book= await Book.findById(req.params.id);
        if(!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        //check if the user is the owner of the book
        if(book.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        //delete image from cloudinary
        if(book.image && book.image.includes('cloudinary')) {
            try{
                const publicId = book.image.split('/').pop().split('.')[0]; // Extract the public ID from the URL
            await cloudinary.uploader.destroy(publicId); // Delete the image from Cloudinary
            }catch(error){
                console.log("Error deleting image from Cloudinary:", error);    
                return res.status(500).json({ message: 'Error deleting image from Cloudinary', error: error.message });
            }
           
        }
        await book.deleteOne();
        res.status(200).json({ message: 'Book deleted successfully' });

    }catch (error) {
        console.log("Error deleting book:", error);    
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
//get recommended books by the logged in user
router.get("/user", protectRoute, async (req, res) => {
    try{
        const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 }).populate('user', 'username profileImage');
         res.json(books)
       
    }catch(error) {
        console.log("Get user book error:", error);    
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



//update
// router.put('/:id', async (req, res) => {
//     try {
//         const { title, caption, image, rating } = req.body;
//         const updatedBook = await Book.findByIdAndUpdate(
//             req.params.id,
//             { title, caption, image, rating },
//             { new: true }
//         );  
//delete

export default router;