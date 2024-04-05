![Publish Docker Image](https://github.com/paul-mueser/stats-bot/actions/workflows/docker-image.yml/badge.svg)
[![GitHub release](https://img.shields.io/github/release/paul-mueser/stats-bot.svg)](https://github.com/paul-mueser/stats-bot/releases)
[![GitHub license](https://badgen.net/github/license/paul-mueser/stats-bot)](https://github.com/paul-mueser/stats-bot/blob/main/LICENSE)

# Basic discord bot using discord js

## [](#general)General

This is a basic Discord bot primarily used for gathering statistics from a channel in a Discord server calles
"Zitate", where users can post quotes. The bot can do a variety of things, such as counting the number of quotes per
user and per hour of the day.

## [](#features)Features

- Moderation: you can timeout, kick and ban users
- Quotes: get stats of the authors of the quotes, get all quotes of a specific author and much more

## [](#before-starting)Before starting

### [](#prerequisites)Prerequisites

To run the bot, you need to have Node.js installed on your machine. You can download it from the official
<a href="https://nodejs.org/en/" rel="external nofollow noopener" target="_blank">Node.js
website</a>.

### [](#setup)Setup

To set up the bot, you need to create a new application on the
<a href="https://discord.com/developers/applications" rel="external nofollow noopener" target="_blank">Discord Developer Portal</a>,
create a `.env` file in the root directory of the project and copy the
token of the bot and it's id into the file like this:

```
TOKEN=xxx
BOT_ID=xxx
```

### [](#developing-and-testing)Developing & testing

For testing, you can change the `testServer` and `devs` properties in `config.json` file to your test server id and
your developers discord id's. There you can also change the `quoteLeaderRoleName`, which is the role for the person
with the most quotes in the current week.  
Now you can run the bot with the argument `--test` to start the bot in
development mode, where new commands only get registered on your testServer.  
Pay attention, that the already registered commands will still be available on all servers.

## [](#running)Running the bot
To run the bot, you need to open a terminal in the root directory of the project and run the command
`npm run src/index.js`.

If you want to run the bot in development mode, you can run the command `npm run src/index.js --test`.

If you don't want to develop the bot, you can also run the bot as a
<a href="https://hub.docker.com/r/paulmueser/statsbotdocker" rel="external nofollow noopener" target="_blank">
docker container from docker hub</a>
with the command `docker run -d -e TOKEN=xxx -e BOT_ID=xxx paulmueser/statsbotdocker`.

## [](#commands)Commands

### [](#misc)Misc

- leaderboard - replies with the leaderboard of the whole server
- ping - Pong!

### [](#moderation)Moderation

- ban {target-user} {reason} - bans a member from the server
- kick {target-user} {reason} - kicks a member from the server
- timeout {target-user} {duration} {reason} - timeout a user for the specified time

### [](#quotes)Quotes

- authorstats - replies with the authorstats of "Zitate"
- quote {date} {content} {author} - create a new quote
- quoteby {author} - replies with the quotes of a specific person
- stats - replies with the stats of "Zitate"
