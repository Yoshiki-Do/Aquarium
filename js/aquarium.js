const aquarium = document.getElementById("aquarium");

const fishData = [
    {name: "Nemo", type: "Clownfish", age: 1, size: 10, x: 100, y: 150, speed: 2, direction: 1, time: 0, swimHeight: 15, swimSpeed: 0.04},
    {name: "Dory", type: "Blue Tang", age: 2, size: 15, x: 400, y: 250, speed: 1.5, direction: -1, time: 2, swimHeight: 25, swimSpeed: 0.06},
    {name: "Goldie", type: "Goldfish", age: 1, size: 8, x: 600, y: 350, speed: 2.5, direction: 1, time: 4, swimHeight: 10, swimSpeed: 0.03},
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
        document.getElementById("fish-name").textContent = "Name: " + fishData[i].name;
        document.getElementById("fish-type").textContent = "Type: " + fishData[i].type;
        document.getElementById("fish-age").textContent = "Age: " + fishData[i].age;
        document.getElementById("fish-size").textContent = "Size: " + fishData[i].size + " cm";
        document.getElementById("fish-speed").textContent = "Speed: " + fishData[i].speed;
    })

    if (fishData[i].direction === 1) {
        fish.style.transform = "scaleX(-1)";
    }
}

function swim() {
    for (let i = 0; i < fishData.length; i++) {
        const data = fishData[i];
        const fish = fishImages[i];

        const maxX = aquarium.clientWidth - fish.offsetWidth;

        //movement
        //right/left
        data.x += data.speed * data.direction;

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
        const y = data.y + Math.sin(data.time) * data.swimHeight;

        fish.style.left = data.x + "px";
        fish.style.top = y + "px";
    }

    requestAnimationFrame(swim);
}

swim();