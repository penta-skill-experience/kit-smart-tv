import "./index.css";
import * as ReactDOM from "react-dom";
import * as React from "react";
import {WidgetLoader} from "../widget/WidgetLoader";
import {ConcreteWidgetConfigSaver} from "./ConcreteWidgetConfigSaver";

ReactDOM.render(
    // this is just an example to demonstrate how widgets are instantiated
    // todo: remove this.
    <div>
        <h1>Hello Admin!</h1>
        <div>
            {new WidgetLoader().getWidget("rss-feed").createConfigComponent({url: "www.example.com"}, new ConcreteWidgetConfigSaver())}
        </div>
    </div>,
    document.getElementById("root")
);