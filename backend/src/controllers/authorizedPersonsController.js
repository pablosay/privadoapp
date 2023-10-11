

exports.registerNewAuthorizedPerson = (req, res) => {

    let name = req.body.name

    let images = req.body.images 

    console.log(name)

    console.log(images)

    res.json({"message": "Successfully updated"})



}