const axios = require('axios');

const https = require('https');

const {verifyToken} = require('../../config/tokenManager')

const db_connection = require('../../config/postgreSQLConnection');

const device = require('../../config/realTimeDatabase');

exports.updateEmbeddingsForProcessingServer = async (req, res) => {
    
    verifyToken(req, res, async () => {
        
        try {
            
            const snapshot = await device.child('ip').once('value');
            
            const ip = snapshot.val();
            
            if(ip) {
                
                const url =  ip + '/updateEmbeddings';
                
                const agent = new https.Agent({ rejectUnauthorized: false });
                
                try {
                    
                    const response = await axios.get(url, { httpsAgent: agent });
                    
                    console.log("Llego notificacion")
                    
                    res.json({"message": response.data.message})
                    
                } catch (processingError) {
                    
                    console.log(processingError)
                    
                    res.json({"message":"Error"})
                    
                }
                
            }
            
        } catch (rtdberror) {
            
            console.log(rtdberror)
            
            res.json({"message":"Error"})
            
        }
        
    })
    
    
    
};

exports.getAllEmbeddings = async (req, res) => {

    verifyToken(req, res, async () => {
        
        const query = `SELECT authorized_persons.name AS person_name, embeddings.embedding_data AS embedding FROM authorized_persons JOIN images ON authorized_persons.id = images.person_id JOIN embeddings ON images.id = embeddings.image_id`
        
        try {
            
            const rows = await db_connection.query(query);
            
            console.log("Enviando embeddings")
            
            res.json({"message": "Sucessfully obtained", "embeddings":rows.rows})
            
        } catch (errorDB) {
            
            console.log(errorDB)
            
            res.json({"message":"Error"})
            
        }
        
    })
    
}

