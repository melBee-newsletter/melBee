# melBee

## Getting Started
To make a copy up to your local environment, follow the steps below.

**1. Run the backend server**

**Set up virtual environment**

In `melBee/backend`,

  ```shell
  python -m venv env
  ```

If you're using Mac terminal or Windows Bash, 

  ```shell 
  source ./env/bin/activate
  ```

If you're using Windows PowerShell,

  ```shell
  .\env\Scripts\Activate.ps1
  ```

In `melBee/backend`,

  ```shell
  pip3 install fastapi uvicorn psycopg2-binary SQLAlchemy passlib python-dotenv
  pip3 install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib
  ```

**Set up Gmail API**
Go to Google Developers Console, create an app and download your client ID from your app in OAuth consent screen tab.
Rename the file to credentials.json and add it into your "app" folder.
Change "sender" and "to" email.

 ```shell
    sender = "YOUR_EMAIL@gmail.com"
    to = "RECEIVER_EMAIL@domain.com"
  ```

Run the following comands to send test emails.

 ```shell
  python app/mailSender.py
  ```

**Set up local database**
Open up the local postgreSQL by running `psql` and create a database called "melBee".

  ```sql
  CREATE DATABASE melBee;
  ```

In `melBee/backend/app/database`, create a `.env.local` file and add information below.

  ```
  DATABASE_URL=postgresql://YOUR DB USERNAME:YOUR DB PASSWORD@localhost/melbee
  ```
  

**Run the server**

In `melBee/backend/app`,

  ```shell
  uvicorn main:app
  ```

**3. Run the React server**

In `melBee/frontend`,


**Set up react-router-dom tailwindcss axios**

  ```
  npm install react-router-dom tailwindcss@latest axios @tinymce/tinymce-react
  ```
  
  
  ```shell
  npm start
  ```
