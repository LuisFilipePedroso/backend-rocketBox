const Box = require('../models/Box')
const File = require('../models/File')

class FileController {

    async store(req, res) {
        const { originalname: title, key: path } = req.file

        const box = await Box.findById(req.params.id)

        const file = await File.create({
            title,
            path
        })

        box.files.push(file)

        await box.save()

        req.io.sockets.in(box._id).emit('file', file)

        return res.send(file)
    }
}

module.exports = new FileController()