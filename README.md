# melBee
![melbee_logo](https://user-images.githubusercontent.com/90857923/191744973-d03244db-8c93-4206-9266-5fde117a5f62.png)

[melBee](https://melbee.herokuapp.com/) is the awesome email customizer in Japan. It is the only html email customizer that is available in Japanese as of September 22nd 2022. melBee helps individuals and small businesses create html rich emails easily, and provides the capacity of analyzing data of the sent emails.

# Features

melBee provides the following features:
- Fully customizable newsletter maker
- Able to store customized templates and view sent history
- Draft auto-saver while editing template
- Simple to add marketing tools such as Google Analytics and SNS
- Unsubscribe option for newsletter receivers

# Built With

Frontend
- TypeScript
- React
- Tailwind CSS
- tinyMCE

Backend
- Python
- FastAPI
- SQLAlchemy
- bcrypt
- postgresSQL

# Developers

<table>
  <tr>
    <td align="center"><a href="https://github.com/Takhof"><img src="To be added" width="100px;" alt="To Be Added"/><br /><sub><b>Thomas Hofman</b></sub></a><br /><p>Full-Stack Engineer</p></td>
    <td align="center"><a href="https://github.com/kugaitomomi"><img src="To be added" width="100px;" alt="To Be Added"/><br /><sub><b>Tomomi Kugai</b></sub></a><br /><p>Frontend Engineer / Designer</p></td>
    <td align="center"><a href="https://github.com/Hiro-Kanetake"><img src="To be added" width="100px;" alt="TBA"/><br /><sub><b>Hiro Kanetake</b></sub></a><br /><p>Frontend Engineer</p></td>
    <td align="center"><a href="https://github.com/julioqui"><img src="To be added" width="100px;" alt="TBA"/><br /><sub><b>Julio Quiezi</b></sub></a><br /><p>Backend Engineer</p></td>
     <td align="center"><a href="https://github.com/walnut07"><img src="To be added" width="100px;" alt="To Be Added"/><br /><sub><b>Kurumi Muto</b></sub></a><br /><p>Backend Engineer</p></td>
   </tr>
</table>

# Getting Started
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
