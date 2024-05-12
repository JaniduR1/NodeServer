const service = require('../services/userService')


const register = async (req, res) => {
    
    try {
        const user = await service.register(req.body);
        res.status(201).json({ message: "User created successfully", data: user });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const login = async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;
    try {
        const user = await service.login(username, password);
        if (!user) {
            res.status(404).send({ error: "User not found" });
        } else {
            res.status(200).send({ message: "User found", data: user });
        }
    } catch (err) {
        res.status(500).send({ error: "Server error" });
    }
};

module.exports={
    login,register
}