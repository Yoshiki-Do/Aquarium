let gameDay = 1;
let selectedFish = null;

function updateFishHunger(data) {
    if (data.hunger > 0) {
        data.hunger -= 1;
    }
}

//fish hunger decay
setInterval(function() {
    for (let i = 0; i < fishData.length; i++) {
        updateFishHunger(fishData[i]);
    }

    if (selectedFish !== null) {
        document.getElementById("fish-hunger").textContent = "Hunger: " + selectedFish.hunger;
        document.getElementById("fish-status").textContent = "Status: " + getFishStatus(selectedFish);
    }

}, 5000);

function updateFishHealth(data) {
    const previousHealth = data.health;

    if (data.hunger < 50 && data.health > 0) {
        data.health -= 1;
    } else if (data.hunger >= 70 && data.health < 100 && data.health > 0) {
        data.health += 1;
    }

    if (waterQuality < 50 && data.health > 0) {
        data.health -= 1;
    } else if (waterQuality >= 70 && data.health < 100 && data.health > 0) {
        data.health += 1;
    }

    if (previousHealth > 0 && data.health === 0) {
        showDeathPopup(data);
    }
}

let deadFish = null;

function showDeathPopup(data) {
    const deathPopup = document.getElementById("death-popup");
    const deathMessage = document.getElementById("death-message");

    deadFish = data;

    deathMessage.textContent = data.name + " has died.";
    deathPopup.style.display ="flex";
}

const deathOkButton = document.getElementById("death-ok-button");

deathOkButton.addEventListener("click", function() {
    const deathPopup = document.getElementById("death-popup");

    if (deadFish !== null) {
        const fishIndex = fishData.indexOf(deadFish);

        if (fishIndex !== -1) {
            fishImages[fishIndex].remove();
            fishData.splice(fishIndex, 1);
            fishImages.splice(fishIndex, 1);
        }
        
        if (selectedFish === deadFish) {
            selectedFish = null;
            document.getElementById("fish-name").textContent = "";
            document.getElementById("fish-type").textContent = "";
            document.getElementById("fish-age").textContent = "";
            document.getElementById("fish-size").textContent = "";
            document.getElementById("fish-hunger").textContent = "";
            document.getElementById("fish-health").textContent = "";
            document.getElementById("fish-status").textContent = "";
        }

        deadFish = null;
    }
    deathPopup.style.display = "none";
});

//fish health
setInterval(function() {
    for (let i = 0; i < fishData.length; i++) {
        updateFishHealth(fishData[i]);
    }

    if (selectedFish !== null) {
        document.getElementById("fish-health").textContent = "Health: " + selectedFish.health;
        document.getElementById("fish-status").textContent = "Status: " + getFishStatus(selectedFish);
    }

}, 5000);

function updateFishGrowth(data) {
    data.age += 1;
    data.size += 0.1;
    if (data.size > data.maxSize) {
        data.size = data.maxSize;
    }
}

//day system
setInterval(function() {
    gameDay += 1;

    for (let i = 0; i < fishData.length; i++) {
        updateFishGrowth(fishData[i]);
    }
    
    document.getElementById("game-day").textContent = "Day: " +gameDay;

    if (selectedFish !== null) {
        document.getElementById("fish-age").textContent = "Age: " + selectedFish.age;
        document.getElementById("fish-size").textContent = "Size: " + selectedFish.size.toFixed(1) + " cm";
    }

}, 30000);