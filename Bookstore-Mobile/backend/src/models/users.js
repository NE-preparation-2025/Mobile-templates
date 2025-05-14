import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage:{
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Duser%2Bicon&psig=AOvVaw3NXI8lWm2jys0_wkM2boXc&ust=1745793496276000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJjBmtvh9owDFQAAAAAdAAAAABAEg',


    },
    
  

},
{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;
