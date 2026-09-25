const aquarium = document.getElementById("aquarium");

const fishData = [
    {x: 100, y: 150, speed: 2, direction: 1, time: 0},
    {x: 400, y: 250, speed: 1.5, direction: -1, time: 2},
    {x: 600, y: 350, speed: 2.5, direction: 1, time: 4},
]

const fishImages = [];

for (let i = 0; i < fishData.length; i++) {
    const fish = document.createElement("img");

    fish.src = "images/fish.png";
    fish.alt = "Fish";
    fish.className = "fish";

    aquarium.appendChild(fish);

    fishImages.push(fish);

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
        data.time += 0.05;
        const y = data.y + Math.sin(data.time) * 20;

        fish.style.left = data.x + "px";
        fish.style.top = y + "px";
    }

    requestAnimationFrame(swim);
}

swim();