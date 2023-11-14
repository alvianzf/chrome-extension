document.getElementById('button').addEventListener('click', () => {
  chrome.runtime.sendMessage({message: 'button-clicked'});
});