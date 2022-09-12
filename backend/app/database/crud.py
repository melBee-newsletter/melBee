from sqlalchemy.orm import Session
import database.models as models
import database.schemas as schemas
from passlib.context import CryptContext
import database.seed.templates as templates

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
    db_item = models.Item(**item.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_template_by_id(db: Session, id: int):
    return db.query(models.Template).filter(models.Template.id == id).first()

def seed_template(db: Session):
    len = db.query(models.Template).count()

    limit = 2
    if len >= limit:
        return None

    db_template_flower = models.Template(title="flower_shop", thumbnail="test", body=templates.flower_shop)
    db.add(db_template_flower)
    db_template_wedding = models.Template(title="wedding_invitation", thumbnail="test", body=templates.wedding)
    db.add(db_template_wedding)
    db.commit()
    
    return db_template_wedding