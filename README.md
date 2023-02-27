# BasicBot-discord.js
 
## Initial setup

### Step 1: `npm install`

This will install all the dependecies form package.json

### Step 2: `edit package.json & package-lock.json`

> #### Change the values of in package.json:

"name": "your bot name", <br>
"version": "0.0.0", <br>
"description": "your description",<br>
"repository": {<br>
"type": "git",<br>
"url": "your repo link if you have one"<br>
"author": "Your username",<br>
"license": "MIT",<br>
"url": "your repo link if you have one/issues"<br>
"homepage": "your repo link if you have one#readme",<br>

> #### Change the values of in package-lock.json:

"name": "your bot name", <br>
"version": "0.0.0", <br>

### Step 3: `copy your bot token from the discord dev portal to the .env file`

Rename the .env.example file to just .env.
Now copy your bot token from the discord dev portal to the .env file

### Step 4 `add all the intents to your server`

On the Discord Developer Portal in the Bot section go down to Privileged Gateway Intents and activate all 3 of them. (Presence intent, Server members intent, Message content intent)

### Step 5: `invite your bot to your server`

#### Explanation: [Here is how](https://discordpy.readthedocs.io/en/stable/discord.html)

On the URL Generator Section give the bot the scope of bot AND applications.commands and on Bot permissions Administrator (Administrator is just adviced for testing purposes. While in production you should give the bot only the permissions it needs.)

> The Scope part is important else your bot is not gonna start.

### Step 6: `copy your user(you as a developer) id into the properties.json file`

### Step 7: `Now npm run dev (development) or npm run start (production)`

And see if everything is working fine.
You schould see a login message in the terminal and the bot should be online.

else...
- ... check if the token provided by you is the right one
- ... check if you have a working code from this repo