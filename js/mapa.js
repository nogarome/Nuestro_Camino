var opts = {
  mapa: {
    center: [40.3, -3.716667],
    
    zoom: 5,
    zoomControl: false,
  },
  
  
  otmLayer: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    options: {
      zoom:5,
        maxZoom: 17,        
    },
  },
  ormLayer: {
    url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
    options: {
        maxZoom: 17,      
    },
  },
  osmLayer: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: {
          maxZoom: 19,       
      }
  },
  satelliteLayer: {
      url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      options: {
          maxZoom: 18,         
      },
  },
  layersControl: {
    options: {
      position: 'topright',
      collapsed: false,           
    },
  },
  
  points: {
    options: {
      icon: {
        iconUrl: 'img/icon/elevation/elevation-poi.png',
        iconSize: [12, 12],
      },
    },
  },
  
  
};

var tracks = [
  "tracks/I- Etapa.gpx",
  "tracks/2019-09-23 06_19.gpx",
  "tracks/2019-09-24 07_13.gpx",
  "tracks/2019-09-25 07_49.gpx",
  "tracks/2019-09-26 06_48.gpx",
  "tracks/2019-09-27 06_58.gpx",
  "tracks/2019-09-28 07_51.gpx",
  "tracks/2019-09-29 07_01.gpx",
];

var points = [
  {latlng:[43.163682731047714, -1.2347120046615603], name:"St-Jean-Pied-De-Port"},
    {latlng:[43.010366581286306, -1.319284737110138], name:"Roncesvalles"},
    {latlng:[42.92979801008876, -1.5037214756011963], name:"Zubiri"},
    {latlng:[42.818953113944126, -1.641788184642792], name:"Pamplona"},
    {latlng:[42.673427782002605, -1.8102496862411501], name:"Puente-La-Reina"},
    {latlng:[42.66981095920804, -2.0273476839065556], name:"Estella"},
    {latlng:[42.551916501089714, -2.2710907459259038], name:"Torres-Del-Rio"},
    {latlng:[42.468215140232, -2.444669902324677], name:"Logroño"},
];

var map = L.map('map', opts.mapa);

var baseLayers = {};

baseLayers["Satelite"] = L.tileLayer(opts.satelliteLayer.url, opts.satelliteLayer.options);
baseLayers["Relieve"] = new L.tileLayer(opts.ormLayer.url, opts.ormLayer.options);
baseLayers["Topo"] = new L.TileLayer(opts.otmLayer.url, opts.otmLayer.options);
baseLayers["Callejero"] = new L.TileLayer(opts.osmLayer.url, opts.osmLayer.options);

//var controlZoom = new L.Control.Zoom(opts.zoomControl);
var controlLayer = L.control.layers(baseLayers, null, opts.layersControl.options);
//var controlScale = L.control.scale(opts.scaleControl.options);
//var controlMiniMap = new L.Control.MiniMap(new L.TileLayer(opts.osmLayer.url, opts.osmLayer.options), opts.miniMapControl.options);
//var controlPegman = new L.Control.Pegman(opts.pegmanControl.options);
//var controlLocate = L.control.locate(opts.locateControl.options);

var routes = L.gpxGroup(tracks, {
  points: points,
  points_options: opts.points.options,
  elevation: true,
  elevation_options: {
    theme: "lime-theme",
    detachedView: false,
    elevationDiv: '#elevation-div',
    followPositionMarker: true,
    zFollow: 12,
    height:121,                 
  },
  legend: true,
  legend_options: {
    position: "bottomright",
    collapsed:false,                               
},
  distanceMarkers: false,
});

 // Preload a default chart / track.
 routes.once( 'loaded', function( e ) {

  // Select a default track ( 0 = first element ).
  var i = (7); // ALTERNATIVE: tracks.indexOf( "tracks/1- Etapa.gpx" );
  var route = this._routes[Object.keys( this._routes )[i]];
  
  // Select chart.
  this.setSelection( route );  
});

map.on('eledata_added eledata_clear', function(e) {
  var p = document.querySelector(".chart-placeholder");
  if(p) {
    p.style.display = e.type=='eledata_added' ? 'none' : '';
  }
});

map.on('eledata_added', function(e) {
  var q = document.querySelector.bind(document);
  var track = e.track_info;

  //controlLayer.addOverlay(e.layer, e.name);
  q('.totlen .summaryvalue').innerHTML = track.distance.toFixed(2) + " km";
  q('.maxele .summaryvalue').innerHTML = track.elevation_max.toFixed(2) + " m";
  q('.minele .summaryvalue').innerHTML = track.elevation_min.toFixed(2) + " m";
});

controlLayer.addTo(map);
//controlScale.addTo(map);
//controlZoom.addTo(map);
//controlPegman.addTo(map);
//controlLocate.addTo(map);
//controlMiniMap.addTo(map);

routes.addTo(map);

map.addLayer(baseLayers["Topo"]);


