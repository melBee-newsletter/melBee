# melBee

## Getting Started
If you want to try the deployed app, go to [https://melbee.herokuapp.com/](https://melbee.herokuapp.com/)!


If you want to make a copy up to your local environment to run the app locally, follow the steps below.

Firstly, please clone the repo.


```shell
git clone git@github.com:melBee-newsletter/melBee.git
```

Once you cloned it, let's get the backend and frontend servers start running.

### Set up the backend server

Go to `melBee/backend`, and set up the virtual environmt.

```shell
python3 -m venv env
```

If you're using Mac terminal or Windows Bash, run:

```shell
source ./env/bin/activate
```

If you're using Windows PowerShell, run:

```shell
.\env\Scripts\Activate.ps1
```

Go to `melBee/backend`, and install the libraries we use.

```shell
pip3 install -r requirements.txt
```

Go to your [Google Account setting page](https://myaccount.google.com/) and create an app password.

Open up the local postgreSQL by running `psql` and create a database called "melbee".

```sql
CREATE DATABASE melbee;
```

Go to `melBee/backend/app/database`, and create a `.env.local` file and add information below.

```
DATABASE_URL=postgresql://YOUR DB USERNAME:YOUR DB PASSWORD@localhost/melbee
EMAIL_ADDRESS="YOUR EMAIL"
EMAIL_PASSWORD="YOUR APP PASSWORD"
```


In `melBee/backend/app`, run:

```shell
uvicorn main:app --reload
```

### Set up the React server

Go to`melBee/frontend`, and install the dependencies listed in `package.json` by running:

```shell
npm install 
```

Start the React server by running:

```shell
npm run dev
```
