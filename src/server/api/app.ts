/*
This file is the entry point of the server.
Each request that reaches the server will be handled here.
 */

import 'dotenv/config';
import {serverSetup} from "./serverSetup";

serverSetup(process.env.MONGO_URI);
