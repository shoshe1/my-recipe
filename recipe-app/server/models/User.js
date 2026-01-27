const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , 'please enter your name'],
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username cannot exceed 30 characters'],

    },  

email: {

        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        trim: true,
        lowercase: true,
          match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]

},

password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false

},

createdAt:{
    type: Date,
    default: Date.now
}},
{
    timestamps: true
});


userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return ;
    }

    
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      
});
userSchema.methods.matchPassword = async function(candidatePassword) {
    try{
        return await bcrypt.compare(candidatePassword, this.password);
    }
    catch (error)
    {
        throw error;
    }
};

userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model('User', userSchema);