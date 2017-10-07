const User = require("../models/user");
const bcrypt   = require('bcrypt-nodejs');


let generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

let insertUser = async(user) => {

    try{
        return await User
            .create(
                {
                    email : user.email,
                    password: generateHash(user.password),
                    phone: user.phone,
                    name: user.name
                }
            );

    }catch(err){
        console.error(err);
        return ({errorMsg: err.message})
    }
};


module.exports = {insertUser};