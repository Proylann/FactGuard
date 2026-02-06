from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    # This informs the user of the limit before they even hit the backend
    password: str = Field(..., max_length=72)
class UserOut(BaseModel):
    user_id: int  # ...but your database calls it this!
    email: EmailStr
    username: Optional[str] = None # Add this since your DB has a username column

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
