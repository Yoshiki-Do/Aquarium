const fish = document.getElementById("fish");
const aquarium = document.getElementById("aquarium");


let x = 100;
let speed = 2;
let direction = 1;

function swim() {
    x += speed * direction;

    const maxX = aquarium.clientWidth - fish.offsetWidth;
    
    if (x >= maxX) {
        x = maxX;
        direction = -1;
        fish.style.transform = "scaleX(1)";
    }

    if (x <= 0) {
        x = 0;
        direction = 1;
        fish.style.transform = "scaleX(-1)";
    }

    fish.style.left = x + "px";

    requestAnimationFrame(swim);
}

swim();