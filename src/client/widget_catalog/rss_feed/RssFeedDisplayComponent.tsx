import * as React from "react";

interface RssFeedDisplayProps {
    url: string;
}

export class RssFeedDisplayComponent extends React.Component<RssFeedDisplayProps, any> {

    render() {
        return <iframe width="100%" height="100%"
                       style={{border: "0px"}}
                       src={`http://rss-world.de/service/show_rss.php?anz=-1&u=${this.props.url}&style=http://www.rss-world.de/service/show_rss_style.css&aufbau[tl]=undefined&aufbau[sl]=1`}/>
    }
}