<div>
		<div class="content clearfix">
			<div class="map clearfix" id="Q-nav">
				<div id="map"></div>
			</div>
			<ul id="list" class="clearfix"></ul>
			<div class="clearfix" id="message" style="display:none;">
				<div class="info">
					<div class="image">
						<img src="img/222.jpg" />
					</div>
					<div class="details">
						<dl>
							<dt>$585<span>per week</span></dt>
							<dd class="address"><span>9/20 harbourne road, Kingsford</span></dd>
							<dd class="num">
								<span>2</span>
								<span class="icon1"></span>
								<span>1</span>
								<span class="icon2"></span>
								<span>1</span>
								<span class="icon3"></span>

							</dd>
						</dl>
					</div>
				</div>
			</div>
		</div>
		<script>
		<script type="text/javascript" src="http://www.google.com/jsapi?key=AIzaSyDvEbpAtBYXMXoun-I3wYhn-7K33iVc7qs"></script>
		<script type="text/javascript" charset="utf-8">
			google.load("maps", "2.x");
			google.load("jquery", "1.3.1");
		</script>
			$(document).ready(function() {
				var map = new GMap2(document.getElementById('map'));
				var burnsvilleMN = new GLatLng(44.797916, -93.278046);
				map.setCenter(burnsvilleMN, 8);
				var bounds = map.getBounds();
				var southWest = bounds.getSouthWest();
				var northEast = bounds.getNorthEast();
				var lngSpan = northEast.lng() - southWest.lng();
				var latSpan = northEast.lat() - southWest.lat();
				var markers = [];
				for(var i = 0; i < 10; i++) {
					var point = new GLatLng(southWest.lat() + latSpan * Math.random(), southWest.lng() + lngSpan * Math.random());
					marker = new GMarker(point);
					map.addOverlay(marker);
					markers[i] = marker;

				}

				$(markers).each(function(i, marker) {
					GEvent.addListener(marker, "click", function() {
						map.panTo(marker.getLatLng());
					});
					$("<li></li>")
						.html(
							'<div>' +
							'<div class="image1"> ' +
							'<img src = "img/222.jpg" />' +
							'<div class="fr">' +
							'<span>1</span>' +
							'</div>' +
							'</div>' +
							'</div>')
						.click(function() {
							map.panTo(marker.getLatLng());
							displayPoint(marker, i);
						})
						.appendTo("#list");

					$("#message").appendTo(map.getPane(G_MAP_FLOAT_SHADOW_PANE));

				});

				//				function displayPoint(marker, i) {
				//					map.panTo(marker.getPoint());
				//					var markerOffset = map.fromLatLngToDivPixel(marker.getPoint());
				//					$("#message").show().css({ top: markerOffset.y, left: markerOffset.x });
				//				}

				function displayPoint(marker, index) {
					$("#message").hide();
					var moveEnd = GEvent.addListener(map, "moveend", function() {
						var markerOffset = map.fromLatLngToDivPixel(marker.getLatLng());
						$("#message")
							.fadeIn()
							.css({ top: markerOffset.y, left: markerOffset.x });
						GEvent.removeListener(moveEnd);
					});
					map.panTo(marker.getLatLng());
				}

			});
		</script>


</div>