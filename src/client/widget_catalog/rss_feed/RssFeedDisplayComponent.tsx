import * as React from "react";

interface RssFeedDisplayProps {
    url: string;
}

export class RssFeedDisplayComponent extends React.Component<RssFeedDisplayProps, any> {

    render() {
        return <div>
            <p>(RSS feed content)</p>
        </div>;
    }
}