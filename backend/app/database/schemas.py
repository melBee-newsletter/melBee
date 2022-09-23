from typing import List
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

# ---- ExternalInfo ---- #

class ExternalInfo(BaseModel):
    id: int
    user_id: int
    analyticsID: str
    instagramID: str
    twitterID: str
    facebookID: str
    homepage: str

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
    id: int
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

class SendUnsubNote(BaseModel):
    email: str
    subject: str
    message_body: str

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


class ContactCheck(BaseModel):
    id: int
    user_id: int
