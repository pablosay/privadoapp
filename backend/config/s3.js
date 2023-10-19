const dotenv = require('dotenv').config('')

const { Upload } = require("@aws-sdk/lib-storage"),{S3} = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require('uuid');

const bucketName = process.env.AWS_S3_BUCKET_NAME
const region = process.env.AWS_S3_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_PRIVATE_KEY

const s3 = new S3({
    
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
      }
    
})

function uploadFile(buffer) {

    const uuid = uuidv4();
    
    const uploadParams = {

        Bucket: bucketName,
        Body: buffer,
        Key: uuid

    }
    
    return new Upload({

        client: s3,

        params: uploadParams

    }).done();

}

exports.uploadFile = uploadFile

async function getFileStream(fileKey) {

    const downloadParams = {

        Key: fileKey,
        Bucket: bucketName

    }

    return await s3.getObject(downloadParams);

}

exports.getFileStream = getFileStream

function deleteFile(fileKey) {
    
    const deleteParams = {

        Key: fileKey,
        Bucket: bucketName

    }
    
    return s3.deleteObject(deleteParams);

}

exports.deleteFile = deleteFile;


