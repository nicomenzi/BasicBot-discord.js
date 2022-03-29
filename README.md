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
"author": "Aasjiel",<br>
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

On the Discord Developer Portal in the Bot section go down to Privileged Gateway Intents and activate all 3 of them. (Presebce intent, Server members intent, Message content intent)

### Step 5: `invite your bot to your server`

#### Explanation: [Here is how](https://discordpy.readthedocs.io/en/stable/discord.html)

On the URL Generator Section give the bot the scope of bot AND applications.commands and on Bot permissions Administrator

> The Scope part is important else your bot is not gonna start.

### Step 6: `copy your server token into /handlers/commands.js:29`

#### Explanation: [Here is how](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)

### Step 7: `Now run nodemon or node index.js`

And see if everything is working fine.
