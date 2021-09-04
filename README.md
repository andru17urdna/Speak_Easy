<p align='center'>
  <img src='./react-app/src/assets/images/logo.png' height='200px'>
</p>

# Speak-Easy
Speak-Easy is a simple event planning website. You can create events, as well as send messages to other users. It is a fullstack React App made with a Redux state manager and a backend using Python, Flask, SQL-Alchemy, and PostgresSQL and any other technologies.

* View the <a href='https://Speak-Easy-app.herokuapp.com/'>Speak-Easy</a> App Live

* Reference to the Speak-Easy <a href='https://www.github.com/andru17urdna/Speak_Easy/wiki'>Wiki Docs</a>

| Table of Contents |
| ----------------- |
| 1. [Features](#features) |
| 2. [Installation](#installation) |
| 3. [Technical Implementation Details](#technical-implementation-details) |
| 4. [Future Features](#future-features) |
| 5. [Contact](#contact) |
| 6. [Special Thanks](#special-thanks) |

<br/><br/>
## Technologies
---
<br/>

* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/-JavaScript-F7DF1E?logo=JavaScript&logoColor=333333" /></a>
* <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/-PostgreSQL-336791?logo=PostgreSQL&logoColor=white" /></a>
* <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white"></a>
* <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB"></a>
* <a href="https://redux.js.org/"><img src="https://img.shields.io/badge/redux-%23593d88.svg?style=flat&logo=redux&logoColor=white"></a>
* <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/-CSS3-1572B6?logo=CSS3" /></a>
* <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white" /></a>
* <a href="https://flask.palletsprojects.com/"><img src="https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white" /></a>
* <a href="https://www.heroku.com/home"><img src="https://img.shields.io/badge/Heroku-430098?style=flat&logo=heroku&logoColor=white" /></a>


## Features
---
<br/>

### Sign In and Sign Up
![Sign Up](./readme-assets/images/signup.jpg)
![Login](./readme-assets/images/login.jpg)

### Logged In Home Page
Speak-Easy feed displays all Events
![Feed Page](./readme-assets/images/feed.jpg)

### View Events
Easily view Events on the Event page
![Events Page](./readme-assets/images/Events-page.jpg)

### Add Events
Add a new Events to the database
![Add Events](./readme-assets/images/Events-add.jpg)
Cancel adding Events
![Cancel Add Events](./readme-assets/images/Events-add-cancel.jpg)

### Create, Read, Update, Delete Events
View Events
![Messages](./readme-assets/images/Messages.png)
Edit and Add Events in the database
![Edit Messages](./readme-assets/images/Messages-edit.png)
![Add Messages](./readme-assets/images/Messages-add.png)



### Notification/ Messages Modal
Speak-Easy Messages/ Notifications can be found all in one place
![Feed Page](./readme-assets/images/feed.jpg)

### View Messages
Easily view Messages on the Messages Modal
![Events Page](./readme-assets/images/Events-page.jpg)

### Add Messages
Add a new Events to the database
![Add Events](./readme-assets/images/Events-add.jpg)
Cancel adding Events
![Cancel Add Events](./readme-assets/images/Events-add-cancel.jpg)

### Create, Read, Update, Delete Messages/ Notifications
View Messages/ Notifications
![Messages](./readme-assets/images/Messages.png)
Edit and Add Messages/ Notifications in the database
![Edit Messages](./readme-assets/images/Messages-edit.png)
![Add Messages](./readme-assets/images/Messages-add.png)

<br/><br/>

## Installation
---
<br/>

To build/run project locally, please follow these steps:

1. Clone this repository

```shell
git clone https://github.com/andru17urdna/Speak-Easy.git
```

2. Install Pipfile dependencies and create the virtual environment
```shell
pipenv install
```

2. Install npm dependencies for the `/react-app`

```shell
cd react-app
npm install
```

3. In the `/` root directory, create a `.env` based on the `.env.example` with proper settings

4. Setup your PostgreSQL user, password and database and ensure it matches your `.env` file

5. Before running any flask commands, confirm you are in the pipenv virtual env. If not, run the command:
```shell
pipenv shell
```

5. In the root folder, create the database by running in the terminal:
```shell
flask db init
```

6. In the root folder, migrate tables to the database by running in the terminal:
```shell
flask db migrate
```

7. In the root folder, seed the database by running in the terminal:
```shell
flask seed all
```

8. Start the flask backend in the `/` root directory
```shell
flask run
```

9. Start the frontend in the `/react-app` directory

```javascript
npm start
```


<!-- ## Technical Implementation Details

### {Detail 1}
Description 1

Part of code is shown below:

```python
print('add code snippet 1 here')
```

Description 2

```javascript
print('add code snippet 2 here')
```

### {Detail 2}
Description 1

Code snippet is shown here:

```javascript
print('add code snippet 1 here')
``` -->

<br/><br/>

## Future Features
<br/>
---
1. __Search__ - search Events

2. __RSVP__ - RSVP to created events

3. __Event QVC__ - Create a simple qvc as an inivitation for your event


## Contact

### Andru
<a href="https://www.linkedin.com/in/{linkedin-handle}/"><img src="./readme-assets/logos/linkedin-logo.png" height="28" align="middle" /></a>
<a href="https://angel.co/u/{angel-list-handle}"><img src="./readme-assets/logos/angellist-logo.png" height="28" align="middle" /></a>
<a href="https://github.com/andru17urdna"><img src="./readme-assets/logos/github-logo.png" height="38" align="middle" /></a>



## Special Thanks
* Fellow peers who have given me support and community: [Nico](https://github.com/nicopierson), [Henry](https://github.com/hnrywltn), [Pierre](https://github.com/TheGuilbotine), [Lema](https://github.com/lemlooma), [Meagan](https://github.com/meagan13), [Simon](https://github.com/Simonvargas), [Michelle](https://github.com/michellekontoff), [John](https://github.com/Jomix-13), [Manna](https://github.com/makon57), [Monte](https://github.com/theflaggship), [Diana](https://github.com/dianabeatriztinoco), and [Justice](https://github.com/jujmart)
