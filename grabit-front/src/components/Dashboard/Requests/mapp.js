// const renderPolylines = (map, maps) => {
//   console.log("hahha");
//   let image;
//   var bounds = new maps.LatLngBounds();
//   var infowindow = new maps.InfoWindow();

//   for (var i = 0; i < addresses.length; i++) {
//     i === 0
//       ? (image = delivery)
//       : i === 1
//       ? (image = pickup)
//       : (image = driver);
//     var marker = new maps.Marker({
//       position: addresses[i],
//       map: map,
//       icon: image
//     });

//     let info =
//       i === 0
//         ? "Delivery address"
//         : i === 1
//         ? "Pickup address"
//         : "Driver current location";
//     maps.event.addListener(
//       marker,
//       "mouseover",
//       (function(marker, i) {
//         return function() {
//           infowindow.setContent(info);
//           infowindow.open(map, marker);
//         };
//       })(marker, i)
//     );

//     marker.addListener("mouseout", function() {
//       infowindow.close();
//     });

//     marker.setMap(map);
//     bounds.extend(marker.position);
//   }
//   map.fitBounds(bounds);
// };
