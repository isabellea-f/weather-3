export function query(selector) {
  return document.querySelector(selector); // use to retrieve a  html name tags, id or class name
}

export function create(tag, className = " ", text = " ") {
  const newElement = document.createElement(tag);

  //class name should ideally describe what it would do or look like ex blue box, forecast container
  //   ↓ if classname has value(TRUTHY), then give that newelement that same class name

  if (className) newElement.className = className;
  if (text) newElement.textContent = text;

  return newElement;
}
