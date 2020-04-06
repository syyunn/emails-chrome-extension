import React, { FunctionComponent, useEffect, useState } from 'react';

export default {
    title: 'Components|Lists',
};

export const Lists: FunctionComponent = () => {
    console.log("List component")

    // const initialState = () =>
    //     sessionStorage.getItem("emails")

    const [emails, setEmails] = useState(JSON.stringify(["example@dpgm.io"]));

    // useEffect(() => {
    //     console.log("emails in useEffect", emails, typeof emails)
    //     if (emails == null) {
    //         console.log("emails are null")
    //         setEmails(sessionStorage.getItem("emails"))
    //     }
    // }, [emails]);

    useEffect(() => {
        console.log("emails in useEffect runs", emails)
        chrome.storage.local.get(['emails'], function (result) {
            console.log('Value currently is ' + result.emails);
            setEmails(result.emails)
        });
    }, []);

    console.log("document.body.scrollHeight", document.body.scrollHeight)
    return (
        <div className="pa4">
            <div className="overflow-auto">
                <table className="f6 w-100 mw8 center">
                    <thead>
                        <tr>
                            <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Email</th>
                        </tr>
                    </thead>
                    <tbody className="lh-copy">
                        {emails != null ? JSON.parse(emails).map((email: string) =>
                            <tr>
                                <td className="pv3 pr3 bb b--black-20">{email}
                                </td>
                            </tr>) : null}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

