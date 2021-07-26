import { TdRange } from './table';
export declare const EDITOR_EVENTS: {
    [prop: string]: string;
};
export declare class EditorEventHandler {
    private events;
    constructor();
    addHandler(name: string, handler: Function): void;
    removeHandler(name: string, handler: Function): void;
    trigger(name: string, value: any): void;
}
export declare class TECellFocusEvent {
    row: TdRange;
    col: TdRange;
    constructor(row: TdRange, col: TdRange);
}
export declare class TECellBlurEvent {
    row: TdRange;
    col: TdRange;
    constructor(row: TdRange, col: TdRange);
}
declare type mouseMoveParam = {
    offsetX: number;
    offsetY: number;
};
export declare class TEMouseMoveEvent {
    offsetX: number;
    offsetY: number;
    constructor(data: mouseMoveParam);
}
export {};
//# sourceMappingURL=event.d.ts.map