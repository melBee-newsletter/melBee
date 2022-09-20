from ctypes.wintypes import BYTE
from email.policy import default
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.dialects.postgresql import BYTEA
from sqlalchemy.orm import relationship
from database.database import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    usertemplate = Column(String)


class UserTemplate(Base):
    __tablename__ = "usertemplate"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    title = Column(String, nullable=False)
    thumbnail = Column(String, nullable=False)
    body = Column(String, nullable=False)


class Template(Base):
    __tablename__ = "template"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, nullable=False)
    thumbnail = Column(String, nullable=False)
    body = Column(String, nullable=False)


class SentHistory(Base):
    __tablename__ = "senthistory"

    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String)
    recipients = Column(String)
    template = Column(String)
    date_sent = Column(String)
    user_id = Column(Integer, ForeignKey("user.id"))


class ContactList(Base):
    __tablename__ = "contactlist"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    is_subscribed = Column(Boolean, default=True)
    __table_args__ = (UniqueConstraint("email", "user_id"), None)
