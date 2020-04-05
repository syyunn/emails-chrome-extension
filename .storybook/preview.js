import { addParameters } from '@storybook/react';

const customViewports = {
    chromeExtensionMax: {
        name: 'chromeExtensionMax',
        styles: {
            width: '800px',
            height: '600px',
        },
    },
};

addParameters({
    viewport: {
        viewports: customViewports,
    },
});
