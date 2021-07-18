import * as express from "express";
import * as bodyParser from "body-parser";
import api from "./routes/index";
import { ConfigServer } from "./config/server";

const app = express();
const port = ConfigServer.port;

app.use(bodyParser.json());
app.use('/api', api);

app.get('/', function (req, res) {
    res.status(200).send('ok');
});

export const server = app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});