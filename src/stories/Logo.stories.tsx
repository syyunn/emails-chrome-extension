import React, { FunctionComponent } from 'react';

export default {
    title: 'Assets|Logo',
};

type LogoProp = {
    textColor?: string
}

export const Logo: FunctionComponent<LogoProp> = ({ textColor = "navy" }) => {

    return (
        <div className="flex items-center pl4 bb b--light-silver" style={{ height: "20vh" }}>
            <div className="">
                <h1 className="f-subheadline h-solid mt0 mb0">Mailers</h1>
            </div>
            <div className="pl4">
                <img src={process.env.PUBLIC_URL + '/favicon.png'} style={{ maxWidth: "5rem" }} />
            </div>
        </div>
    )
};

            // https://danmarshall.github.io/google-font-to-svg-path/
