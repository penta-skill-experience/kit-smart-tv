import "./index.css";
import * as ReactDOM from "react-dom";
import * as React from "react";
import {WidgetLoader} from "../widget/WidgetLoader";
import {ConcreteWidgetConfigSaver} from "./ConcreteWidgetConfigSaver";
import {LogInPage} from "./ConfigWebsite"

ReactDOM.render(

    <LogInPage/>,
    document.getElementById("root")
);