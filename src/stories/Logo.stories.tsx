import React, { FunctionComponent } from 'react';

export default {
    title: 'Assets|Logo',
};

type LogoProp = {
    textColor?: string
}

export const Logo: FunctionComponent<LogoProp> = ({ textColor = "navy" }) => {

    return (
        <div className="flex items-center pl4 bb b--light-silver pb2 pt2" style={{ height: "16.5vh" }}>
            <div className="flex items-center">
                <h1 className="f-subheadline mt0 mb0 w50 near-black">dpgm</h1>
                <h1 className="f-subheadline fw2 mt0 mb0 w50 ml3 mid-gray">mails</h1>
            </div>
            <div className="" style={{ paddingLeft: "20px" }}>
                <img src={process.env.PUBLIC_URL + '/favicon.png'} style={{ maxWidth: "5rem" }} />
            </div>
        </div >
    )
};

            // https://danmarshall.github.io/google-font-to-svg-path/
