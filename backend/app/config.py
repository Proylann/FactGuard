from dotenv import load_dotenv
import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # This tells Pydantic to look for your .env file
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
    
    DATABASE_URL: str = 'postgresql://postgres:password@localhost:5432/factguard_db'

settings = Settings()
