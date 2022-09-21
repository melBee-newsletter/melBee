import os
from os.path import join, dirname
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv
load_dotenv(verbose=True)

dotenv_path = join(dirname(__file__), 'database\env.local')
load_dotenv(dotenv_path)

EMAIL_ADDRESS = os.environ.get("EMAIL_ADDRESS") if os.environ.get(
    "EMAIL_ADDRESS") else os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD") if os.environ.get(
    "EMAIL_PASSWORD") else os.getenv("EMAIL_PASSWORD")


def send_email(receivers, subject, message_body):
    print(EMAIL_ADDRESS, EMAIL_PASSWORD)
    msg = EmailMessage()
    my_address = 'melBee team'
    bcc = receivers
    rcpt = bcc
    msg["Subject"] = subject

    msg.set_content("")
    msg.add_alternative(message_body, subtype='html')

    with smtplib.SMTP_SSL('smtp.gmail.com', '465') as server:
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg, my_address, rcpt)