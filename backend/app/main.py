from urllib import response
from fastapi import FastAPI
from typing import List
from fastapi import Depends, FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import crud, models, schemas
from database.database import SessionLocal, engine
import uvicorn
import json

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


# ----- /jwt for our data storage (rsa256) ask tom for private key------ #

@app.post("/jwt")
def test():
    token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.gdvwkiNW_Il_XZq-ZxsuM7bczINyBzJX18-A95jrr_6sxyQmJnpe5s3UGqukB2oyRFM-r87VSUh5nsNLAblDXPx2qzD70Mu87BSIxDKnUejAuyXRUZHtM-Nb7pZNU4rULB47bQqT2ATbO8BQdHgJCqSBr1agMOzLCdwRUh0JPzqvcZrnsGP1-T3BrYDm_Kf-p7wYvkgPGIXfWgbjHvBqWiuLyH9gkK8AhGemfZwQgitiDuk6ylJlYcGLy2z8xhD13or7ZyaaEoh_3EdOki1_RDZIvdqp1uwcycF5Bp0dDdsMwtn3JvvLcUG10mlsJrOElLd_nr0zd_YY5wFXFY1b0w"
    return {"token": token}


# ----- /user ------ #

@app.get("/user/{id}")
def get_user(id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, id)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid id. 無効なidです。")
    return db_user


@app.get("/user/{id}/template")
def get_user(id: int, db: Session = Depends(get_db)):
    templateuser = crud.get_user_template(db, id)
    if not templateuser:
        raise HTTPException(status_code=400, detail="Invalid id. 無効なidです。")
    return templateuser


@app.post("/user/{id}/template", response_model={})
def add_user_template(id: int, template: schemas.TemplateBase, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, id)
    if not db_user:
        raise HTTPException(
            status_code=400, detail="You are foolish"
        )
    return crud.add_user_template(user=db_user, db=db, usertemplate=template)


@app.get("/user/{id}/sent_history")
def get_sent_history(id: int, db: Session = Depends(get_db)):
    userhistory = crud.get_user_history(db, id)
    if not userhistory:
        raise HTTPException(
            status_code=400, detail="Invalid id or no sent history. 無効なidもしくは送信履歴がありません。")
    return userhistory


@app.post("/user/{id}/sent_history", response_model={})
def add_sent_history(id: int, senthistory: schemas.SentHistory, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, id)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid id. 無効なidです。")
    return crud.add_sent_history(user=db_user, db=db, senthistory=senthistory)


@app.post("/user/{id}/add_analytics", response_model={})
def add_analytics(id: int, analyticsID: str, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, id)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid userid. 無効なidです。")
    return crud.add_analytics(user=db_user, db=db, analyticsID=analyticsID)


@app.post("/user/{id}/add_instagram", response_model={})
def add_analytics(id: int, instagramID: str, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, id)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid userid. 無効なidです。")
    return crud.add_instagram(user=db_user, db=db, instagramID=instagramID)


@app.post("/user/{id}/add_twitter", response_model={})
def add_analytics(id: int, twitterID: str, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, id)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid userid. 無効なidです。")
    return crud.add_twitter(user=db_user, db=db, twitterID=twitterID)


@app.post("/user/{id}/add_facebook", response_model={})
def add_analytics(id: int, facebookID: str, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, id)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid userid. 無効なidです。")
    return crud.add_facebook(user=db_user, db=db, facebookID=facebookID)


@app.post("/user/{id}/add_homepage", response_model={})
def add_analytics(id: int, homepage: str, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, id)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid userid. 無効なidです。")
    return crud.add_homepage(user=db_user, db=db, homepage=homepage)


@app.post("/user/check", response_model={})
def check_user(user: schemas.UserBase, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if not db_user:
        return {"isUserSignnedUp": False}
    return {"isUserSignnedUp": True}


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

#  ----- /user/contact_list ----- #


@app.get("/user/contact_list/{user_id}", response_model=list[schemas.ContactList])
def get_contact(user_id: int, db: Session = Depends(get_db)):
    db_contact = crud.get_contact_list_by_user_id(db, user_id)
    if not db_contact:
        raise HTTPException(
            status_code=400, detail="Invalid id or no contact list matched. 無効なidもしくはコンタクトリストがありません。")
    return db_contact


@app.post("/user/contact_list", response_model={})
def add_contact(contact: schemas.Contact, db: Session = Depends(get_db)):
    try:
        crud.add_contact_list(
            db, contact.email, contact.user_id, contact.is_subscribed)
    except Exception as err:
        raise HTTPException(status_code=400, detail=err.args)
    return {"message": "Data added succesfully. データが追加されました。"}


@app.delete("/user/contact_list", response_model={})
def delete_contact_by_email_and_user_id(emails: list[str], user_id: int, db: Session = Depends(get_db)):
    try:
        crud.delete_contact_by_email_and_user_id(db, emails, user_id)
    except:
        raise HTTPException(
            status_code=400, detail="Data cannot be delete. データの削除ができません。")
    return {"message": "Data deleted succesfully. データは削除されました。"}

#  ----- /user/contact/unsubscribe ----- #


@app.patch("/user/contact/unsubscribe", response_model={})
def unsubscribe_contact_by_email_and_user_id(email: str, user_id: int, db: Session = Depends(get_db)):
    crud.unsubscribe_contact_by_email_and_user_id(
        db, email, user_id)
    if not unsubscribe_contact_by_email_and_user_id:
        raise HTTPException(
            status_code=400, detail="Invalid email address or no contact list matched. 無効なメールアドレスもしくはコンタクトリストがありません。")
    return {"message": "Data changed succesfully. データは変更されました。"}

#  ----- /user/contact/subscribe ----- #


@app.patch("/user/contact/subscribe", response_model={})
def subscribe_contact_by_email_and_user_id(email: str, user_id: int, db: Session = Depends(get_db)):
    db_contact = crud.subscribe_contact_by_email_and_user_id(
        db, email, user_id)
    if not subscribe_contact_by_email_and_user_id:
        raise HTTPException(
            status_code=400, detail="Invalid email address or no contact list matched. 無効なメールアドレスもしくはコンタクトリストがありません。")
    return {"message": "Data changed succesfully. データは変更されました。"}

# ----- /template ------ #


@app.post("/template/seed")
def seed_templates(db: Session = Depends(get_db)):
    db_template = crud.seed_template(db)


@app.get("/template/{id}", response_model=schemas.Template)
def get_template(id: int, db: Session = Depends(get_db)):
    db_template = crud.get_template_by_id(db, id)
    if not db_template:
        raise HTTPException(status_code=400, detail="Invalid id. 無効なidです。")
    return db_template

# ----- /email ------ #


@app.post("/email/send", response_model={})
def send_email(sendEmail: schemas.SendEmail, db: Session = Depends(get_db)):
    for mail in sendEmail.email:
        crud.send_email(db, mail, sendEmail.subject,
                        sendEmail.message_body, sendEmail.user_id)
    return {"message": "Email sent! メールを送りました。"}


if __name__ == '__main__':
    uvicorn.run(app=app)
