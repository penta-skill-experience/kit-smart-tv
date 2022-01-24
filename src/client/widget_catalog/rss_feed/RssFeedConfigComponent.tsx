import * as React from "react";

interface RssFeedConfigProps {
    url: string;
    save(): void;
}

export class RssFeedConfigComponent extends React.Component<RssFeedConfigProps, any> {

    render() {
        return <div>
            Demo: <button onClick={() => this.props.save()}>Save config</button>
        </div>;
    }
}