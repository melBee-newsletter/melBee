import email
from typing import List, Optional
from pydantic import BaseModel
from typing import List


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

# ---- Email ---- #


class SendEmail(BaseModel):
    email: List[str]
    subject: str
    message_body: str
    user_id: int

# --- SentHistory --- #


class SentHistory(BaseModel):
    subject: str
    recipients: str
    template: str
    date_sent: str
    user_id: int

# --- ContactList --- #


class ContactList(BaseModel):
    email: str
    id: int
    user_id: int
    is_subscribed: bool

    class Config:
        orm_mode = True


class Contact(BaseModel):
    email: str
    user_id: int
    is_subscribed: bool
