const {getUser} = require("../service/auth")


function checkForAuthorizaion(req , res , next){
    req.user = null;   
    const authorizationHeaderValue = req.headers["authorization"];
    if (
        !authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer')
    )
    return next();

    const token = authorizationHeaderValue.split("Bearer ")[1];
    const user = getUser(token);

    req.user = user;
    next();
}


function restrictTo(roles = []){
    return function(req , res , next){
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role))
         return res.end("Unauthorized") 
        return next();
    };
};

module.exports = {
    checkForAuthorizaion,
    restrictTo,
} 