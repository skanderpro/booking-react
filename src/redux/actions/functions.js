export function checkErrors(errorsList) {
  let isError = false;
  Object.keys(errorsList).map((objectKey, index) => {
    let value = errorsList[objectKey];
    if (value.length > 0) {
      isError = true;
    }
  });
  return isError;
}

export function getMessages(errorsList) {
  let messages = [];
  Object.keys(errorsList).map((objectKey, index) => {
    let value = errorsList[objectKey];
    messages = messages.concat(value);
  });
  return messages;
}

export function makeUrl(path, invite) {
  let invite_path = ``;
  if (!!invite === true) {
    invite_path = `/invite/${invite}`;
  }
  let url = path.concat(invite_path);

  return url;
}
