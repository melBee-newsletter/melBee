from urllib import response
from fastapi import FastAPI
from typing import List
from fastapi import Depends, FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import crud, models, schemas
from database.database import SessionLocal, engine
import uvicorn

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# DB Dependency


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Hello World"}

# ----- /user ------ #


@app.post("/user/signup", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=400, detail="Email already registered. このメールアドレスは登録されています。")
    return crud.create_user(db=db, user=user)


@app.post("/user/login", response_model=schemas.User)
def create_user(user: schemas.UserVerify, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if not db_user:
        raise HTTPException(
            status_code=400, detail="Email has not been registered. このメールアドレスは登録されていません。")

    isLoginSuccess = crud.verify_password(
        user.password, db_user.hashed_password)
    if not isLoginSuccess:
        raise HTTPException(
            status_code=400, detail="Email not matches password. メールアドレスとパスワードがマッチしません。")

    return db_user

# ----- /email ------ #


@app.post("/email/send", response_model={})
def send_email(receivers: schemas.Receivers, subject: schemas.Subject, message_body: schemas.MessageBody):
    for mail in receivers.email:
        crud.send_email(mail, subject.subject,
                        message_body.message_body)
    return {"message": "Email sent! メールを送りました。"}


if __name__ == '__main__':
    uvicorn.run(app=app)
