require('dotenv').config();
const jwt = require('jsonwebtoken');


const tokenGenerator = (user) => {
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY);
    return token;
}

module.exports = tokenGenerator;