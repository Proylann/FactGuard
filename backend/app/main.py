from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import router as api_router
from .db import engine, Base
app = FastAPI(title="FactGuard API")

# --- CORS MIDDLEWARE ---
# This allows your React frontend to talk to your backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (POST, GET, etc.)
    allow_headers=["*"],  # Allows all headers (Content-Type, Authorization, etc.)
)

# Include the API routes we've been testing
app.include_router(api_router, prefix="/api")

# Root endpoint to check if the server is alive
@app.get("/")
def read_root():
    return {"message": "FactGuard API is running"}

# --- DATABASE STARTUP ---
@app.on_event('startup')
def startup():
    # This creates the tables in PostgreSQL automatically
    Base.metadata.create_all(bind=engine)
    print("Database tables created and server started!")