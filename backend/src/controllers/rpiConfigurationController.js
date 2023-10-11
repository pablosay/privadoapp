const device = require('./../../config/realTimeDatabase')

exports.updateWhatsAppNumber = (req, res) => {

    let number = req.body.number

    device.child('whatsappnumber').set(number).then(() => {

        res.json({"message": "Successfully updated"})


    }).catch(error => {

        console.log(error)

        res.status(500).json({"message": "Error on updating from server"})

    })

}

exports.updateProcessingServerIP = (req, res) => {

    let number = req.body.ip


    device.child('ip').set(number).then(() => {

        res.json({"message": "Successfully updated"})


    }).catch(error => {

        console.log(error)

        res.status(500).json({"message": "Error on updating from server"})

    })

}

exports.updateVigilanceTime = (req, res) => {

    let start = req.body.start
    
    let end = req.body.end

    device.child('startinterval').set(start).then(() => {

        device.child('endinterval').set(end).then(()=> {

            res.json({"message": "Successfully updated time interval"})

        })

    }).catch(error => {

        console.log(error)

        res.status(500).json({"message": "Error on updating from server"})

    })

}
