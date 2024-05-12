const userRepository = require('../repositories/userRepository')
const bcrypt = require('bcrypt')


const register = async (userdata) => {
    const user = userdata;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt)
    return await userRepository.register(user);
};

const login = async (username, password) => {
    console.log(username)
    const user = await userRepository.login(username);
    if(!user){
        console.log("1")
        return null;
    }
    if (await bcrypt.compare(password,user.password)) {

        return user;
    }
    return null;
   
};

module.exports={
    register,
    login
}