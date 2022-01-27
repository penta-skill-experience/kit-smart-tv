import * as React from "react";
import {DisplayComponent} from "../../widget/DisplayComponent";

export class RssFeedDisplayComponent extends DisplayComponent<any> {

    render() {

        const url = this.props.config["url"];

        return <iframe width="100%" height="100%"
                       style={{border: "0px"}}
                       src={`http://rss-world.de/service/show_rss.php?anz=-1&u=${url}&style=http://www.rss-world.de/service/show_rss_style.css&aufbau[tl]=undefined&aufbau[sl]=1`}/>
    }
}