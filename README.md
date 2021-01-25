# Ex's from Texas

Ex's from Texas is a web app allowing user to play an online game of Tehax Hold'em in real time through web browser.
[See site live here](https://exsfromtexas.netlify.app/)

## Functionality

### `Create online room`

Application allows to create online rooms by clicking **Create room** button on the main page. This room is used to communicate with other users.
It sends a fetch message to backend waiting for result that contains roomcode. After receiving roomcode it automaticly joins the lobby.
Upon succesfull joining process, application subscribes to channel given by backend and listens for further instructions.

### `Join online room`

User is allowed to enter lobbies via main page by clicking **Join room** button and entering correct roomcode or entering URL directly into browser's address bar.
If the roomcode is incorrect application will automatically redirect to the main page. Otherwise user will join the lobby.

**Note: roomcode must be exactly 4 uppercase letters long.**

### `Select nickname and avatar`

Immidiately after joining the room, user will have to choose his nickname and avatar in order to proceed.
Nickname must be 3-12 characters long and can't contain special symbols.
There are 17 avatars to choose from.

### `User panel`

This panel allows user to interact with others. Stakes panel calculates the raise action input, while actions allow to send requests to the backend.

- copy link _top right corner_
- stakes

  - 1/2 Pot
  - 3/4 pot
  - pot
  - all-in

- actions
  - fold
  - call
  - raise

## Technology stack

- React
- Redux
- Stockjs
- Stompjs
