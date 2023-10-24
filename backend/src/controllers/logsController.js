const db_connection = require('../../config/postgreSQLConnection');

const {verifyToken} = require('../../config/tokenManager')

const { uploadFile } = require('../../config/s3')

exports.registerNewEntry = async (req, res) => {
    
    verifyToken(req, res, async () => {
        
        let hour = req.body.hour
        let minute = req.body.minute
        let day = req.body.day
        let month = req.body.month
        let year = req.body.year
        let name = req.body.name
        
        const query = `INSERT INTO entries (person_name, hour, minute, day, month, year) VALUES ($1, $2, $3, $4, $5, $6)`
        
        const data = [name, hour, minute, day, month, year]
        
        try {
            
            await db_connection.query(query, data)
            
            res.json({"message": "Entry registed"})
            
        } catch (error) {
            
            res.json({"message": "Couldn't register"})
            
        }
        
    })

}

exports.registerNewSpoof = async (req, res) => {
    
    verifyToken(req, res, async () => {
        
        let hour = req.body.hour
        let minute = req.body.minute
        let day = req.body.day
        let month = req.body.month
        let year = req.body.year
        let name = req.body.name
        let image = req.body.image
        
        try {
            
            const bufferImage = Buffer.from(image, 'base64');
            
            const result = await uploadFile(bufferImage)
            
            try {
                
                const image = result.Key
                
                const queryInsertImage = `INSERT INTO intruders (person_name, hour, minute, day, month, year, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`
                
                const valuesInsertImage = [name, hour, minute, day, month, year, image]
                
                await db_connection.query(queryInsertImage, valuesInsertImage)
                
                res.json({"message": "Intruder registed"})
                
            } catch (imageDBerror) {
                
                console.log(imageDBerror)
                
                res.json({"message":"Couldn't inser new image. User register"})
                
            }
            
        } catch (s3error) {
            
            console.log(s3error)
            
            res.json({"message":"Error on uploading image to S3."})
            
        } 
        
    })

}

exports.getEntries = async (req, res) => {
    
    verifyToken(req, res, async () => {
        
        const query = `SELECT person_name, hour, minute, day, month, year FROM entries`;
        
        try {
            
            const response = await db_connection.query(query)
            
            res.json({"message": "Successfully retrived", "entries": response.rows})
            
        } catch (error) {
            
            res.json({"message": "Error"})
            
        }
        
    });
    
}

exports.getIntrudersLog = async (req, res) => {
    
    verifyToken(req, res, async () => {
        
        const query = `SELECT person_name, hour, minute, day, month, year, image FROM intruders`;
        
        try {
            
            const response = await db_connection.query(query)
            
            res.json({"message": "Successfully retrived", "intruders": response.rows})
            
        } catch (error) {
            
            res.json({"message": "Error"})
            
        }
        
    })
    
}