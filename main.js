

var map = L.map('map').setView([0, 20], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 4,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const fileinput = document.getElementById("files");

fileinput.onchange = getExif;

// https://github.com/ianare/exif-samples/blob/master/jpg/Kodak_CX7530.jpg <-- source for the image
// https://github.com/exif-js/exif-js/blob/master/exif.js <-- exif.js original readme code, modified by me
function getExif() {
    const file = document.getElementById("files").files[0]
    console.log(file.name)
    createImage(file)
    EXIF.getData(file, function() {
        var longitude = EXIF.getTag(this, "GPSLongitude");
        var latitude = EXIF.getTag(this, "GPSLatitude");
        var geolocation = document.getElementById("geo");

        var lat = latitude[1].numerator/latitude[1].denominator
        var long = longitude[1].numerator/longitude[1].denominator

        console.log(lat)
        console.log(long)
        placeMarker(lat, long, file.name)
    });
}

const placeMarker = (a, b, c) => {
    var point = L.marker([a, b]).addTo(map).bindPopup(c)
}

const createImage = (a) => {
    const images = document.createElement("img")
    images.style.width = "250px"
    images.style.height = "250px"
    images.style.padding = "5px"
    images.style.borderStyle = "dotted"
    const placement = document.getElementById('images')
    images.src=URL.createObjectURL(a);
    placement.appendChild(images)
}