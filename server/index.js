import {resolve} from 'path';
require('dotenv').config({ path: resolve(__dirname, '../.env')});

import { initApp } from './initApp';

initApp();
