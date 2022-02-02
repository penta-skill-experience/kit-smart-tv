import * as React from "react";

export interface DisplayComponentProps {
    /**
     * This is a callback that should be used by the DisplayComponent of a widget
     * when an error happens inside a promise.
     * I.e. don't throw errors from inside promises, use this callback instead to pass the error message.
     * This will set the widget in an error state and display the error message on the Smart TV.
     *
     * However, errors that are thrown synchronously in the render() method or
     * in the constructor of a DisplayComponent are automatically caught
     * by the component surrounding the widgets and don't need to be thrown
     * via this callback.
     * @param msg
     */
    error: (msg: string) => void;
    config?: Object;
    specialBoldFontColor: string;
    specialSubtleFontColor: string;
}

export abstract class DisplayComponent<S> extends React.Component<DisplayComponentProps, any> {

    protected constructor(props: Readonly<DisplayComponentProps> | DisplayComponentProps) {
        super(props);
    }
}
