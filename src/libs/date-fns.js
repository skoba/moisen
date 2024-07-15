//import setDefaultOptions from 'date-fns/setDefaultOptions';
import { formatISO, setDefaultOptions } from 'date-fns';
import { minTime } from 'date-fns/constants';
import { ja } from 'date-fns/locale';
// import {buildFormatLongFn} from 'date-fns/locale/_lib/buildFormatLongFn';
//import { FormatLong } from 'date-fns/locale'
// const buildFormatLongFn = require('date-fns/locale/_lib/buildFormatLongFn');

const {
    formatLong: { date, dateTime } = {},
} = ja;

const dateFormats = {
    full: 'y年M月d日EEEE',
    long: 'y年MM月dd日',
    medium: 'y/MM/dd',
    short: 'y/MM/dd',
};

const timeFormats = {
    full: 'HH時mm分ss秒 zzzz',
    long: 'HH:mm:ss z',
    medium: 'HH:mm:ss',
    short: 'HH:mm',
};

//const { formatLong } = ja;
// setDefaultOptions({
//     locale: {
//         ...ja,
//         formatLong: {
//             date: buildFormatLongFn({
//                 formats: dateFormats,
//                 defaultWidth: 'full',
//             }),
//             time: buildFormatLongFn({
//                 formats: timeFormats,
//                 defaultWidth: 'full',
//             }),
//             dateTime,
//         }
//     }
// });

//export { default } from 'date-fns';
export * from 'date-fns';

const minTimeISO = formatISO(new Date(minTime));

const DAY_TYPES = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
// } as const satisfies Record<string, number>;
};

export {
    minTimeISO,
    DAY_TYPES,
};
