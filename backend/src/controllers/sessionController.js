const db_connection = require('../../config/postgreSQLConnection')

const {generateAccessToken, generateRefreshToken, verifyToken} = require('../../config/tokenManager')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

let refreshTokens = [];

exports.login =  async (req, res) =>{

    let device = req.body.device

    let password = req.body.password

    const query = `SELECT password FROM device WHERE model = $1`

    const data = [device]

    try {

        const rows = await db_connection.query(query, data)

        const hash = rows.rows[0].password

        try {

            if(await bcrypt.compare(password, hash)){

                const accessToken = generateAccessToken(device)

                const refreshToken = generateRefreshToken(device)

                refreshTokens.push(refreshToken)

                res.json({"message": "Logged in", "authorizationToken": accessToken, "refreshToken": refreshToken})

            } else {

                res.json({"message": "Incorrect password"})

            }
            
        } catch (errorToken) {

            console.log(errorToken)

            res.json({"message": "Error comparing passwords"})
            
        }


    } catch (error) {

        res.json({"message": "Device name error"})
        
    }

}

exports.verify = async (req, res) => {

    verifyToken(req, res, () => {

        res.json({"message": "Token accepted"})

    });

}

exports.refreshToken = async (req, res) => {

    const refreshToken = req.body.token

    if(!refreshToken) {

        res.json({"message": "There is no  token"})

    }

    if(!refreshTokens.includes(refreshToken)) {

        res.json({"message": "Refresh token not register."})

    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, decoded) => {

        if(err) {

            console.log(err)

            res.json({"message": "Error trying to verify the refresh token."})

        }

        refreshTokens = refreshTokens.filter((token) => token != refreshToken);

        const newAccessToken = generateAccessToken(decoded.device);

        const newRefreshedToken = generateRefreshToken(decoded.device);

        refreshTokens.push(newRefreshedToken);

        res.json({"message": "Token refreshed", "authorizationToken": newAccessToken, "refreshToken": newRefreshedToken });

    });


}

exports.logOut = async (req, res) => {

    if(!req.body.token) {

        res.json({"message": "There is no  token"})

    }

    const refreshToken = req.body.token

    refreshTokens = refreshTokens.filter((token) => token != refreshToken);

    res.json({"message":"Logged out"})

}
