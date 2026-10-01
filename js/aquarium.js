const aquarium = document.getElementById("aquarium");

let waterQuality = 100;

setInterval(function() {
    if (waterQuality > 0) {
        waterQuality -= 1;
    }

    document.getElementById("water-quality").textContent = "Water Quality: " + waterQuality;

}, 10000);

//water change button
const waterChangeButton = document.getElementById("water-change-button");

waterChangeButton.addEventListener("click", function() {
    waterQuality = 100;

    document.getElementById("water-quality").textContent = "Water Quality: " + waterQuality;
});

swim();