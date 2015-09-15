var string_array = "<?php echo $string_array; ?>"; 
   var arrayCordenada = string_array.split("|");
   var i;
       

var map;
var infoWindow;

function initialize() {
   var mapOptions = {
      center: new google.maps.LatLng(-27.24900,-53.03500),
      zoom: 9,
      mapTypeId: 'roadmap'
   };
   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

   // cria a nova Info Window com referência à variável infowindow
   // o conteúdo da Info Window será atribuído mais tarde
   infoWindow = new google.maps.InfoWindow();

   // evento que fecha a infoWindow com click no mapa
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   // Chamada para a função que vai percorrer a informação
   // contida na variável markersData e criar os marcadores a mostrar no mapa
   displayMarkers();
}
google.maps.event.addDomListener(window, 'load', initialize);

// Esta função vai percorrer a informação contida na variável markersData
// e cria os marcadores através da função createMarker
function displayMarkers(){

   // esta variável vai definir a área de mapa a abranger e o nível do zoom
   // de acordo com as posições dos marcadores
   var bounds = new google.maps.LatLngBounds();
   
   // Loop que vai estruturar a informação contida em markersData
   // para que a função createMarker possa criar os marcadores 
   //for (var i = 0; i < markersData.length; i++){

      //var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
      //var nome = markersData[i].nome;
    for (var i = 0; i<arrayCordenada.length; i=i+2){
        var latlng = new google.maps.LatLng(arrayCordenada[i], arrayCordenada[i+1]);
        //var nome = arrayCordenada[i+2];
        createMarker(latlng);

      // Os valores de latitude e longitude do marcador são adicionados à
      // variável bounds
      bounds.extend(latlng);  
   }

   // Depois de criados todos os marcadores
   // a API através da sua função fitBounds vai redefinir o nível do zoom
   // e consequentemente a área do mapa abrangida.
   map.fitBounds(bounds);
}

// Função que cria os marcadores e define o conteúdo de cada Info Window.
function createMarker(latlng, nome){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: nome,
      icon: 'img/poco.png'
   });

   // Evento que dá instrução à API para estar alerta ao click no marcador.
   // Define o conteúdo e abre a Info Window.
   google.maps.event.addListener(marker, 'click', function() {
      
      // Variável que define a estrutura do HTML a inserir na Info Window.
      var iwContent = '<div id="iw_container">' +
            '<div class="iw_title">' + nome + '</div>';
      
      // O conteúdo da variável iwContent é inserido na Info Window.
      infoWindow.setContent(iwContent);

      // A Info Window é aberta.
      infoWindow.open(map, marker);
   });
}