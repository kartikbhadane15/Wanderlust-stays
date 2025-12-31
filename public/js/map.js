var map = new maplibregl.Map({
      container: 'map',
      style: `https://api.maptiler.com/maps/streets/style.json?key=${mapToken}`,
      center: listing.geometry.coordinates,
      zoom: 10
});

const marker = new maplibregl.Marker({color: "red"})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new maplibregl.Popup({ offset: 25 })
    .setHTML(`<H3>${listing.title}</H3><p>Exact location will be provided after booking</p>`))
    .addTo(map);