// background.js

chrome.runtime.onInstalled.addListener(function () {
    console.log('Extension installed');
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('Received message:', request.message);
    }
);

// Listen for SSE from the server
const eventSource = new EventSource('http://localhost:3001/events');

eventSource.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log(data)

    // Send notification
    data.category.map(cat => sendNotification(data.message, cat))
};

function sendNotification(message, category) {
    var notificationOptions = {
        type: "basic",
        title: category,
        message: message
    };

    chrome.notifications.create(notificationOptions);
}
