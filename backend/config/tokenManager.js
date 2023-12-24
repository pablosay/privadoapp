const jwt = require('jsonwebtoken')

const generateAccessToken = (deviceName) => {

    return jwt.sign({device: deviceName}, process.env.JWT_TOKEN_KEY, {expiresIn: '24h'})
    
}

const generateRefreshToken = (deviceName) => {
    
    return jwt.sign({device: deviceName}, process.env.JWT_REFRESH_KEY);
    
}

const verifyToken  =  (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    
    if(authHeader){
        
        const token = authHeader.split(" ")[1];

        try {

            jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, user) => {
            
                if(err) {
                    
                    return res.json({"message": "Invalidad token"});
                    
                }
                
                next();
                
            });
            
        } catch (error) {

            console.log("Error: a ", error)

            
        }
        
    } else {
        
        return res.json({"message": "There is no token on the header"})
        
    }
}



module.exports = {
    
    generateAccessToken,
    generateRefreshToken,
    verifyToken
    
}