const { model } = require("mongoose")
const grid = require('gridfs-stream')
const mongoose = require('mongoose')

const URL = 'http://localhost:8000';

const conn = mongoose.connection;

let gfs;

conn.once('open', () => {
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
})

const uploadFile = async (req, res) => {
    // console.log("uploadFile: ", req.headers)
    try {
        if(!req.file) 
        return res.status(404).json("file not found")
        const imgUrl = URL +'/file/'+ req.file.filename
        // console.log("imgUrl ",imgUrl)
        res.status(200).json(
            imgUrl
        )
    } catch (error) {
        res.status(500).json("error: " + error)
    }
    
} 

const getImage = async (req, res) => {
    try {
        // console.log("ic getImage: ", req.body)
        // console.log("filename: ", req.params.filename)
        const file = await gfs.files.findOne({filename: req.params.filename})
        // console.log("ic file: ", file)
        const readStream = gfs.createReadStream(file.filename)
        readStream.pipe(res)
    } catch (error) {
        console.log("", error)
        res.status(500).json("error" + error)
    }
}

module.exports = {uploadFile, getImage}