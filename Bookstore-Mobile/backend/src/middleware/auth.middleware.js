import jwt from 'jsonwebtoken';
import User from "../models/Users.js" // Adjust the path to your User model

// const response = await fetch('https://localhost/3000/api/books', {
//     method: 'POST',
//     body: JSON.stringify({
//         title,
//         caption,
//     }),
//     headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//     }
// });
const protectRoute = async (req, res, next) => {
    try{ 
        //GET TOKEN
      const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }
        //VERIFY TOKEN
        const decoded = jwt.verify(token, "62292246f54e450fa0268ad0cfeff968d7a4baa93391673e34233a212344bdc220ecfb8f989009080c0c55542af18150c392e268e9f83d02ddf913eb9287392a");
        //find user 
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }
        req.user = user;
        next(); // Attach the user to the request object for later use


    }catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
}

export default protectRoute;