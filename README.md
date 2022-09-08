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
  pip3 install fastapi uvicorn psycopg2-binary SQLAlchemy
  ```

**Set up local database**
Open up the local postgreSQL by running `psql` and create a database called "melBee".

  ```sql
  CREATE DATABASE melBee;
  ```

In `melBee/backend/database`, create a `.env.local` file and add information below.

  ```
  DATABASE_URL=postgresql://YOUR DB USERNAME:YOUR DB PASSWORD@localhost/melBee
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
  npm install react-router-dom tailwindcss@latest axios
  ```
  
  
  ```shell
  npm start
  ```
