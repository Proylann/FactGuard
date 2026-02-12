# Add 'status' to your fastapi imports
from fastapi import APIRouter, Depends, HTTPException, status 
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

    # Use a try block here too to catch any database or logic errors
    try:
        user = auth.authenticate(email=payload.email, password=payload.password)
        
        if not user:
            # This will now work because 'status' is imported
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
            
        return user
    except HTTPException:
        # Re-raise the 401 we just created
        raise
    except Exception as e:
        # Log the actual error for your own debugging
        print(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")