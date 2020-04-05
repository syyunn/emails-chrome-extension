import React, { FunctionComponent } from 'react';
import { EntireScreen } from './EntireScreen'

import { Logo } from '../Logo.stories'
import { Lists } from '../Lists.stories'

export default {
    title: 'Layouts',
};

type LogoProp = {
    textColor?: string
}

export const Entire = () => EntireScreen({ components: [Logo, Lists] });
