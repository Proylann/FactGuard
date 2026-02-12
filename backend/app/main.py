# main.py
import os
from dotenv import load_dotenv

# 1. LOAD ENVIRONMENT VARIABLES FIRST
# This must happen before importing anything that needs the DB
load_dotenv()

# Optional: Debug print to check if it's loading (delete this line in production)
print(f"DEBUG: DATABASE_URL is set to: {os.getenv('DATABASE_URL')}")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 2. Import local modules AFTER loading dotenv
from .db import engine, Base
from .api import router as api_router

app = FastAPI(title="FactGuard API")

# --- CORS MIDDLEWARE ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ROUTER REGISTRATION ---
app.include_router(api_router, prefix="/api")

# --- ROOT ENDPOINT ---
@app.get("/")
def read_root():
    return {"message": "FactGuard API is running"}

# --- DATABASE STARTUP ---
@app.on_event('startup')
def startup():
    print("Connecting to database...")
    try:
        # This creates tables if they don't exist
        Base.metadata.create_all(bind=engine)
        print("Database connection successful. Tables created.")
    except Exception as e:
        print(f"Error connecting to database: {e}")