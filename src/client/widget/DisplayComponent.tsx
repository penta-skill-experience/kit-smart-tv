import * as React from "react";

export interface DisplayComponentProps {
    config?: Object;
}

export abstract class DisplayComponent<S> extends React.Component<DisplayComponentProps, any> {

    protected constructor(props: Readonly<DisplayComponentProps> | DisplayComponentProps) {
        super(props);
    }
}
