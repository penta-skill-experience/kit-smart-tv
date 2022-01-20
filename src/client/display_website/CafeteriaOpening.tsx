import * as React from "react";
import axios from "axios";

export class CafeteriaOpening extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            data: ""
        };
    }

    componentDidMount() {
        this.getCafeteriaOpening();
        setInterval(() => this.getCafeteriaOpening(), 1000000);
    }

    async getCafeteriaOpening() {

        await axios.get('')
            .then(resp => {
                console.log(resp.data);
                this.setState({
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return <div className="grid grid-col-3 grid-flow-col gap-3 box-border">
        </div>;
    }
}