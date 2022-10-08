import { EventHubConsumerClient } from "@azure/event-hubs";

const connectionString = `${process.env.CONNEXION_KEY}`;

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
        res.status(405).json({'message': 'sorry just get requests accepted'})
    }
}

