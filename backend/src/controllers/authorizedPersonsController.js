const db_connection = require('../../config/postgreSQLConnection');

const {verifyToken} = require('../../config/tokenManager')

const { uploadFile, deleteFile } = require('../../config/s3')

const device = require('../../config/realTimeDatabase');

const axios = require('axios');

const https = require('https');


exports.registerNewAuthorizedPerson = async (req, res) => {
    
    verifyToken(req, res, async () => {
        
        let name = req.body.name;
        
        let images = req.body.images;
        
        try {
            
            const snapshot = await device.child('ip').once('value');
            
            const ip = snapshot.val();
            
            if (ip) {
                
                try {
                    
                    const fastApiUrl = 'https://' + ip + ':1500/getEmbeddingsFromBase64Images';
                    
                    const agent = new https.Agent({ rejectUnauthorized: false });
                    
                    const requestData = { images: images };
                    
                    const response = await axios.post(fastApiUrl, requestData, { httpsAgent: agent });
                    
                    if (response.data.message === 'Successful') {
                        
                        const embeddings = response.data.embeddings;
                        
                        const parsedArray = JSON.parse(embeddings);
                        
                        const arrayOfStrings = parsedArray.map(innerArray => JSON.stringify(innerArray));
                        
                        if(arrayOfStrings.length == images.length){
                            
                            try {
                                
                                const queryInsertNewAuthorizedPerson = `INSERT INTO authorized_persons (name) VALUES ($1) RETURNING id`;
                                
                                const values = [name]
                                
                                const rowsInsert = await db_connection.query(queryInsertNewAuthorizedPerson, values);
                                
                                const authorizedPersonId = rowsInsert.rows[0].id;
                                
                                if(authorizedPersonId) {
                                    
                                    for (let index = 0; index < arrayOfStrings.length; index++) {
                                        
                                        console.log("Trying image and embedding: ", index)
                                        
                                        const image = images[index];
                                        
                                        const embedding = arrayOfStrings[index];
                                        
                                        const bufferImage = Buffer.from(image, 'base64');
                                        
                                        try {
                                            
                                            const result = await uploadFile(bufferImage)
                                            
                                            try {
                                                
                                                const imageData = result.Key
                                                
                                                const queryInsertImage = `INSERT INTO images (person_id, image_data) VALUES ($1, $2) RETURNING id`
                                                
                                                const valuesInsertImage = [authorizedPersonId, imageData]
                                                
                                                const rowsInsertImage = await db_connection.query(queryInsertImage, valuesInsertImage)
                                                
                                                const imageId = rowsInsertImage.rows[0].id
                                                
                                                if(imageId) {
                                                    
                                                    try {
                                                        
                                                        const queryInsertEmbedding = `INSERT INTO embeddings (image_id, embedding_data) VALUES ($1, $2)`
                                                        
                                                        const valuesInsertEmbedding = [imageId, embedding]
                                                        
                                                        await db_connection.query(queryInsertEmbedding, valuesInsertEmbedding)
                                                        
                                                        
                                                    } catch (error) {
                                                        
                                                        console.log("Error register embedding: ", error)
                                                        
                                                        res.json({"message": "Couldn't register the embedding, image may not have an embedding."})
                                                        
                                                    }
                                                    
                                                    
                                                } else {
                                                    
                                                    res.json({"message":"Couldn't get new image ID."})
                                                    
                                                }
                                                
                                            } catch (imageDBerror) {
                                                
                                                console.log(imageDBerror)
                                                
                                                res.json({"message":"Couldn't inser new image. User register"})
                                                
                                            }
                                            
                                        } catch (s3error) {
                                            
                                            console.log(s3error)
                                            
                                            res.json({"message":"Error on uploading image in S3, user register."})
                                            
                                        }     
                                        
                                        
                                        
                                    }
                                    
                                    res.json({"message": "Successfully register"})
                                    
                                } else {
                                    
                                    res.json({"message":"Couldn't get new person ID."})
                                    
                                }
                                
                            } catch (errorInsert) {
                                
                                console.log("Error entry user query, ", errorInsert)
                                
                                res.json({ "message": "Couldn't insert new authorized person" });
                                
                            }
                            
                        } else {
                            
                            res.json({ "message": "Not all images detected a face" });
                            
                        }
                        
                        
                        
                    } else {
                        
                        res.json({ "message": "Couldn't get embeddings" });
                        
                    }
                    
                } catch (errorApi) {
                    
                    console.log("Error fast api:" ,errorApi)
                    
                    res.json({"message": "Couldn't reach processing server"})
                    
                }
                
            } else {
                
                res.json({ "message": "IP not found, so user no register" });
            }
            
        } catch (errorRTDB) {
            
            console.log("Error getting data from RTDB")
            
            res.json({ "message": "Couldn't find the real time database." });
            
        }
        
    })
    
};

exports.getAuthorizedPersons =  async (req, res) => {
    
    verifyToken(req, res, async () => {
        
        try {
            
            const getAuthorizedQuery = `SELECT * FROM authorized_persons`
            
            const rows = await db_connection.query(getAuthorizedQuery)
            
            
            res.json({"message": "Obtained successfully", "authorizedUsers": rows.rows})
            
        } catch(error) {
            
            res.json({"message": "Error at getting authorized persons. Server side."})
            
        }
        
    })
    
}


exports.deleteAuthorizedPerson = async (req, res) => {
    
    verifyToken(req, res, async () => {
        
        try {
            
            let personId = req.body.id
            
            try {
                
                const getImagesKeyFromIdQuery = `SELECT image_data FROM images WHERE person_id = $1`
                
                const dataImageKey = [personId]
                
                const imageDataRows = await db_connection.query(getImagesKeyFromIdQuery, dataImageKey);
                
                for (let index = 0; index < imageDataRows.rows.length; index++) {
                    
                    const key = imageDataRows.rows[index].image_data;
                    
                    try {
                        
                        await deleteFile(key)
                        
                    } catch (errorDeletingFileAws) {
                        
                        console.log(errorDeletingFileAws)
                        
                        res.json({"message": "Error deleting file in AWS S3"})
                        
                    }
                    
                }
                
                const deleteAuthorizedPersonQuery = `DELETE FROM authorized_persons WHERE id = $1`
                
                const data = [personId]
                
                try {
                    
                    await db_connection.query(deleteAuthorizedPersonQuery, data)
                    
                    res.json({"message": "Successfully deleted"})
                    
                } catch (errorDeletingPerson) {
                    
                    res.json({"message": "Error deleting user from DB"})
                    
                }
                
            } catch (error1) {
                
                console.log(error1)
                
                res.json({"message": "Error getting user information for completing elimination. "})
                
            }
            
        } catch (error) {
            
            console.log(error)
            
            res.json({"message": "Error trying to delete authorized person information"})
            
        }
        
    })  
    
}

exports.getImagesFromAuthorizedPerson = async (req, res) => {
    
    verifyToken(req, res, async () => {
        
        let id = req.params.id
        
        try {
            
            const query = `SELECT id , image_data FROM images WHERE person_id = $1`;
            
            const data = [id]
            
            const rows = await db_connection.query(query, data)
            
            const images = rows.rows
            
            res.json({"message": "Obtained successfully", "images": images})
            
        } catch (error) {
            
            console.log(error)
            
            res.json("message", "Couldn't get images from authorized person")
            
        }
        
    })
    
}

exports.deteleImageFromAuthorizedPerson = async (req, res) => {
    
    verifyToken(req, res, async () => {
        
        let imageId = req.params.id
        
        let imageKey = req.params.key
        
        try {
            
            await deleteFile(imageKey)
            
            try {
                
                const query = `DELETE FROM images WHERE id = $1`
                
                const data = [imageId]
                
                await db_connection.query(query, data)
                
                res.json({"message": "Successfully deleted"})
                
            } catch (error) {
                
                res.json({"message": "Error on deleting image in DB."})
                
            }
            
        } catch (errorS3) {
            
            console.log("S3 error:" , errorS3)
            
            res.json({"message": "Error deleting on S3 bucket."})
            
        }
        
    })
    
}

exports.uploadSingleImageFromAuthorizedPerson = async (req, res) => {
    
    verifyToken(req, res, async () => {
        
        let id = req.body.id;
        
        let images = req.body.images;
        
        try {
            
            const snapshot = await device.child('ip').once('value');
            
            const ip = snapshot.val();
            
            if (ip) {
                
                try {
                    
                    const fastApiUrl = 'https://' + ip + ':1500/getEmbeddingsFromBase64Images';
                    
                    const agent = new https.Agent({ rejectUnauthorized: false });
                    
                    const requestData = { images: images };
                    
                    const response = await axios.post(fastApiUrl, requestData, { httpsAgent: agent });
                    
                    if (response.data.message === 'Successful') {
                        
                        const embeddings = response.data.embeddings;
                        
                        const parsedArray = JSON.parse(embeddings);
                        
                        const arrayOfStrings = parsedArray.map(innerArray => JSON.stringify(innerArray));
                        
                        if(arrayOfStrings.length == images.length){
                            
                            for (let index = 0; index < arrayOfStrings.length; index++) {
                                
                                console.log("Trying image and embedding: ", index)
                                
                                const image = images[index];
                                
                                const embedding = arrayOfStrings[index];
                                
                                const bufferImage = Buffer.from(image, 'base64');
                                
                                try {
                                    
                                    const result = await uploadFile(bufferImage)
                                    
                                    try {
                                        
                                        const imageData = result.Key
                                        
                                        const queryInsertImage = `INSERT INTO images (person_id, image_data) VALUES ($1, $2) RETURNING id`
                                        
                                        const valuesInsertImage = [id, imageData]
                                        
                                        const rowsInsertImage = await db_connection.query(queryInsertImage, valuesInsertImage)
                                        
                                        const imageId = rowsInsertImage.rows[0].id
                                        
                                        if(imageId) {
                                            
                                            try {
                                                
                                                const queryInsertEmbedding = `INSERT INTO embeddings (image_id, embedding_data) VALUES ($1, $2)`
                                                
                                                const valuesInsertEmbedding = [imageId, embedding]
                                                
                                                await db_connection.query(queryInsertEmbedding, valuesInsertEmbedding)
                                                
                                            } catch (error) {
                                                
                                                console.log("Error register embedding: ", error)
                                                
                                                res.json({"message": "Couldn't register the embedding, image may not have an embedding."})
                                                
                                            }
                                            
                                        } else {
                                            
                                            res.json({"message":"Couldn't get new image ID."})
                                            
                                        }
                                        
                                    } catch (imageDBerror) {
                                        
                                        console.log(imageDBerror)
                                        
                                        res.json({"message":"Couldn't inser new image. User register"})
                                        
                                    }
                                    
                                } catch (s3error) {
                                    
                                    console.log(s3error)
                                    
                                    res.json({"message":"Error on uploading image in S3, user register."})
                                    
                                }     
                                
                            }
                            
                            res.json({"message": "Successfully uploaded"})
                            
                        } else {
                            
                            res.json({ "message": "Not all images detected a face" });
                            
                        }
                        
                    } else {
                        
                        res.json({ "message": "Couldn't get embeddings" });
                        
                    }
                    
                } catch (errorApi) {
                    
                    console.log("Error fast api:" ,errorApi)
                    
                    res.json({"message": "Couldn't reach processing server"})
                    
                }
                
            } else {
                
                res.json({ "message": "IP not found, so user no register" });
            }
            
        } catch (errorRTDB) {
            
            console.log("Error getting data from RTDB")
            
            res.json({ "message": "Couldn't find the real time database." });
            
        }
        
    })
    
}
