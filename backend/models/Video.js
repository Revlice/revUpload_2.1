const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    videoURL:{
        type:String,
        required:true,

    },
    neZamanOlusturuldu:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model('Videolar',VideoSchema);
