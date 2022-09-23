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

BASE_URL = os.environ.get("APP_PUBLIC_URL") or "http://localhost:3000"


def send_email(receiver, subject, message_body, user_id, user_email, receiver_id):

    unsubscribe_template = f"""<!DOCTYPE HTML
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">
​
<head>
  <!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <title></title>
​
  <style type="text/css">
    @media only screen and (min-width: 520px) {{
        {{
        .u-row {{
            {{
            width: 500px !important;
          }}
        }}
​
        .u-row .u-col {{
            {{
            vertical-align: top;
          }}
        }}
​
        .u-row .u-col-100 {{
            {{
            width: 500px !important;
          }}
        }}
​
      }}
    }}
​
    @media (max-width: 520px) {{
        {{
        .u-row-container {{
            {{
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }}
        }}
​
        .u-row .u-col {{
            {{
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }}
        }}
​
        .u-row {{
            {{
            width: calc(100% - 40px) !important;
          }}
        }}
​
        .u-col {{
            {{
            width: 100% !important;
          }}
        }}
​
        .u-col>div {{
            {{
            margin: 0 auto;
          }}
        }}
      }}
    }}
​
    body {{
        {{
        margin: 0;
        padding: 0;
      }}
    }}
​
    table,
    tr,
    td {{
        {{
        vertical-align: top;
        border-collapse: collapse;
      }}
    }}
​
    p {{
        {{
        margin: 0;
      }}
    }}
​
    .ie-container table,
    .mso-container table {{
        {{
        table-layout: fixed;
      }}
    }}
​
    * {{
        {{
        line-height: inherit;
      }}
    }}
​
    a[x-apple-data-detectors='true'] {{
        {{
        color: inherit !important;
        text-decoration: none !important;
      }}
    }}
​
    table,
    td {{
        {{
        color: #000000;
      }}
    }}
  </style>
​
​
​
</head>
​
<body class="clean-body u_body"
  style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table
    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%"
    cellpadding="0" cellspacing="0">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
​
​
          <div class="u-row-container" style="padding: 0px;background-color: #ffffff">
            <div class="u-row"
              style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
              <div
                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
​
                <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #ffffff;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                <div class="u-col u-col-100"
                  style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                  <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div
                      style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                      <!--<![endif]-->
​
                      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                        cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td
                              style="overflow-wrap:break-word;word-break:break-word;padding:0 10px;font-family:arial,helvetica,sans-serif;"
                              align="left">
​
                              <div style="text-align: center; word-wrap: break-word;">
                                <p style="font-size: 12px; line-height: 140%; margin: 0;">このメールは{user_email}より送られています。
                                </p>
                                <p style="font-size: 12px; line-height: 140%;">メールの配信停止を希望される方は<a
                                    href="{BASE_URL}/user/contact/unsubscribe/{user_id}/{receiver_id}">こちら</a>をクリックし、配信停止をしてください。
                                </p>
                              </div>
​
                            </td>
                          </tr>
                        </tbody>
                      </table>
​
                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>
​
​
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>
​
</html>"""

    msg = EmailMessage()
    msg["From"] = formataddr((f'{user_email}', EMAIL_ADDRESS))
    msg["To"] = receiver
    msg["Subject"] = subject
    msg.set_content("")
    msg.add_alternative(message_body + unsubscribe_template, subtype='html')
    with smtplib.SMTP_SSL('smtp.gmail.com', '465') as server:
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)

def send_unsub_note(email, subject, message_body):

    msg = EmailMessage()
    msg["From"] = formataddr((f'{email}', EMAIL_ADDRESS))
    msg["To"] = EMAIL_ADDRESS
    msg["Subject"] = subject
    msg.set_content("")
    msg.add_alternative(message_body, subtype='html')
    with smtplib.SMTP_SSL('smtp.gmail.com', '465') as server:
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)