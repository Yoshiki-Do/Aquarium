var fishData = [
    {name: "Nemo", type: "Clownfish", age: 1, size: 10, maxSize: 20, hunger: 50, x: 100, y: 150, moveSpeed: 2, direction: 1, swimTime: 0, swimAmplitude: 15, swimFrequency: 0.04},
    {name: "Dory", type: "Blue Tang", age: 2, size: 15, maxSize: 30, hunger: 50, x: 400, y: 250, moveSpeed: 1.5, direction: -1, swimTime: 2, swimAmplitude: 25, swimFrequency: 0.06},
    {name: "Goldie", type: "Goldfish", age: 1, size: 8, maxSize: 15, hunger: 50, x: 600, y: 350, moveSpeed: 2.5, direction: 1, swimTime: 4, swimAmplitude: 10, swimFrequency: 0.03},
]

var fishImages = [];

for (let i = 0; i < fishData.length; i++) {
    const fish = document.createElement("img");

    fish.src = "images/fish.png";
    fish.alt = "Fish";
    fish.className = "fish";

    aquarium.appendChild(fish);

    fishImages.push(fish);

    fish.addEventListener("click", function() {
        selectedFish = fishData[i];
        document.getElementById("fish-name").textContent = "Name: " + fishData[i].name;
        document.getElementById("fish-type").textContent = "Type: " + fishData[i].type;
        document.getElementById("fish-age").textContent = "Age: " + fishData[i].age;
        document.getElementById("fish-size").textContent = "Size: " + fishData[i].size.toFixed(1) + " cm";
        document.getElementById("fish-hunger").textContent = "Hunger: " + fishData[i].hunger;
        document.getElementById("fish-status").textContent = "Status: " + getFishStatus(fishData[i].hunger);
    });

    if (fishData[i].direction === 1) {
        fish.style.transform = "scaleX(-1)";
    }
}

function getFishStatus(hunger) {
    if (hunger >= 70) {
        return "Healthy";
    }

    if (hunger >= 30) {
        return "Hungry";
    }

    return "Very Hungry";
}

function getCurrentMoveSpeed(data) {
    let currentMoveSpeed = data.moveSpeed;
    const status = getFishStatus(data.hunger);

    if (status === "Very Hungry") {
        currentMoveSpeed *= 0.5;
    } else if (status === "Hungry") {
        currentMoveSpeed *= 0.8;
    }

    return currentMoveSpeed;
}

function getCurrentSwimHeight(data) {
    let currentSwimHeight = data.swimAmplitude;
    const status = getFishStatus(data.hunger);

    if (status === "Very Hungry") {
        currentSwimHeight *= 0.3;
    } else if (status === "Hungry") {
        currentSwimHeight *= 0.7;
    }

    return currentSwimHeight;
}

function findNearestFood(data) {
    if (foods.length === 0) {
        return null;
    }

    let nearestFood = foods[0];

    let nearestDistance = Math.abs(parseFloat(foods[0].style.left) - data.x);

    for (let j = 1; j < foods.length; j++) {
        const foodDistance = Math.abs(parseFloat(foods[j].style.left) - data.x);

        if (foodDistance < nearestDistance) {
            nearestFood = foods[j];
            nearestDistance = foodDistance;
        }
    }

    return nearestFood;
}

function updateFishDirection(data, fish, foodX) {
    const fishCenterX = data.x + fish.offsetWidth / 2;

    if (foodX > fishCenterX + 30) {
        data.direction = 1;
        fish.style.transform = "scaleX(-1)";
    } else if (foodX < fishCenterX - 30) {
        data.direction = -1;
        fish.style.transform = "scaleX(1)";
    }
}

function moveFishTowardFoodY(data, fish, foodY){
    const verticalDifference = foodY - data.y;

    if (Math.abs(verticalDifference) > 10) {
        data.y += verticalDifference * 0.02;
    }

    const maxY = aquarium.clientHeight - fish.offsetHeight;

    if (data.y < 0) {
        data.y = 0;
    }

    if (data.y > maxY) {
        data.y = maxY;
    }
}

function moveFishTowardFoodX(data, fish, foodX, currentMoveSpeed) {
    let fishMouthX;

    if (data.direction === 1) {
        fishMouthX = data.x + fish.offsetWidth;
    } else {
        fishMouthX = data.x;
    }

    if (Math.abs(foodX - fishMouthX) > 10) {
        data.x += currentMoveSpeed * data.direction;
    }
}

function handleFishBoundary(data, fish, maxX) {
    if (data.x >= maxX) {
        data.x = maxX;
        data.direction = -1;
        fish.style.transform = "scaleX(1)";
    }

    //left end
    if (data.x <= 0) {
        data.x = 0;
        data.direction = 1;
        fish.style.transform = "scaleX(-1)";
    }
}

function updateFishDisplay(data, fish, y) {
    fish.style.left = data.x + "px";
    fish.style.top = y + "px";
    fish.style.width = data.size * 10 + "px"
}

function swim() {
    for (let i = 0; i < fishData.length; i++) {
        const data = fishData[i];
        const fish = fishImages[i];

        const maxX = aquarium.clientWidth - fish.offsetWidth;

        let currentMoveSpeed = getCurrentMoveSpeed(data);

        let nearestFood = findNearestFood(data);

        if (nearestFood !== null) {
            const foodX = parseFloat(nearestFood.style.left);

            updateFishDirection(data, fish, foodX);

            const foodY = parseFloat(nearestFood.style.top);
            
            moveFishTowardFoodY(data, fish, foodY);

            moveFishTowardFoodX(data, fish, foodX, currentMoveSpeed);

        } else {
            data.x += currentMoveSpeed * data.direction;
        }

        handleFishBoundary(data, fish, maxX);

        data.swimTime += data.swimFrequency;

        const currentSwimHeight = getCurrentSwimHeight(data);

        const y = data.y + Math.sin(data.swimTime) * currentSwimHeight;

        updateFishDisplay(data, fish, y);
    }

    requestAnimationFrame(swim);
}

swim();
