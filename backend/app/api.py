from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas
from .db import get_db
from .repositories import UserRepository
from .services import AuthService

router = APIRouter()

@router.post('/signup', response_model=schemas.UserOut)
def signup(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    user_repo = UserRepository(db)
    auth = AuthService(user_repo)
    try:
        user = auth.register_user(payload.email, payload.password)
        return user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post('/login', response_model=schemas.UserOut)
def login(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    user_repo = UserRepository(db)
    auth = AuthService(user_repo)

    # This calls the authenticate method we fixed in your Services.py
    user = auth.authenticate(email=payload.email, password=payload.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
        
    return user