# Basic discord bot using discord js

## [](#before-starting)Before starting
### [](#setup)Setup
After you have cloned the repo make sure to create a `.env` file with the `TOKEN` specified for example

```
TOKEN=xxx
```

### [](#developing-and-testing)Developing & testing
For testing, you can change the `testServer` and `devs` properties in `config.json` for example

```
testServer=xxx
devs=[xxx,yyy,zzz]
```

## [](#commands)Commands
### [](#misc)Misc
- ping - Pong!

### [](#moderation)Moderation
- ban {target-user} {reason} - bans a member from the server
- kick {target-user} {reason} - kicks a member from the server
- timeout {target-user} {duration} {reason} - timeout a user for the specified time

### [](#quotes)Quotes
- authorstats - replies with the authorstats of "Zitate"
- quoteby {author} - replies with the quotes of a specific person
- stats - replies with the stats of "Zitate"
