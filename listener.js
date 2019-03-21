var ip = "mqtt.altairsmartcore.com";
var port = "8884";
var usessl = true;
var id = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
var username = 'smartDevice.SmartDevice@sarvavid.sarvavid';
var password = 'smart123';
var topic = 'SmartDevice@sarvavid.sarvavid/Data';
var message, client;
var connected = false;

function connectMQTT() {
    client = new Paho.Client(ip, Number(port), id);
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({
        userName: username,
        password: password,
        useSSL: usessl,
        onSuccess: onConnect,
        onFailure: onFailure,
        reconnect: true
    });
}

function onConnect() {
    console.log("Connected to server");
    mqClient.subscribe(topic);
   }
   
function onMessageArrived(message) {
try {
    console.log("Recieved Message from server");
    var value = message.payloadString;
    console.log("value: " + value);
    } catch (e) {
        console.log("exception in onMessageArrived: " + e);
        return false;
    }
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

function onFailure(responseObject) {
        console.log("onFailure errorCode/errorMessage: " + responseObject.errorCode + "/" + responseObject.errorMessage);
}
