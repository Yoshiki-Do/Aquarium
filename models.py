from sqlalchemy import Column, Integer, Float, String
from database import Base


class Fish(Base):
    __tablename__ = "fish"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    type = Column(String)
    age = Column(Integer)
    size = Column(Float)
    maxSize = Column(Float)
    hunger = Column(Integer)
    health = Column(Integer)
    moveSpeed = Column(Float)
    swimAmplitude = Column(Float)
    swimFrequency = Column(Float)
