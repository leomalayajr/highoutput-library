declare module 'highoutput-utilities' {
  export class Logger {
    constructor(tags: string[]);
    tag(tag: string): Logger;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    verbose(...args: any[]): void;
    silly(...args: any[]): void;
  }
}
