import os
from os.path import join, dirname
import smtplib
from email.message import EmailMessage
from email.utils import formataddr
from dotenv import load_dotenv

load_dotenv(verbose=True)
dotenv_path = join(dirname(__file__), 'database\.env.local')
load_dotenv(dotenv_path)

EMAIL_ADDRESS = os.environ.get("EMAIL_ADDRESS") if os.environ.get(
    "EMAIL_ADDRESS") else os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD") if os.environ.get(
    "EMAIL_PASSWORD") else os.getenv("EMAIL_PASSWORD")

BASE_URL = os.environ.get("APP_PUBLIC_URL") or "http://localhost:8000"


def send_email(receiver, subject, message_body, user_id, user_email, receiver_id):

    unsubscribe_template = f"""<div style="color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
                            <p style="font-size: 14px; line-height: 140%;"><a href= "{BASE_URL}/unsubscribe/{user_id}/{receiver_id}"> 配信を停止 </a> センダーは{user_email}</p>
                          </div>"""

    msg = EmailMessage()
    msg["From"] = formataddr((f'{user_email}', EMAIL_ADDRESS))
    msg["To"] = receiver
    msg["Subject"] = subject
    msg.set_content("")
    msg.add_alternative(message_body + unsubscribe_template, subtype='html')
    with smtplib.SMTP_SSL('smtp.gmail.com', '465') as server:
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
