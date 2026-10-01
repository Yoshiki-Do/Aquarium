var foods = [];

const feedButton = document.getElementById("feed-button");

feedButton.addEventListener("click", function() {
    const food  = document.createElement("div");

    food.className = "food";

    food.style.left = Math.random() * (aquarium.clientWidth - 20) + "px";
    food.style.top = "10px";

    aquarium.appendChild(food);
    foods.push(food);

    if (waterQuality > 0) {
        waterQuality -= 1;
    }

    let foodY = 10;

    const foodFall = setInterval(function() {
        foodY += 2;

        food.style.top = foodY + "px";

        for (let i = 0; i < fishData.length; i++) {
            const fish =  fishImages[i];
            const data = fishData[i];

            let fishMouthX;
            if (data.direction === 1) {
                fishMouthX = data.x + fish.offsetWidth;
            } else {
                fishMouthX = data.x;
            }

            const fishMouthY = data.y + fish.offsetHeight / 2;

            const foodX = parseFloat(food.style.left) + 6;
            const foodCenterY = foodY + 6;

            const distanceX = Math.abs(fishMouthX - foodX);
            const distanceY = Math.abs(fishMouthY - foodCenterY);

            if (distanceX < 20 && distanceY < 20) {
                data.hunger += 20;

                if (data.hunger > 100) {
                    data.hunger = 100;
                }

                const foodIndex = foods.indexOf(food);

                if(foodIndex !== -1) {
                    foods.splice(foodIndex, 1);
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
            const foodIndex = foods.indexOf(food);

            if (foodIndex !== -1){
                foods.splice(foodIndex, 1);
            }

            food.remove();
            clearInterval(foodFall);
        }
    }, 30);

});