const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const multer = require("multer")
const imagemodels = require("./models/imageModel.js")
const mangaModel = require("./models/mangaModel.js")
const fs = require('fs')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const CompassURI = "mongodb://localhost:27017/uploads"


const app = express()
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine",'ejs')
app.use(express.static('public'))


mongoose.connect(CompassURI).then(()=>{
    console.log(`MongoDB connected`)
}).catch((e)=>{
    console.log(`Some ERROR has occured`)
    console.log(e)
})

const Storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'./public/uploads/')
    },
    filename : (req,file,cb)=>{
        cb(null,Date.now()+'--'+file.originalname);
    }
})
const upload = multer({
    storage: Storage
}).array('images',100)


    // res.send("App is running")
app.get('/', async (req, res) => {
    const items = await imagemodels.find({})
    .catch((err)=>{ 
        console.log(err);
        res.status(500).send('An error occurred', err);
    })
        
    // console.log(items)
    const arrItems = Array.from(items)
    // console.log(arrItems)
    // console.log(mangaModel.findOne({}).exec())
    res.render('index', { items: arrItems });
});

app.post("/upload",upload,async(req,res)=>{
    // console.log(req.files)

    // if(mangaModel.findOne({MangaName : req.body.MangaName})){
    //     console.log('in if block')
        // mangaModel.updateOne({MangaName : req.body.MangaName},{$push : {Chapters : req.body.ChapterNo}})
    // }
    // else{
        // const newManga = new mangaModel({
        //     MangaName : req.body.MangaName,
        //     ChapterNo : new Array(Number(req.body.ChapterNo))
        // })
        // await newManga.save().then(console.log(`New manga saved`))
    // }

    req.files.forEach(async(img)=>{
        const newImage = new imageModel({
            MangaName : req.body.MangaName,
            ChapterNo : req.body.ChapterNo,
            ChapterName : req.body.name,
            image : {
                data : fs.readFileSync("./public/uploads/"+img.filename),
                contentType : img.mimetype,
                path : img.filename
            }
        })
        await newImage.save().then(console.log("mongo save!!"))
    })
    
    res.send("Successfully uploaded !")
})

// app.get("/image",async (req,res)=>{
//     const image = await imagemodels.findOne({name : "sherlock"})
//     // res.contentType(image.image.contentType)
//     res.contentType('png')
//     res.send(image.image.data)
// })

// app.get("/pic",(req,res)=>{
//     res.render('pic')
// })
app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
})