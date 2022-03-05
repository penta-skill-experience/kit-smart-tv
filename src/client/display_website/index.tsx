import "./index.css";
import * as ReactDOM from "react-dom";
import * as React from "react";
import {RootComponent} from "./RootComponent";

var express = require("express");
var fs = require("fs");
var https = require("https");
var app = express();

app.get("/", function (req, res) {
    res.send("hello world");
});

https
    .createServer(
        {
            key: fs.readFileSync("server.key"),
            cert: fs.readFileSync("server.cert"),
        },
        app
    )
    .listen(1337, function () {
        console.log(
            "Example app listening on port 3000! Go to https://localhost:1337"
        );
    });


ReactDOM.render(
    <RootComponent/>,
    document.getElementById("root")
);