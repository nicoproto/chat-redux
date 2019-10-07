// TODO: add and export your own actions
export const GET_MESSAGES = 'GET_MESSAGES';
export const MESSAGE_POSTED = 'MESSAGE_POSTED';
export const CHANNEL_SELECTED = 'CHANNEL_SELECTED';

const BASE_URL = 'https://wagon-chat.herokuapp.com';

export function getMessages(channel) {
  const url = `${BASE_URL}/${channel}/messages`;

  return fetch(url)
    .then(response => response.json())
    .then((data) => {
      return {
        type: GET_MESSAGES,
        payload: data
      };
    });
}

export function createMessage(channel, author, content) {
  const url = `${BASE_URL}/${channel}/messages`;

  const body = { author, content };

  const promise = fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => r.json());

  return {
    type: MESSAGE_POSTED,
    payload: promise
  };
}

export function selectChannel(channel) {
  return {
    type: CHANNEL_SELECTED,
    payload: channel
  };
}
