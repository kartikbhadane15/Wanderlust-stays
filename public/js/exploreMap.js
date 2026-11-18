/**
 * Wanderlust Explore Split Map View
 * Powered by MapLibre GL & MapTiler
 */
document.addEventListener("DOMContentLoaded", () => {
  const mapDataEl = document.getElementById("listings-map-data");
  const mapContainer = document.getElementById("exploreMap");
  const mapCol = document.getElementById("mapCol");
  const listingsCol = document.getElementById("listingsCol");
  const listingsGrid = document.getElementById("listingsGrid");
  const floatingMapBtn = document.getElementById("floatingMapBtn");
  const mapBarToggleBtn = document.getElementById("mapBarToggleBtn");

  if (!mapDataEl || !mapContainer) return;

  let listings = [];
  try {
    listings = JSON.parse(mapDataEl.textContent);
  } catch (err) {
    console.error("Failed to parse listings map data:", err);
  }

  let map = null;
  const markers = new Map();
  let isMapActive = false;

  // Restore saved view preference (default to list view)
  const savedView = localStorage.getItem("wanderlust_map_view");
  if (savedView === "split" && window.innerWidth >= 992) {
    enableSplitView(false);
  }

  function updateToggleButtons(active) {
    const iconClass = active ? "fa-solid fa-list-ul me-2" : "fa-solid fa-map me-2";
    const text = active ? "Show list" : "Show map";

    if (floatingMapBtn) {
      floatingMapBtn.innerHTML = `<i class="${iconClass}"></i><span>${text}</span>`;
      floatingMapBtn.setAttribute("aria-label", text);
    }
    if (mapBarToggleBtn) {
      mapBarToggleBtn.innerHTML = `<i class="${active ? 'fa-solid fa-list-ul me-1' : 'fa-solid fa-map me-1 text-danger'}"></i><span>${text}</span>`;
      mapBarToggleBtn.classList.toggle("active", active);
    }
  }

  function initMap() {
    if (map) {
      map.resize();
      return;
    }

    if (typeof mapToken === "undefined" || !mapToken) {
      console.warn("Map token not available");
      mapContainer.innerHTML = '<div class="alert alert-warning m-3">Map service currently unavailable</div>';
      return;
    }

    // Default center (India) if no listings
    let defaultCenter = [78.9629, 20.5937];
    let defaultZoom = 4;

    const validListings = listings.filter(
      (l) => l.coordinates && Array.isArray(l.coordinates) && l.coordinates.length === 2 && !isNaN(l.coordinates[0]) && !isNaN(l.coordinates[1])
    );

    if (validListings.length > 0) {
      defaultCenter = validListings[0].coordinates;
      defaultZoom = 8;
    }

    map = new maplibregl.Map({
      container: "exploreMap",
      style: `https://api.maptiler.com/maps/streets/style.json?key=${mapToken}`,
      center: defaultCenter,
      zoom: defaultZoom,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    const bounds = new maplibregl.LngLatBounds();
    let hasCoords = false;

    validListings.forEach((listing) => {
      const coords = listing.coordinates;
      bounds.extend(coords);
      hasCoords = true;

      // Custom Price Marker Element
      const el = document.createElement("div");
      el.className = "map-price-pill";
      el.dataset.listingId = listing.id;
      el.innerHTML = `<span>&#8377; ${listing.price ? listing.price.toLocaleString("en-IN") : "0"}</span>`;

      // Popup Content
      const ratingMarkup =
        listing.avgRating > 0
          ? `<span class="small fw-bold"><i class="fa-solid fa-star text-danger small me-1"></i>${listing.avgRating}</span>`
          : '<span class="text-muted small">New</span>';

      const popupHtml = `
        <div class="map-popup-card">
          <a href="/listings/${listing.id}" class="map-popup-img-wrap">
            <img src="${listing.image || '/images/default.jpg'}" alt="${listing.title}" class="map-popup-img">
          </a>
          <div class="map-popup-content">
            <div class="d-flex justify-content-between align-items-baseline mb-1">
              <a href="/listings/${listing.id}" class="map-popup-title text-truncate">${listing.title}</a>
              ${ratingMarkup}
            </div>
            <div class="text-muted small text-truncate mb-2">${listing.location}, ${listing.country}</div>
            <div class="map-popup-price">
              <span class="fw-bold">&#8377; ${listing.price ? listing.price.toLocaleString("en-IN") : "0"}</span>
              <span class="text-muted small"> / night</span>
            </div>
          </div>
        </div>
      `;

      const popup = new maplibregl.Popup({
        offset: 18,
        closeButton: true,
        closeOnClick: false,
        maxWidth: "280px",
        className: "custom-map-popup",
      }).setHTML(popupHtml);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(coords)
        .setPopup(popup)
        .addTo(map);

      markers.set(listing.id, { marker, element: el, popup });

      // Hover / Click behavior
      el.addEventListener("mouseenter", () => {
        el.classList.add("hovered");
      });
      el.addEventListener("mouseleave", () => {
        el.classList.remove("hovered");
      });
      el.addEventListener("click", () => {
        // Highlight corresponding listing card
        highlightListingCard(listing.id);
      });
    });

    if (hasCoords) {
      if (validListings.length === 1) {
        map.setCenter(validListings[0].coordinates);
        map.setZoom(11);
      } else {
        map.fitBounds(bounds, {
          padding: { top: 60, bottom: 60, left: 60, right: 60 },
          maxZoom: 13,
        });
      }
    }
  }

  function highlightListingCard(id) {
    const card = document.querySelector(`.listing-col-item[data-listing-id="${id}"]`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      const cardInner = card.querySelector(".listing-card");
      if (cardInner) {
        cardInner.classList.add("highlight-card");
        setTimeout(() => cardInner.classList.remove("highlight-card"), 2000);
      }
    }
  }

  function highlightMarker(id, shouldOpenPopup = false) {
    const markerObj = markers.get(id);
    if (!markerObj) return;

    markers.forEach((m) => m.element.classList.remove("active"));
    markerObj.element.classList.add("active");

    if (map) {
      map.easeTo({
        center: markerObj.marker.getLngLat(),
        duration: 400,
      });
    }

    if (shouldOpenPopup && markerObj.popup) {
      markerObj.marker.togglePopup();
    }
  }

  function enableSplitView(animate = true) {
    if (!mapCol || !listingsCol || !listingsGrid) return;

    isMapActive = true;
    localStorage.setItem("wanderlust_map_view", "split");

    mapCol.classList.remove("d-none");
    listingsCol.className = "col-12 col-lg-7";
    listingsGrid.className = "row row-cols-1 row-cols-md-2 g-3 mb-5";

    updateToggleButtons(true);

    setTimeout(() => {
      initMap();
      if (map) map.resize();
    }, 50);
  }

  function disableSplitView() {
    if (!mapCol || !listingsCol || !listingsGrid) return;

    isMapActive = false;
    localStorage.setItem("wanderlust_map_view", "list");

    mapCol.classList.add("d-none");
    listingsCol.className = "col-12";
    listingsGrid.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5";

    updateToggleButtons(false);
  }

  function toggleMapView() {
    if (isMapActive) {
      disableSplitView();
    } else {
      enableSplitView(true);
    }
  }

  if (floatingMapBtn) {
    floatingMapBtn.addEventListener("click", toggleMapView);
  }
  if (mapBarToggleBtn) {
    mapBarToggleBtn.addEventListener("click", toggleMapView);
  }

  // Listing card hover synchronisation with map markers
  document.querySelectorAll(".listing-col-item").forEach((cardItem) => {
    const id = cardItem.getAttribute("data-listing-id");
    cardItem.addEventListener("mouseenter", () => {
      if (isMapActive && markers.has(id)) {
        highlightMarker(id, false);
      }
    });
    cardItem.addEventListener("mouseleave", () => {
      if (markers.has(id)) {
        const markerObj = markers.get(id);
        if (markerObj) markerObj.element.classList.remove("active");
      }
    });
  });

  // Handle window resizing
  window.addEventListener("resize", () => {
    if (isMapActive && map) {
      map.resize();
    }
  });
});
