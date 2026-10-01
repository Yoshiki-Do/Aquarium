let gameDay = 1;
let selectedFish = null;

//fish hunger decay
setInterval(function() {
    for (let i = 0; i < fishData.length; i++) {
        if (fishData[i].hunger > 0) {
            fishData[i].hunger -= 1;
        }
    }

    if (selectedFish !== null) {
        document.getElementById("fish-hunger").textContent = "Hunger: " + selectedFish.hunger;
        document.getElementById("fish-status").textContent = "Status: " + getFishStatus(selectedFish.hunger);
    }

}, 5000);

//day system
setInterval(function() {
    gameDay += 1;

    for (let i = 0; i < fishData.length; i++) {
        fishData[i].age += 1;
        fishData[i].size += 0.1;
        if (fishData[i].size > fishData[i].maxSize) {
            fishData[i].size = fishData[i].maxSize;
        }
    }
    
    document.getElementById("game-day").textContent = "Day: " +gameDay;

    if (selectedFish !== null) {
        document.getElementById("fish-age").textContent = "Age: " + selectedFish.age;
        document.getElementById("fish-size").textContent = "Size: " + selectedFish.size.toFixed(1) + " cm";
    }

}, 30000);