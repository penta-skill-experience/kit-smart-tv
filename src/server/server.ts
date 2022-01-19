import {createServer, IncomingMessage, ServerResponse} from "http";

const port = 8000;

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    response.end("Hello world!");
});

server.listen(port, () => {
    console.log(`server listening on port ${port}. http://localhost:${port}`);
});
