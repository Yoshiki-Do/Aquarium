from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fish_data = [
    {
        "name": "Nemo",
        "type": "Clownfish",
        "age": 1,
        "size": 10,
        "maxSize": 20,
        "hunger": 50,
        "health": 100,
    },
    {
        "name": "Dory",
        "type": "Blue Tang",
        "age": 2,
        "size": 15,
        "maxSize": 30,
        "hunger": 50,
        "health": 100,
    },
    {
        "name": "Goldie",
        "type": "Goldfish",
        "age": 1,
        "size": 8,
        "maxSize": 15,
        "hunger": 50,
        "health": 3,
    },
]

@app.get("/api")
def read_api():
    return {"message": "Aquarium API is working."}

@app.get("/api/fish")
def get_fish():
    return fish_data
