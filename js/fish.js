var fishData = [
    {name: "Nemo", type: "Clownfish", age: 1, size: 10, maxSize: 20, hunger: 50, x: 100, y: 150, speed: 2, direction: 1, time: 0, swimHeight: 15, swimSpeed: 0.04},
    {name: "Dory", type: "Blue Tang", age: 2, size: 15, maxSize: 30, hunger: 50, x: 400, y: 250, speed: 1.5, direction: -1, time: 2, swimHeight: 25, swimSpeed: 0.06},
    {name: "Goldie", type: "Goldfish", age: 1, size: 8, maxSize: 15, hunger: 50, x: 600, y: 350, speed: 2.5, direction: 1, time: 4, swimHeight: 10, swimSpeed: 0.03},
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
        document.getElementById("fish-speed").textContent = "Speed: " + fishData[i].speed;
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

function swim() {
    for (let i = 0; i < fishData.length; i++) {
        const data = fishData[i];
        const fish = fishImages[i];

        const maxX = aquarium.clientWidth - fish.offsetWidth;

        if (data.x > maxX) {
            data.x = maxX;
        }

        //movement

        let currentSpeed = data.speed;

        if (getFishStatus(data.hunger) === "Very Hungry") {
            currentSpeed *= 0.5;
        } else if (getFishStatus(data.hunger) === "Hungry") {
            currentSpeed *= 0.8;
        }

        let nearestFood = null;

        if (foods.length > 0) {
            nearestFood = foods[0];

            let nearestDistance = Math.abs(parseFloat(foods[0].style.left) - data.x);

            for (let j = 1; j < foods.length; j++) {
                const foodDistance = Math.abs(parseFloat(foods[j].style.left) - data.x);

                if (foodDistance < nearestDistance) {
                    nearestFood = foods[j];
                    nearestDistance = foodDistance;
                }
            }

            const foodX = parseFloat(nearestFood.style.left);

            const fishCenterX = data.x + fish.offsetWidth / 2;

            if (foodX > fishCenterX + 30) {
                data.direction = 1;
                fish.style.transform = "scaleX(-1)";
            } else if (foodX < fishCenterX - 30) {
                data.direction = -1;
                fish.style.transform = "scaleX(1)";
            }

            const foodY = parseFloat(nearestFood.style.top);
            const fishY = data.y;

            const verticalDifference = foodY - fishY;

            if (Math.abs(verticalDifference) > 10) {
                data.y += verticalDifference * 0.02;
            }
        }

        //x-axis movement
        if (nearestFood !== null) {
            const foodX = parseFloat(nearestFood.style.left);

            let fishMouthX;

            if (data.direction === 1) {
                fishMouthX = data.x + fish.offsetWidth;
            } else {
                fishMouthX = data.x;
            }

            if (Math.abs(foodX - fishMouthX) > 10) {
                data.x += currentSpeed * data.direction;
            }

        } else {
            data.x += currentSpeed * data.direction
        }

        //right end
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

        //up/down
        data.time += data.swimSpeed;

        let currentSwimHeight = data.swimHeight;

        if (getFishStatus(data.hunger) === "Very Hungry") {
            currentSwimHeight *= 0.3;
        } else if (getFishStatus(data.hunger) === "Hungry") {
            currentSwimHeight *= 0.7;
        }

        const y = data.y + Math.sin(data.time) * currentSwimHeight;

        //fish display
        fish.style.left = data.x + "px";
        fish.style.top = y + "px";
        fish.style.width = data.size * 10 + "px"
    }

    requestAnimationFrame(swim);
}

swim();
