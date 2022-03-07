import "./index.css";
import * as ReactDOM from "react-dom";
import * as React from "react";
import {ConfigWebsite} from "./ConfigWebsite";

ReactDOM.render(

    <ConfigWebsite initialLogInStatus={false}/>,
    document.getElementById("root")
);