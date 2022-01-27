import * as React from "react";
import Parser from "rss-parser";

interface RssFeedDisplayProps {
    url: string;
}

interface RssFeedDisplayState {
    rssFeed: any;
}

export class RssFeedDisplayComponent extends React.Component<RssFeedDisplayProps, RssFeedDisplayState> {

    constructor(props) {
        super(props);
        this.state = {
            rssFeed: undefined
        };
    }

    async componentDidMount() {
        const parser = new Parser();
        const feed = await parser.parseURL('https://www.reddit.com/.rss');
        this.setState({
            rssFeed: feed
        } );
    }

    render() {
        return (
            <div>
                <h1>RSS Feed</h1>
                {this.state.rssFeed.map((item, i) => {
                    return <div key={i}>
                            <h1>item.title</h1>
                            <a href="">item.link</a>
                        </div>
                })}
            </div>
        );
    }
}