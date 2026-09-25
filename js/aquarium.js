const fish = document.getElementById("fish");
const aquarium = document.getElementById("aquarium");


let x = 100;
let baseY = 200;
let speed = 2;
let direction = 1;
let time = 0;

fish.style.transform = "scaleX(-1)";

function swim() {
    //movement
    //right/left
    x += speed * direction;

    const maxX = aquarium.clientWidth - fish.offsetWidth;
    
    //right end
    if (x >= maxX) {
        x = maxX;
        direction = -1;
        fish.style.transform = "scaleX(1)";
    }

    //left end
    if (x <= 0) {
        x = 0;
        direction = 1;
        fish.style.transform = "scaleX(-1)";
    }

    //up/down
    time += 0.05;
    const y = baseY + Math.sin(time) * 20;

    fish.style.left = x + "px";
    fish.style.top = y + "px";

    requestAnimationFrame(swim);
}

swim();