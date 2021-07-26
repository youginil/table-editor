import { TdRange, Table } from './table';
export interface Command {
    execute(): boolean;
    undo(): boolean;
}
export declare class CommandMacro implements Command {
    private readonly commands;
    constructor(commands?: Array<Command>);
    addCommand(...cmds: Array<Command>): void;
    execute(): boolean;
    undo(): boolean;
}
export declare class CmdAddRow implements Command {
    private readonly table;
    private readonly refRowIdx;
    private readonly above;
    private cmdMacro;
    constructor(table: Table, refRowIdx: number, above: boolean);
    execute(): boolean;
    undo(): boolean;
}
export declare class CmdDelRow implements Command {
    private readonly table;
    private readonly rowIdx;
    private cmdMacro;
    constructor(table: Table, rowIdx: number);
    execute(): boolean;
    undo(): boolean;
}
export declare class CmdAddColumn implements Command {
    private readonly table;
    private readonly refColIdx;
    private readonly left;
    private cmdMacro;
    constructor(table: Table, refColIdx: number, left: boolean);
    execute(): boolean;
    undo(): boolean;
}
export declare class CmdDelColumn implements Command {
    private readonly table;
    private readonly colIdx;
    private cmdMacro;
    constructor(table: Table, colIdx: number);
    execute(): boolean;
    undo(): boolean;
}
export declare class CmdMergeCells implements Command {
    private readonly table;
    private readonly rowRange;
    private readonly colRange;
    private tds;
    private cmdMacro;
    constructor(table: Table, rowRange: TdRange, colRange: TdRange);
    execute(): boolean;
    undo(): boolean;
}
export declare class CmdSplitCell implements Command {
    private readonly table;
    private readonly rowIdx;
    private readonly colIdx;
    private readonly rowCount;
    private readonly colCount;
    private cmdMacro;
    constructor(table: Table, rowIdx: number, colIdx: number, rowCount: number, colCount: number);
    execute(): boolean;
    undo(): boolean;
}
export declare class CmdSetCellContent implements Command {
    private table;
    private readonly row;
    private readonly col;
    private readonly content;
    private prevContent;
    constructor(table: Table, row: number, col: number, content: string);
    execute(): boolean;
    undo(): boolean;
}
//# sourceMappingURL=command.d.ts.map