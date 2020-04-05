import React, { FunctionComponent, useEffect, useState } from 'react';

export default {
    title: 'Components|Lists',
};

export const Lists: FunctionComponent = () => {

    const initialState = () =>
        sessionStorage.getItem("emails") || null

    const [emails, setEmails] = useState(initialState);

    useEffect(() => {
        console.log("emails in useEffect", emails, typeof emails)
        if (emails == null) {
            console.log("emails are null")
            setEmails(sessionStorage.getItem("emails"))
        }
    }, [emails]);

    return (
        <div className="">
            <ul className="list pl0 measure center overflow-y-auto">
                {emails != null ? JSON.parse(emails).map((email: string) => <li className="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">{email}</li>) : null}
            </ul>
        </div>
    )
};

// https://danmarshall.github.io/google-font-to-svg-path/
