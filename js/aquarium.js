const aquarium = document.getElementById("aquarium");
let gameDay = 1;
let selectedFish = null;

const fishData = [
    {name: "Nemo", type: "Clownfish", age: 1, size: 10, maxSize: 20, hunger: 50, x: 100, y: 150, speed: 2, direction: 1, time: 0, swimHeight: 15, swimSpeed: 0.04},
    {name: "Dory", type: "Blue Tang", age: 2, size: 15, maxSize: 30, hunger: 50, x: 400, y: 250, speed: 1.5, direction: -1, time: 2, swimHeight: 25, swimSpeed: 0.06},
    {name: "Goldie", type: "Goldfish", age: 1, size: 8, maxSize: 15, hunger: 50, x: 600, y: 350, speed: 2.5, direction: 1, time: 4, swimHeight: 10, swimSpeed: 0.03},
]

const fishImages = [];

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

const feedButton = document.getElementById("feed-button");

feedButton.addEventListener("click", function() {
    const food  = document.createElement("div");

    food.className = "food";

    food.style.left = Math.random() * (aquarium.clientWidth - 20) + "px";
    food.style.top = "10px";

    aquarium.appendChild(food);

    let foodY = 10;

    const foodFall = setInterval(function() {
        foodY += 2;

        food.style.top = foodY + "px";

        for (let i = 0; i < fishData.length; i++) {
            const fish =  fishImages[i];
            const data = fishData[i];

            const fishCenterX = data.x + fish.offsetWidth / 2;
            const fishCenterY = data.y + fish.offsetHeight / 2;

            const foodX = parseFloat(food.style.left) + 6;
            const foodCenterY = foodY + 6;

            const distanceX = Math.abs(fishCenterX - foodX);
            const distanceY = Math.abs(fishCenterY - foodCenterY);

            if (distanceX < 40 && distanceY < 40) {
                data.hunger += 20;

                if (data.hunger > 100) {
                    data.hunger = 100;
                }

                food.remove();
                clearInterval(foodFall);

                if (selectedFish === data) {
                    document.getElementById("fish-hunger").textContent = "Hunger: " + data.hunger;
                    document.getElementById("fish-status").textContent = "Status: " + getFishStatus(data.hunger);
                }

                break;
            }
        }

        if (foodY >= aquarium.clientHeight - 20) {
            clearInterval(foodFall);
        }
    }, 30);

});

function swim() {
    for (let i = 0; i < fishData.length; i++) {
        const data = fishData[i];
        const fish = fishImages[i];

        const maxX = aquarium.clientWidth - fish.offsetWidth;
        if (data.x > maxX) {
            data.x = maxX;
        }

        //movement
        //right/left
        let currentSpeed = data.speed;

        if (getFishStatus(data.hunger) === "Very Hungry") {
            currentSpeed *= 0.5;
        } else if (getFishStatus(data.hunger) === "Hungry") {
            currentSpeed *= 0.8;
        }

        data.x += currentSpeed * data.direction;

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

function getFishStatus(hunger) {
    if (hunger >= 70) {
        return "Healthy";
    }

    if (hunger >= 30) {
        return "Hungry";
    }

    return "Very Hungry";
}

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