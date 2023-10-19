const { getFileStream } = require('../../config/s3')


exports.getPipedImage = async (req, res) => {
    
    const key = req.params.key
    
    try {
        
        const s3object = getFileStream(key)
        
        ;(await s3object).Body.pipe(res)
        
    } catch (error) {
        
        console.log(error)
        
        res.status(500).end('Internal Server Error')
        
    }
    
}