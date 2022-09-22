from sqlalchemy.orm import Session
import database.models as models
import database.schemas as schemas
from passlib.context import CryptContext
import database.seed.templates as templates
import mailSender
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def get_user_template(db: Session, id: int):
    return db.query(models.UserTemplate).filter(models.UserTemplate.user_id == id).all()


def get_user_history(db: Session, id: int):
    return db.query(models.SentHistory).filter(models.SentHistory.user_id == id).all()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    session = Session()
    try:
        db.add(db_user)
        db.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()
    return db_user


def add_user_template(user: schemas.User, db: Session, usertemplate: schemas.TemplateBase):
    usertemplate = models.UserTemplate(
        user_id=user.id, title=usertemplate.title, thumbnail=usertemplate.thumbnail, body=usertemplate.body)
    session = Session()
    try:
        db.add(usertemplate)
        db.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()
    return usertemplate


def add_sent_history(user: schemas.User, db: Session, senthistory: schemas.SentHistory):
    senthistory = models.SentHistory(user_id=user.id, subject=senthistory.subject,
                                     recipients=senthistory.recipients, template=senthistory.template, date_sent=senthistory.date_sent)
    session = Session()
    try:
        db.add(senthistory)
        db.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()
    return senthistory


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def update_external_info(db: Session, id: int, info: str, media: str) -> tuple():
    media_types = ["analytics", "instagram", "twitter", "facebook", "homepage"]
    if media not in media_types:
        return (False, "Unsupported media type. サポートされていないメディアです。")

    media_col = media + "ID"
    db_external_info = db.query(models.ExternalInfo).filter(models.ExternalInfo.user_id == id).first()
    session = Session()

    if db_external_info:
        try:
            setattr(db_external_info, media_col, info) 
            db.commit()
        except Exception as err:
            session.rollback()
            return (False, err.args)
        finally:
            session.close()
    else:
        try:
            external_info = models.ExternalInfo(user_id=id)
            setattr(external_info, media_col, info)
            db.add(external_info)
            db.commit()
        except Exception as err:
            session.rollback()
            return (False, err.args)
        finally:
            session.close()
    return (True, None)

def add_analytics(user: schemas.User, analyticsID: str):
    setattr(user, "analyticsID", analyticsID)
    return user


def add_instagram(user: schemas.User, instagramID: str):
    setattr(user, "instagramID", instagramID)
    return user


def add_twitter(user: schemas.User, twitterID: str):
    setattr(user, "twitterID", twitterID)
    return user


def add_facebook(user: schemas.User, facebookID: str):
    setattr(user, "facebookID", facebookID)
    return user


def add_homepage(user: schemas.User, homepage: str):
    setattr(user, "homepage", homepage)
    return user


def get_contact_list_by_user_id(db: Session, user_id: int):
    return db.query(models.ContactList).filter(models.ContactList.user_id == user_id).all()


def add_contact_list(db: Session, email: str, user_id: int, is_subscribed: bool):
    contact = models.ContactList(
        email=email, user_id=user_id, is_subscribed=is_subscribed)
    session = Session()
    try:
        db.add(contact)
        db.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()


def delete_contact_by_email_and_user_id(db: Session, emails: list[str], user_id: int):
    session = Session()
    try:
        for email in emails:
            db.query(models.ContactList).filter(models.ContactList.email ==
                                                email, models.ContactList.user_id == user_id).delete()
        db.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()


def unsubscribe_contact_by_email_and_user_id(db: Session, receiver_email: str, receiver_id: int, user_id: int):
    session = Session()
    try:
        db.query(models.ContactList).filter(
            models.ContactList.email == receiver_email, models.ContactList.id == receiver_id, models.ContactList.user_id == user_id).update({"is_subscribed": True})
        db.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()


def subscribe_contact_by_email_and_user_id(db: Session, receiver_email: str, receiver_id: int, user_id: int):
    session = Session()
    try:
        db.query(models.ContactList).filter(
            models.ContactList.email == receiver_email, models.ContactList.id == receiver_id, models.ContactList.user_id == user_id).update({"is_subscribed": True})
        db.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()


def get_template_by_id(db: Session, id: int):
    return db.query(models.Template).filter(models.Template.id == id).first()


def seed_template(db: Session):
    len = db.query(models.Template).count()

    limit = 13
    if len >= limit:
        return None

    session = Session()
    try:
        db_template_default = models.Template(
            title="最初から作成", thumbnail="", body=templates.default)
        db.add(db_template_default)
        db_template_defaultlight = models.Template(
            title="デフォルトのメール", thumbnail="", body=templates.defaultlight)
        db.add(db_template_defaultlight)
        db_template_defaultdark = models.Template(
            title="クールなメール", thumbnail="", body=templates.defaultdark)
        db.add(db_template_defaultdark)
        db_template_baby = models.Template(
            title="新しい家族", thumbnail="", body=templates.baby)
        db.add(db_template_baby)
        db_template_birthday = models.Template(
            title="誕生パーティー！", thumbnail="", body=templates.birthday)
        db.add(db_template_birthday)
        db_template_christmas = models.Template(
            title="クリスマスパーティー", thumbnail="", body=templates.christmas)
        db.add(db_template_christmas)
        db_template_newyear = models.Template(
            title="年賀状", thumbnail="", body=templates.newyear)
        db.add(db_template_newyear)
        db_template_flower = models.Template(
            title="お花屋さん", thumbnail="", body=templates.flower_shop)
        db.add(db_template_flower)
        db_template_school = models.Template(
            title="クラスのお便り", thumbnail="", body=templates.school)
        db.add(db_template_school)
        db_template_wedding = models.Template(
            title="結婚式の招待状", thumbnail="", body=templates.wedding)
        db.add(db_template_wedding)
        db.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()
    return db_template_wedding


def send_email(db: Session, receiver, subject, message_body, user_id):
    receiver_id = db.query(models.ContactList.id).filter(
        models.ContactList.user_id == user_id, models.ContactList.email == receiver).scalar()
    user_email = db.query(models.User.email).filter(
        models.User.id == user_id).scalar()
    return mailSender.send_email(receiver, subject, message_body, user_id, user_email, receiver_id)
