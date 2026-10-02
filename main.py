from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, SessionLocal
from models import Base, Fish

app = FastAPI()

Base.metadata.create_all(bind=engine)

db = SessionLocal()

if db.query(Fish).count() == 0:
    fish = Fish(
        name="Nemo", type="Clownfish", age=1, size=10, maxSize=20, hunger=50, health=100
    )

    db.add(fish)
    db.commit()

db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api")
def read_api():
    return {"message": "Aquarium API is working."}


@app.get("/api/fish")
def get_fish():
    db = SessionLocal()

    fish_list = db.query(Fish).all()

    result = []

    for fish in fish_list:
        result.append(
            {
                "name": fish.name,
                "type": fish.type,
                "age": fish.age,
                "size": fish.size,
                "maxSize": fish.maxSize,
                "hunger": fish.hunger,
                "health": fish.health,
            }
        )

    db.close()

    return result
