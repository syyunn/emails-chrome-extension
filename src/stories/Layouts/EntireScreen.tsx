import React, { FunctionComponent } from 'react';

type EntireScreenProps = { components?: null | FunctionComponent<any>[] }

export const EntireScreen = ({ components = null }: EntireScreenProps) => {
    return (
        <div>
            {components ? components.map((Component, key: number) => (<Component key={key} />)) : null}
        </div>
    );
};