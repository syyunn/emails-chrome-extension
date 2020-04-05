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

    // return (
    //     <div classNameName="">
    //         <ul classNameName="list pl0 measure center overflow-y-auto">
    //             {emails != null ? JSON.parse(emails).map((email: string) => <li classNameName="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">{email}</li>) : null}
    //         </ul>
    //     </div>
    // )
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

// https://danmarshall.github.io/google-font-to-svg-path/
