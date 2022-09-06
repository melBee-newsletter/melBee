# melBee

## Getting Started
To make a copy up to your local environment, follow the steps below.

1. Install libraries
  
In `melBee/backend`,

    ```shell
    pip3 install fastapi
    pip3 install uvicorn
    ```

1. Run the backend server
  
In `melBee/backend`,

    ```shell
    python -m venv env
    ```

    If you're a Mac or Windows Bash user,

    ```shell
    source ./env/bin/activate
    ```

    If you're a Windows PowerShell user,

    ```shell
    .\env\Scripts\Activate.ps1
    ```
    
In `melBee/backend/app`,
    ```shell
    uvicorn main:app
    ```

1. Run the React server

In `melBee/frontend`,
    ```shell
    npm start
    ```