const PREFIX = '👻';

export const log = {
    info: (...messages: any) => {
        (console.info || console.log)(PREFIX, ...messages);
    },
    warn: (...messages: any) => {
        (console.warn || console.log)(PREFIX, ...messages);
    },
    error: (...messages: any) => {
        (console.error || console.log)(PREFIX, ...messages);
    }
};

export default log;
