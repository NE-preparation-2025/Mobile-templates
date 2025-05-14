import express from 'express';
const router = express.Router(); 
import User from '../models/Users.js'; // Adjust the path to your User model
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating JWT tokens
import dotenv from 'dotenv'; // For loading environment variables
dotenv.config(); // Load environment variables from .env file
const generateToken = (userId) => {
 return   jwt.sign({userId },"62292246f54e450fa0268ad0cfeff968d7a4baa93391673e34233a212344bdc220ecfb8f989009080c0c55542af18150c392e268e9f83d02ddf913eb9287392a", { expiresIn: '30d' });
}

router.post('/register',async (req, res) => {
   try{
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if(password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    if(!email.includes('@')) {
        return res.status(400).json({ message: 'Invalid email address' });
    }
    if(username.length < 3) {
        return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }

    // Check if user already exists in the database
 const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        } 
    // Hash the password before saving it to the database
    
    // Check if email already exists in the database

  const existingEmail= await User.findOne({email: email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }      
 const hashedPassword = await bcrypt.hash(password, 10);
 //compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Create a new user in the database


 const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profileImage: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Duser%2Bicon&psig=AOvVaw3NXI8lWm2jys0_wkM2boXc&ust=1745793496276000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJjBmtvh9owDFQAAAAAdAAAAABAE',
        });
        await newUser.save();
        
        const token= generateToken(newUser._id); // Generate a token for the user
        res.status(201).json({ message: 'User registered successfully', token,user:{_id:newUser._id, username:newUser.username,email:newUser.email,profileImage:newUser.profileImage} }); // Send the token in the response
    
   }catch (error) {
       console.error('Error during registration:', error);
       res.status(500).json({ message: 'Internal server error' });
   }
});

router.post('/login',async(req, res) => {
    try {
    // Handle login logic here
    const {email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    //check if the user exists in the database
       const user = await User.findOne({ email: email });
       if (!user) {
           return res.status(400).json({ message: 'Invalid credentials' });
       }
       //check if the password is correct
       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
           return res.status(400).json({ message: 'Invalid credentials' });
       }
       const token = generateToken(user._id);
       res.status(200).json({
           token,
           user:{
               id:user._id,
               username:user.username,
               email:user.email,
               profileImage:user.profileImage

           }
       })

   }catch (error) {
       console.error('Error during login:', error);
       res.status(500).json({ message: 'Internal server error' });
   }
  
    
});
router.post('/logout', async(req, res) => {
    
    
})
export default router;