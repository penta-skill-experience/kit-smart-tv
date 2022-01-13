import * as React from "react";

export class SquareHolder extends React.Component<any, any> {

    render() {
        return <div className="bg-white rounded-lg overflow-hidden mb-10">
            <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                <h3>
                    <p
                        className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                    >
                        widget componenent
                    </p>
                </h3>
            </div>
        </div>
    }
}