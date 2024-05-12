const User = require('../models/userModel')


const register = async(user)=>{
    return await User.create(user);
}

const login = async (username) => {
    return await User.findOne({ username: username});
};


module.exports={
    register,
    login
}