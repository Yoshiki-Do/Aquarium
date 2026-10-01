const aquarium = document.getElementById("aquarium");

let waterQuality = 100;

setInterval(function() {
    if (waterQuality > 0) {
        waterQuality -= 1;
    }

    //fish health
    if (waterQuality < 50) {
        for (let i = 0; i < fishData.length; i++) {
            if (fishData[i].health > 0){
                fishData[i].health -= 1;
            }
        }
    }  else if (waterQuality >= 70) {
        for (let i = 0; i < fishData.length; i++) {
            if (fishData[i].health < 100){
                fishData[i].health += 1;
            }
        }
    }

    document.getElementById("water-quality").textContent = "Water Quality: " + waterQuality;

    if (selectedFish !== null) {
        document.getElementById("fish-health").textContent = "Health: " + selectedFish.health;
    }
}, 10000);

//water change button
const waterChangeButton = document.getElementById("water-change-button");

waterChangeButton.addEventListener("click", function() {
    waterQuality = 100;

    document.getElementById("water-quality").textContent = "Water Quality: " + waterQuality;
});

swim();