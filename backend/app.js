const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const videoRoutes = require('./routes/videoRoutes');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Statik dosyaları serve et
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 



// Video API route'ları
app.use('/api/videos', videoRoutes);





//MongoDB bağlama
mongoose.connect(process.env.DATA_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("MongoDB bağlantısı başarılı!"))
.catch((error)=> console.log(error));


app.get("/",(req,res)=>{
    res.send("Backend api çalışıyor");

});


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Sunucu localhost:${PORT} portunda dinleniyor`);
});



