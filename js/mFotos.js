window.onload = function () {
        
    /* map = L.map('map', {
        center: [43.056556, -1.344109],
        zoom: 8,
        zoomControl: false
    });
    map.addControl(L.control.zoom({position: 'topright'})); */

   // L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        /* attribution: 'Leaflet.CoordinatedImagePreview Plug-in Test Page', */
       // subdomains: ['a', 'b', 'c']
    //}).addTo(map);

    var options = {
        imageServiceAddress: "testdata.json",
        isOpen: true
    };
    $('#coordinatedImagePreviewControlContainer').CoordinatedImagePreviewControl(options);

};