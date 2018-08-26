var customLabel = {
  monster: {
    label: 'pokemon'
  }
};

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function initMap() {
  var loc = getUrlParameter('loc') || document.getElementById('map').getAttribute('default_loc')
  var is_auth = (document.getElementById('map').getAttribute('session') === "1")

  map = L.map('map', {
    center: loc.split(','),
    zoom: getUrlParameter('zoom') || 15,
    maxZoom: 18,
    zoomControl: false
  })
  map.addLayer(L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
  ))

  // Change this depending on the name of your PHP or XML file
  downloadUrl('./frontend/xml.php', function(data) {
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName('marker');
    Array.prototype.forEach.call(markers, function(markerElem) {
      var id = markerElem.getAttribute('id');
      var spotid = markerElem.getAttribute('spotid');
      var pokemon = markerElem.getAttribute('pokemon');
      var cp = markerElem.getAttribute('cp');
      var iv = markerElem.getAttribute('iv');
	    var hour = markerElem.getAttribute('hour');
      var min = markerElem.getAttribute('min');
		  var ampm = markerElem.getAttribute('ampm');
      var type = markerElem.getAttribute('id');
		  var good = markerElem.getAttribute('good');
		  var bad = markerElem.getAttribute('bad');
		  var spotter = markerElem.getAttribute('spotter');
      var lat = markerElem.getAttribute('latitude');
      var lng = markerElem.getAttribute('longitude');
      var point = (
        parseFloat(lat),
        parseFloat(lng)
      );
      var icon = customLabel[type] || {};
      var image = new L.Icon({
          iconUrl: './static/icons/' + id + '.png',
          iconSize: [32, 32]
      });

      var vote_field = '';
      if (is_auth) {
        vote_field = [
          '<a href =\"./good.php?spotid=' + spotid + '&loc=' + lat + ',' + lng + '\">',
            '<img src=\"./static/voting/up.png\" height=\"25\" width=\"25\"></img>',
          '</a>' + good + ' x Found<br>',
          '<a href =\"./bad.php?spotid=' + spotid + '&loc=' + lat + ',' + lng + '\">',
            '<img src=\"./static/voting/down.png\" height=\"25\" width=\"25\"></img>',
          '</a>' + bad + ' x Not found',
        ].join('');
      }
      var spot_field = '';
      if (is_auth) {
        spot_field = '<br><hr>Spotted by: <b>' + spotter + '</b>';
      }

  		var html = [
        '<div class=\"maplabel\"><center>',
          '<img src=\"./static/icons/' + id + '.png\" height=\"45\" width=\"45\"></img>',
          '<p>',
            '<b>' + pokemon + ' (#' + id + ')</b><br>',
            'CP: ' + cp + '<br>',
            'IV: '+ iv + '%<br>',
            'Found: ' + hour + ':' + min + ' ' + ampm + '<br><hr>',
            vote_field,
            '<br><hr>',
            '<a href=\"http://maps.google.com/maps?q=' + lat + ',' + lng + '\">Google Maps</a>',
            spot_field,
          '</p>',
        '</center></div>'
      ].join('');

      var marker = new L.marker(
        [
          parseFloat(lat),
          parseFloat(lng)
        ],
        {icon: image}
      ).bindPopup(html);

      marker.on('click', function() {
        marker.openPopup();
      });
      map.addLayer(marker)
    });
  });

	downloadUrl('./frontend/gxml.php', function(data) {
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName('marker');
    Array.prototype.forEach.call(markers, function(markerElem) {
      var gid = markerElem.getAttribute('gid');
      var gname = markerElem.getAttribute('gname');
		  var gteam = markerElem.getAttribute('gteam');
      var type = markerElem.getAttribute('type');
      var tid = markerElem.getAttribute('tid');
  		var actraid = markerElem.getAttribute('actraid');
  		var actboss = markerElem.getAttribute('actboss');
  		var hour = markerElem.getAttribute('hour');
  		var min = markerElem.getAttribute('min');
  		var ampm = markerElem.getAttribute('ampm');
  		var egg = markerElem.getAttribute('egg');
  		var bossname = markerElem.getAttribute('bossname');
  		var raidby = markerElem.getAttribute('raidby');
  		var eggby = markerElem.getAttribute('eggby');
  		var bosscp = markerElem.getAttribute('bosscp');
  		var exraid = markerElem.getAttribute('exraid');
  		var exraiddate = markerElem.getAttribute('exraiddate');
      var glat = markerElem.getAttribute('glatitude');
      var glng = markerElem.getAttribute('glongitude');

      var gym_form = '';
      if (!is_auth) {
        gym_form = '<hr><b><span class="text-danger">Login to change/add teams or raids.</span></b>'
      } else {
        gym_form = [
          '<b>Choose team:</b><br>',
          '<form action=\"./gymteam.php\" name=\"postInstinct\" method=\"post\"\">',
            '<input type=\"hidden\" name=\"gname\" value=\"' + gid + '\">',
            '<input type=\"hidden\" name=\"tname\" value=\"2\">',
          '</form>',
          '<form action=\"./gymteam.php\" name=\"postValor\" method=\"post\"\">',
            '<input type=\"hidden\" name=\"gname\" value=\"' + gid + '\">',
            '<input type=\"hidden\" name=\"tname\" value=\"3\">',
          '</form>',
          '<form action=\"./gymteam.php\" name=\"postMystic\" method=\"post\"\">',
            '<input type=\"hidden\" name=\"gname\" value=\"' + gid + '\">',
            '<input type=\"hidden\" name=\"tname\" value=\"4\">',
          '</form>',
          '<a href=\"javascript:submitInstinct();\">',
            '<img border="0" alt="W3Schools" src="./static/teams/2.png" width="25" height="25">',
          '</a>',
          ' / ',
          '<a href="javascript:submitValor();\">',
            '<img border="0" alt="W3Schools" src="./static/teams/3.png" width="25" height="25">',
          '</a>',
          ' / ',
          '<a href="javascript:submitMystic();\">',
            '<img border="0" alt="W3Schools" src="./static/teams/4.png" width="25" height="25">',
          '</a>',
        ].join('')
      }

      var spotter_field = '';
      if (is_auth && (raidby || eggby)) {
        spotter_field = '<br><hr><b>Spotted by: </b>';
        if (raidby) {
          spotter_field += raidby;
        } else {
          spotter_field += eggby;
        }
      }

	    if (actraid === "0" && egg === "0"){
		    if (exraid === "1"){
          var hide_reg = false;

			    var html = [
            '<div class=\"maplabel\"><center>',
              '<img src=\"./static/gyms/' + gteam + 'ex.png\" height=\"45px\" width=\"45px\"></img>',
              '<p>',
                '<b>' + gname + '</b><br>',
                'Team: ' + tid,
                '<br><hr><strong>EX Raid On:</strong><br> ' + exraiddate + '<br><hr>',
                gym_form,
                '<br><hr>',
                '<a href=\"http://maps.google.com/maps?q=' + glat + ',' + glng + '\">Google Maps</a>',
              '</p>',
            '</center></div>',
          ].join('');
			    var icon = customLabel[type] || {};
			    var image = new L.Icon({
            iconUrl: './static/gyms/' + gteam + 'ex.png',
            iconSize: [55, 55]
			    });
			  } else if (exraid === "0") {
			    var html = [
            '<div class=\"maplabel\"><center>',
              '<img src=\"./static/gyms/' + gteam + '.png\" height=\"45px\" width=\"45px\"></img>',
              '<p>',
                '<b>' + gname + '</b><br>',
                'Team: ' + tid,
                gym_form,
                '<br><hr>',
                '<a href=\"http://maps.google.com/maps?q=' + glat + ',' + glng + '\">Google Maps</a>',
              '</p>',
            '</center></div>'
          ].join('');
			    var icon = customLabel[type] || {};
			    var image = new L.Icon({
            iconUrl: './static/gyms/' + gteam + '.png',
            iconSize: [55, 55]
		      });
			  }
		  } else if (actraid !== "0" && egg === "0"){
			  if (exraid === "0"){
			    var html = [
              '<div class=\"maplabel\"><center>',
                '<img src=\"./static/icons/' + actboss + '.png\" height=\"45px\" width=\"45px\"></img>',
                '<p>',
                  '<b>' + gname + '</b><br>',
                  'Boss: ' + bossname + '<br>',
                  'CP: ' + bosscp + '<br>',
                  'Team: ' + tid + '<br>',
                  'Expires: ' + hour + ':' + min + ' ' + ampm,
                  gym_form,
                  '<br><hr><a href=\"http://maps.google.com/maps?q=' + glat + ',' + glng + '\">Google Maps</a>',
                  spotter_field,
                '</p>',
              '</center></div>'
          ].join('');
			    var icon = customLabel[type] || {};
			    var image = new L.Icon({
            iconUrl: './static/raids/' + actboss + '.png',
            iconSize: [55, 55]
			    });
			  } else if (exraid === "1") {
			    var html =[
              '<div class=\"maplabel\"><center>',
                '<img src=\"./static/icons/' + actboss + '.png\" height=\"45px\" width=\"45px\"></img>',
                '<p>',
                  '<b>' + gname + '</b><br>',
                  'Boss: ' + bossname + '<br>',
                  'CP: ' + bosscp + '<br>',
                  'Team: ' + tid + '<br>',
                  'Expires: ' + hour + ':' + min + ' ' + ampm,
                  '<br><hr><strong>EX Raid On:</strong><br> ' + exraiddate + '<br><hr>',
                  gym_form,
                  '<br><hr><a href=\"http://maps.google.com/maps?q=' + glat + ',' + glng + '\">Google Maps</a>',
                  spotter_field,
                '</p>',
              '</center></div>'
          ].join('');
			    var icon = customLabel[type] || {};
			    var image = new L.Icon({
            iconUrl: './static/raids/' + actboss + '.png',
            iconSize: [75, 75]
			    });
			  }
		  } else if (actraid === "0" && egg !== "0") {
			  if (exraid === "0") {
			    var html = [
            '<div class=\"maplabel\"><center>',
              '<img src=\"./static/eggs/' + egg + '.png\" height=\"45px\" width=\"45px\"></img>',
              '<p>',
                '<b>' + gname + '</b><br>',
                'Egg level: ' + egg + '<br>',
                'Team: ' + tid + '<br>',
                'Hatches at: ' + hour + ':' + min + ' ' + ampm,
                gym_form,
                '<br><hr>',
                '<a href=\"http://maps.google.com/maps?q=' + glat + ',' + glng + '\">Google Maps</a>',
                spotter_field,
              '</p>',
            '</center></div>'
          ].join('');
			    var icon = customLabel[type] || {};
			    var image = new L.Icon({
            iconUrl: './static/eggs/' + egg + '.png',
            iconSize: [55, 55]
			    });
			  } else if (exraid === "1") {
			    var html = [
            '<div class=\"maplabel\"><center>',
              '<img src=\"./static/eggs/' + egg + '.png\" height=\"45px\" width=\"45px\"></img>',
              '<p>',
                '<b>' + gname + '</b><br>',
                'Egg level: ' + egg + '<br>',
                'Team: ' + tid + '<br>',
                'Hatches at: ' + hour + ':' + min + ' ' + ampm,
                '<br><hr><strong>EX Raid On:</strong><br> ' + exraiddate + '<br><hr>',
                gym_form,
                '<br><hr><a href=\"http://maps.google.com/maps?q=' + glat + ',' + glng + '\">Google Maps</a>',
                spotter_field,
              '</p>',
            '</center></div>'
          ].join('');
			    var icon = customLabel[type] || {};
			    var image = new L.Icon({
            iconUrl: './static/eggs/' + egg + '.png',
            iconSize: [55, 55]
			    });
			  }
		  }
      var marker = new L.marker([parseFloat(glat), parseFloat(glng)],{
        icon: image
      }).bindPopup(html);
      marker.on('click', function() {
        marker.openPopup();
      });
      map.addLayer(marker)
    });
  });

	downloadUrl('./frontend/sxml.php', function(data) {
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName('marker');
    Array.prototype.forEach.call(markers, function(markerElem) {
      var sid = markerElem.getAttribute('sid');
      var sname = markerElem.getAttribute('sname');
		  var quest = markerElem.getAttribute('quest');
		  var quested = markerElem.getAttribute('quested');
      var reward = markerElem.getAttribute('reward');
		  var type = markerElem.getAttribute('type');
      var questby = markerElem.getAttribute('questby');
      var slat = markerElem.getAttribute('slatitude');
      var slng = markerElem.getAttribute('slongitude');

		  if (quested === "1"){
        var quest_field = '';
        if (is_auth) {
          quest_field = [
            '<b>Quest:</b><br>',
            ' ' + quest + '<br><hr>',
            '<b>Reward:</b><br>',
            reward
          ].join('');
        } else {
          quest_field = [
            '<b><span class="text-danger">Login to add/view quests.</span></b>'
          ].join('');
        }
        var spotter_field = '';
        if (is_auth && questby) {
          spotter_field = '<br><hr><b>Spotted by: </b>' + questby;
        }

		    var html = [
          '<div class=\"maplabel\"><center>',
            '<img src=\"./static/stops/queststop.png\" height=\"45\" width=\"45\"></img>',
            '<p>',
              '<b>' + sname + '</b><br>',
              '(<b><span class="text-success">Quested</span></b>)<br><hr>',
              quest_field,
              '<br><hr>',
              '<a href=\"http://maps.google.com/maps?q=' + slat + ',' + slng + '\">Google Maps</a>',
              spotter_field,
            '</p>',
          '</center></div>'
        ].join('');
        var icon = customLabel[type] || {};
        var image = new L.Icon({
          iconUrl: './static/stops/queststop.png',
          iconSize: [30, 30]
			  });
		  } else {
        var quest_field = '';
        if (!is_auth) {
          quest_field = [
            '<b><span class="text-danger">Login to add/view quests.</span></b>'
          ].join('');
        }
		    var html = [
          '<div class=\"maplabel\"><center>',
            '<img src=\"./static/stops/stops.png\" height=\"45\" width=\"45\"></img>',
            '<p>',
              '<b>' + sname + '</b>',
              quest_field,
              '<br><hr>',
              '<a href=\"http://maps.google.com/maps?q=' + slat + ',' + slng + '\">Google Maps</a>',
          '</center></div>'
        ].join('');
        var icon = customLabel[type] || {};
        var image = new L.Icon({
          iconUrl: './static/stops/stops.png',
          iconSize: [30, 30]
			  });
		  }
      var marker = new L.marker([parseFloat(slat), parseFloat(slng)],{
        icon: image
      }).bindPopup(html);
      marker.on('click', function() {
        marker.openPopup();
      });
      map.addLayer(marker)
    });
  });
}

function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
    new ActiveXObject('Microsoft.XMLHTTP') :
    new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };

  request.open('GET', url, true);
  request.send(null);
}

function doNothing() {}
