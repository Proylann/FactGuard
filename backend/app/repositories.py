from sqlalchemy.orm import Session
from .models import User

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_email(self, email: str):
        return self.db.query(User).filter(User.email == email).first()

    def create(self, email: str, hashed_password: str, username: str = None):
        db_user = User(email=email, password=hashed_password, username=username)
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user