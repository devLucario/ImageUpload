const app = require("express")()
const multer = require("multer")
const path = require('path')
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'uploads')
    },
    filename : (req,file,cb)=>{
        cb(null, Date.now()+file.originalname)
    }
})
const upload = multer({storage : storage})
app.get("/",(req,res)=>{
    res.send("Upload file now")
})

app.post("/upload",upload.single('image') ,(req,res)=>{
    res.send('Uploaded successfully !')
})

app.listen(5000,()=>{
    console.log(`App is working`)
})