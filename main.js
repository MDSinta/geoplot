window.onload=getExif;
// https://github.com/ianare/exif-samples/blob/master/jpg/Kodak_CX7530.jpg <-- source for the image
// https://github.com/exif-js/exif-js/blob/master/exif.js <-- exif.js original readme code, modified by me
function getExif() {
    var img1 = document.getElementById("img1");
    EXIF.getData(img1, function() {
        var longitude = EXIF.getTag(this, "GPSLongitude");
        var latitude = EXIF.getTag(this, "GPSLatitude");
        var geolocation = document.getElementById("geo");

        var lat = latitude[1].numerator/latitude[1].denominator
        var long = longitude[1].numerator/longitude[1].denominator

        console.log(lat)
        console.log(long)

        geolocation.innerHTML = `${lat} ${long}`;
        var point = L.marker([lat, long]).addTo(map);
    });


    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 2,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var point = L.marker([lat, long]).addTo(map);
}