import { EventHubConsumerClient } from "@azure/event-hubs";

const connectionString = `Endpoint=sb://ihsuprodparres018dednamespace.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=TE9vDi48eu2lT+2+/y8mpLkKf8XVkwxV1e1YI2UbBqA=;EntityPath=iothub-ehub-octehub-16211286-7ed0e55670`;

export default function getMessage(req, res) {
    if (req.method === 'GET') {

        var printError = function (err) {
            console.log(err.message);
        };
        
        var printMessages = function (messages) {
            for (const message of messages) {
                console.log("Telemetry received: ");
                console.log(JSON.stringify(message.body));
                res.status(200).json({"message": message.body.Message})
            }
        };
        
        async function main() {
            console.log("IoT Hub Quickstarts - Read device to cloud messages.");
        
            const clientOptions = {
                // webSocketOptions: {
                //     webSocket: WebSocket,
                //     webSocketConstructorOptions: {}
                // }
            };
        
            const consumerClient = new EventHubConsumerClient("$Default", connectionString, clientOptions);
        
                consumerClient.subscribe({
                    processEvents: printMessages,
                    processError: printError,
                });
        }
        
        main().catch((error) => {
            console.error("Error running sample:", error);
        });

    } else {
        res.status(500).json({'message': 'sorry just get requests accepted'})
    }
}

