const express = require('express');
const router = express.Router();
const multer = require('multer');
const Video = require('../models/Video');


//Multer yapılandırılması
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Dosyanın kaydedileceği klasör
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Dosyanın adı
    }
});

const upload = multer({
    storage:storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100 MB limit
})

//POST

// Video post route'u
router.post('/upload', upload.single('videoFile'), async (req, res) => {
    console.log('Gelen veri:', req.body); // Gelen veriyi kontrol edin
    
    const { title, description } = req.body;
    const videoURL = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        if (!title || !description || !videoURL) {
            return res.status(400).json({ message: 'Title, description, and video file are required' });
        }

        const newVideo = new Video({ title, description, videoURL });
        await newVideo.save();
        
        res.status(201).json(newVideo);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Gerekli alanlar eksik veya hatalı', errors: error.errors });
        }
        console.error('Hata:', error);
        res.status(500).json({ message: 'Sunucu hatası', error });
    }
});



//GET
router.get("/",async(req,res)=>{
    try{
        const videos = await Video.find() //MongoDB'den tüm videoları çek
        res.status(200).json(videos);

    }catch (error) {
        res.status(500).json({ message: "Videolar alınırken bir hata oluştu", error });
    }
})


module.exports = router;
