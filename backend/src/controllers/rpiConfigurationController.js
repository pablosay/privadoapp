const device = require('./../../config/realTimeDatabase')

const dotenv = require('dotenv').config()

const {verifyToken} = require('../../config/tokenManager')

exports.updateWhatsAppNumber = (req, res) => {
    
    verifyToken(req, res, async () => {
        
        let number = req.body.number
        
        device.child('whatsappnumber').set(number).then(() => {
            
            res.json({"message": "Successfully updated"})
            
            
        }).catch(error => {
            
            console.log(error)
            
            res.status(500).json({"message": "Error on updating from server"})
            
        })
        
    })
    
}

exports.updateProcessingServerIP = (req, res) => {
    
    verifyToken(req, res, async () => {
        
        let ip = req.body.ip
        
        device.child('ip').set(ip).then(() => {
            
            res.json({"message": "Successfully updated"})
            
            
        }).catch(error => {
            
            console.log(error)
            
            res.status(500).json({"message": "Error on updating IP from server"})
            
        })
        
    })
    
}

exports.updateVigilanceTime = (req, res) => {
    
    verifyToken(req, res, async () => {
        
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
        
    })
    
}

exports.getWhatsAppNumber = (req, res) => {
    
    verifyToken(req, res, async () => {
        
        device.child('whatsappnumber').once('value').then((snapshot)=> {
            
            const number = snapshot.val();
            
            if (number) {
                
                res.json({ "messsage": "Successfully obtained", "number": number });
                
            } else {
                
                res.status(404).json({ "message": "WhatsApp number not found" });
                
            }
            
        }).catch(error => {
            
            console.error(error);
            
            res.status(500).json({ "message": "Error fetching WhatsApp number from the server" });
            
        });
        
    })
    
}

exports.getIp = (req, res) => {
    
    verifyToken(req, res, async () => {
        
        device.child('ip').once('value').then((snapshot)=> {
            
            const ip = snapshot.val();
            
            if (ip) {
                
                res.json({ "messsage": "Successfully obtained", "ip": ip });
                
            } else {
                
                res.status(404).json({ "message": "IP not found" });
                
            }
            
        }).catch(error => {
            
            console.error(error);
            
            res.status(500).json({ "message": "Error fetching WhatsApp number from the server" });
            
        });
        
    })
    
}

exports.getVigilanceTime = (req, res) => {
    
    verifyToken(req, res, async () => {
        
        device.child('startinterval').once('value').then((snapshot)=> {
            
            const start = snapshot.val();
            
            if (start) {
                
                device.child('endinterval').once('value').then((snapshot2) => {
                    
                    const end = snapshot2.val()
                    
                    if(end) {
                        
                        res.json({"message": "Successfully obtained", "start":start, "end":end})
                        
                    } else {
                        
                        res.status(404).json({ "message": "Couldn't get the end parameter" });
                        
                    }
                    
                })
                
            } else {
                
                res.status(404).json({ "message": "Couldn't get the start parameter" });
                
            }
            
        }).catch(error => {
            
            console.error(error);
            
            res.status(500).json({ "message": "Error fetching WhatsApp number from the server" });
            
        });
        
    })
    
}


exports.activateDevice = (req, res) => {
    
    verifyToken(req, res, async () => {
        
        device.child('status').set('active').then(() => {
            
            res.json({"message": "Successfully updated"})
            
            
        }).catch(error => {
            
            console.log(error)
            
            res.status(500).json({"message": "Error on updating from server"})
            
        })
        
    }) 
    
}

exports.getStatus = (req, res) => {
    
    verifyToken(req, res, async () => {
        
        device.child('status').once('value').then((snapshot)=> {
            
            const status = snapshot.val();
            
            if (status) {
                
                res.json({ "message": "Successfully obtained", "status": status });
                
            } else {
                
                res.status(404).json({ "message": "Status not found" });
                
            }
            
        }).catch(error => {
            
            console.error(error);
            
            res.status(500).json({ "message": "Error fetching WhatsApp number from the server" });
            
        });

    })
    
}
