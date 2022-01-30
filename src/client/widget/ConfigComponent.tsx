import * as React from "react";

export interface ConfigComponentProps {
    config: Object;
}

export abstract class ConfigComponent<S> extends React.Component<ConfigComponentProps, any> {

    protected constructor(props: Readonly<ConfigComponentProps> | ConfigComponentProps) {
        super(props);
    }

    abstract save(): Object;
}
