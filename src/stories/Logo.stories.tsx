import React, { FunctionComponent } from 'react';

export default {
    title: 'Assets|Logo',
};

export const Logo: FunctionComponent = () => {

    return (
        <div className="flex items-center pl4 bb b--light-silver pb3 pt2" style={{ height: "100px", boxShadow: "0px 5px 5px silver" }}>
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
