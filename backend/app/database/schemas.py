import email
from typing import List, Optional
from pydantic import BaseModel



class ItemBase(BaseModel):
    title: str
    description: Optional[str] = None


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

# ---- User ----- #


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class UserVerify(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        orm_mode = True

# ---- Template ---- #


class TemplateBase(BaseModel):
    title: str
    thumbnail: str
    body: str

    class Config:
        orm_mode = True


class Template(TemplateBase):
    title: str
    thumbnail: str
    body: str

    class Config:
        orm_mode = True


class Receivers(BaseModel):
    email: List[str]


class Subject(BaseModel):
    subject: str


class MessageBody(BaseModel):
    message_body: str

# --- SentHistory --- #
class SentHistory(BaseModel):
    subject: str
    recipients: str
    template: str
    date_sent: str
    user_id: int