

var map = L.map('map').setView([0, 0], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 2,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const fileinput = document.getElementById("files");

fileinput.onchange = getExif;

// https://github.com/ianare/exif-samples/blob/master/jpg/Kodak_CX7530.jpg <-- source for the image
// https://github.com/exif-js/exif-js/blob/master/exif.js <-- exif.js original readme code, modified by me
function getExif() {
    const file = document.getElementById("files").files[0]
    createImage(file)
    EXIF.getData(file, function() {
        var longitude = EXIF.getTag(this, "GPSLongitude");
        var latitude = EXIF.getTag(this, "GPSLatitude");
        var geolocation = document.getElementById("geo");

        var lat = latitude[1].numerator/latitude[1].denominator
        var long = longitude[1].numerator/longitude[1].denominator

        console.log(lat)
        console.log(long)

        geolocation.innerHTML = `${lat} ${long}`;
        placeMarker(lat, long)
    });
}

const placeMarker = (a, b) => {
    var point = L.marker([a, b]).addTo(map);
}

const createImage = (a) => {
    const images = document.createElement("img")
    const placement = document.getElementById('one')
    images.src=URL.createObjectURL(a)   ;
    placement.appendChild(images)
}