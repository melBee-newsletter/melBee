from __future__ import print_function

from cgitb import html
from email import message
import email
import os
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.audio import MIMEAudio
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
import mimetypes
import base64

# If modifying these scopes, delete the file token.json.

SCOPES = ['https://mail.google.com/']


def getService():
    """Shows basic usage of the Gmail API.
    Lists the user's Gmail labels.
    """

    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.

    SCOPES = ['https://mail.google.com/']
    SERVICE_ACCOUNT_FILE = os.environ.get('GOOGLE_CREDENTIALS')

    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)

    isDevelopment = (False if os.getenv("DATABASE_URL") else True)
    if isDevelopment:
        PORT = 8080
    else:
        PORT = 0

    service = build('gmail', 'v1', creds=credentials)

    return service


def create_message(sender, subject, message_body, to=None, bcc=None, cc=None):
    message = MIMEText(message_body, "html")
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    message['bcc'] = bcc
    message['cc'] = cc
    raw_message = base64.urlsafe_b64encode(message.as_string().encode("utf-8"))
    return {
        'raw': raw_message.decode("utf-8")
    }


def create_draft(service, user_id, message_body):
    try:
        message = {'message': message_body}
        draft = service.users().drafts().create(userId=user_id, body=message).execute()
        print("Draft id: %s\nDraft message: %s" %
              (draft['id'], draft['message']))
        return draft
    except Exception as e:
        print('An error occurred: %s' % e)
        return None


def send_message(service, user_id, message):
    try:
        message = service.users().messages().send(
            userId=user_id, body=message).execute()
        print('Message Id: %s' % message['id'])
        return message
    except Exception as e:
        print('An error occurred: %s' % e)
        return None


def send_email(receivers, subject, message_body):
    service = getService()
    user_id = "me"
    sender = "melbee.noreply@gmail.com"
    to = "melbee.noreply@gmail.com"
    subject = subject
    message_body = message_body
    receivers = receivers
    msg = create_message(sender, subject, message_body,
                         to, receivers, cc=None)
    send_message(service, user_id, msg)
