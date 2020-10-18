// Create map
const map = L.map("mapid").setView([-23.954721, -46.3504323], 12);
// Create and add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

// create and add marker
map.on("click", (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector("[name=lat]").value = lat;
  document.querySelector("[name=lng]").value = lng;

  // remove icon
  marker && map.removeLayer(marker);

  // add icon layer
  marker = L.marker([lat, lng], { icon }).addTo(map);
});

// add photos field
function addPhotoField() {
  // get photo container #images
  const container = document.querySelector("#images");

  // get duplication container .new-image
  const fieldsContainer = document.querySelectorAll(".new-upload");
  // Clone last added image
  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);
  const input = newFieldContainer.children[0];
  if (input.value == "") {
    return;
  }
  // Clean field
  input.value = "";
  // Add clone to container #images
  container.appendChild(newFieldContainer);
}

function deleteField() {
  const span = event.currentTarget;

  const fieldsContainer = document.querySelectorAll(".new-upload");

  if (fieldsContainer.length < 2) {
    // Delete field value
    span.parentNode.children[0].value = "";
    return;
  }

  // delete field
  span.parentNode.remove();
}

// Selecting yer os no
function toggleSelect() {
  // remove active class from buttons
  document.querySelectorAll(".button-select button").forEach((button) => {
    button.classList.remove("active");
  });

  // Add active class to clicked button
  const button = event.currentTarget;
  button.classList.add("active");

  // Refresh hidden input with selected value
  const input = document.querySelector('[name="open_on_weekends"]');

  // Check for yes or no
  input.value = button.dataset.value;
}
