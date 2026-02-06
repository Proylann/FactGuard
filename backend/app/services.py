import hashlib
from passlib.context import CryptContext
from .repositories import UserRepository

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    def _pre_hash(self, password: str) -> str:
        # Converts any length password into a fixed 64-character string
        return hashlib.sha256(password.encode()).hexdigest()

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        # Pre-hash the login attempt before verifying
        return pwd_context.verify(self._pre_hash(plain_password), hashed_password)

    def get_password_hash(self, password: str) -> str:
        # Pre-hash during signup to stay under 72 bytes
        return pwd_context.hash(self._pre_hash(password))

    def register_user(self, email: str, password: str, username: str = None):
        existing = self.user_repo.get_by_email(email)
        if existing:
            raise ValueError("User already exists")
        
        hashed = self.get_password_hash(password)
        
        # Only create a default if the provided username is empty or None
        if not username:
            username = email.split('@')[0]
        
        return self.user_repo.create(
            username=username, 
            email=email, 
            hashed_password=hashed
        )
    def authenticate(self, email: str, password: str):
        user = self.user_repo.get_by_email(email)
        if not user:
            return None
        if not self.verify_password(password, user.password):
            return None
        return user