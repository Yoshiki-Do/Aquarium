let gameDay = 1;
let selectedFish = null;

function updateFishHunger(data) {
    if (data.hunger > 0) {
        data.hunger -= 1;
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
}

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