from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
from os.path import join, dirname

load_dotenv(verbose=True)
dotenv_path = join(dirname(__file__), '.env.local')
load_dotenv(dotenv_path)

SQLALCHEMY_DATABASE_URL = os.environ.get("DATABASE_URL")

engine = create_engine("postgresql://postgres:mel@localhost/melbee")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
