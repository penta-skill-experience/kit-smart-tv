import * as React from "react";
import Parser from "rss-parser";
import {DisplayComponent, DisplayComponentProps} from "../../widget/DisplayComponent";
import config from "../../../shared/persistence/persistence.config.json";
import * as RSSFeedWidgetConfig from "./RSSFeedWidget.json";

interface RssFeedDisplayState {
    loaded: boolean;
    loadedRss: boolean;
    rssFeed: any;
    rssFeedFallback: string;
}

export class RssFeedDisplayComponent extends DisplayComponent<RssFeedDisplayState> {

    private intervalHandle;

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            loadedRss: false,
            rssFeed: undefined,
            rssFeedFallback: undefined,
        };
    }

    componentDidMount() {
        this.fetchRssFeed();

        this.intervalHandle = setInterval(() => this.fetchRssFeed(), RSSFeedWidgetConfig.REFRESH_RATE)
    }

    componentWillUnmount() {
        clearInterval(this.intervalHandle);
    }

    componentDidUpdate(prevProps: Readonly<DisplayComponentProps>, prevState: Readonly<any>, snapshot?: any) {
        if (this.props.config["url"] !== prevProps.config["url"]) {
            this.fetchRssFeed();
        }
    }

    private fetchRssFeed(): void {
        RssFeedDisplayComponent.fetchRssFeedXmlString(this.props.config["url"])
            .then(xmlString => {
                const parser = new Parser();
                return parser.parseString(xmlString)
            })
            .then(feed => {
                this.setState({
                    loaded: true,
                    loadedRss: true,
                    rssFeed: feed,
                    rssFeedFallback: undefined
                });
            })
            .catch(reason => this.props.error(`Failed to parse RSS feed. Reason: ${reason}`));
    }

    private static fetchRssFeedXmlString(url: string): Promise<string> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
                url: url
            })
        };
        return fetch(`${config.DOMAIN}/kvv`, requestOptions)
            .then(resp => resp.text());
    }

    render() {
        if (this.state.loaded) {
            if (this.state.loadedRss) {
                return <div className={"font-light leading-normal sm:text-xs lg:text-base xl:text-base 2xl:text-xl 4xl:text-2xl sm:text-left 8xl:text-4xl"}>
                    <h1>RSS Feed</h1>
                    {this.state.rssFeed.items.map((item, i) =>
                        <div key={i}>
                            <h1>{item.title}</h1>
                            <div dangerouslySetInnerHTML={{__html: item.content}}/>
                            <br/>
                        </div>)}
                </div>;
            } else {
                return <div className={"font-light leading-normal sm:text-xs lg:text-base xl:text-base 2xl:text-xl 4xl:text-2xl sm:text-left 8xl:text-4xl"} dangerouslySetInnerHTML={{__html: this.state.rssFeedFallback}}/>;
            }
        } else {
            return <div className={"font-light leading-normal sm:text-xs lg:text-base xl:text-base 2xl:text-xl 4xl:text-2xl 8xl:text-4xl"}>loading...</div>;
        }
    }
}