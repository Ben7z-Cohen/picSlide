const express = require("express");
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 4000;
var cors = require('cors')

const NUM_OF_PICTURES_REQUESTED = 5
const PICTURES_LIMIT = 100

let picturesCash = new Map();
const urlToLoadPictures = `https://picsum.photos/v2/list?page=1&amp;limit=${PICTURES_LIMIT}`;

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}));
const loadPicturesCash = async () => {
    let response = await axios.get(urlToLoadPictures)
    picturesInformation = response.data;
    for (const pictureId in picturesInformation) {
        let pictureObjcet = {
            id: pictureId,
            author: picturesInformation[pictureId].author,
            width: picturesInformation[pictureId].width,
            height: picturesInformation[pictureId].height,
            url: picturesInformation[pictureId].url,
            dowload_url: picturesInformation[pictureId].download_url
        }
        picturesCash.set(pictureId, pictureObjcet);
    }
    //Todo: add catch
}


app.get('/api/pictures', function (req, res) {
    let counter = 0;
    let pictursArray = new Array();
    while(counter < NUM_OF_PICTURES_REQUESTED){
        pictursArray.push(picturesCash.get(Math.floor(Math.random()*PICTURES_LIMIT).toString()));
        counter++;
    }
    res.send(pictursArray)
})

app.listen(PORT,
    () => {
        console.log(`Server running on port ${PORT}`);
        loadPicturesCash(picturesCash, 'abc');
    })