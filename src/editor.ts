const pkg = require('../package.json');
import {TableData, TableCells, Table, TdRange} from "./table";
import {
    Command,
    CmdAddRow,
    CmdDelRow,
    CmdAddColumn,
    CmdDelColumn,
    CmdMergeCells,
    CmdSplitCell,
    CmdSetCellContent
} from "./command";
import "../style/editor.scss";
import {log} from "./log";
import {EDITOR_EVENTS, EditorEventHandler} from "./event";

type EditorOptions = {
    elem: HTMLElement
    data: TableData | TableCells
    defaultColWidth?: number
    fullWidth?: boolean
    editable?: boolean
    resizeable?: boolean
    cellFocusedBackground?: string
    borderColor?: string
    debug?: boolean
}

const NOT_EDITABLE_MSG = 'Table can not be edit';

export class TableEditor {
    static version = pkg.version;
    private elem: HTMLElement;
    private readonly table: Table;
    private cmdHistory: CommandHistory;
    private editable: boolean;
    private readonly debug: boolean;
    private eventHandler: EditorEventHandler;

    constructor(options: EditorOptions) {
        this.elem = options.elem;
        this.elem.innerHTML = '';
        const className = `table-editor-hahaha`;
        this.editable = 'editable' in options ? !!options.editable : true;
        this.eventHandler = new EditorEventHandler();
        this.debug = 'debug' in options ? !!options.debug : false;
        this.table = new Table({
            className: className,
            data: options.data,
            defaultColWidth: options.defaultColWidth || 0,
            fullWidth: !!options.fullWidth,
            editable: this.editable,
            resizeable: 'resizeable' in options ? !!options['resizeable'] : false,
            cellFocusedBg: options.cellFocusedBackground || '',
            borderColor: options.borderColor || '',
            debug: this.debug,
            onCellFocus: (v) => {
                this.eventHandler.trigger(EDITOR_EVENTS.CELL_FOCUS, v)
            },
            onCellBlur: (v) => {
                this.eventHandler.trigger(EDITOR_EVENTS.CELL_BLUR, v);
            },
            onMouseMove: (v) => {
                this.eventHandler.trigger(EDITOR_EVENTS.MOUSE_MOVE, v);
            }
        });
        this.elem.appendChild(this.table.elem);
        this.cmdHistory = new CommandHistory(10);
    }

    addRow(rowIdx: number, above: boolean): boolean {
        if (!this.editable) {
            log.warn(NOT_EDITABLE_MSG);
            return false;
        }
        if (this.debug) {
            log.info(`Add one row ${above ? 'above' : 'below'} row: ${rowIdx}`);
        }
        const cmd = new CmdAddRow(this.table, rowIdx, above);
        const success = cmd.execute();
        if (success) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
        return success;
    }

    delRow(rowIdx: number): boolean {
        if (!this.editable) {
            log.warn(NOT_EDITABLE_MSG);
            return false;
        }
        if (this.debug) {
            log.info(`Delete row ${rowIdx}`);
        }
        const cmd = new CmdDelRow(this.table, rowIdx);
        const success = cmd.execute();
        if (success) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
        return success;
    }

    addColumn(colIdx: number, left: boolean): boolean {
        if (!this.editable) {
            log.warn(NOT_EDITABLE_MSG);
            return false;
        }
        if (this.debug) {
            log.info(`Add one column ${left ? 'left' : 'right'} of column ${colIdx}`);
        }
        const cmd = new CmdAddColumn(this.table, colIdx, left);
        const success = cmd.execute();
        if (success) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
        return success;
    }

    delColumn(colIdx: number): boolean {
        if (!this.editable) {
            log.warn(NOT_EDITABLE_MSG);
            return false;
        }
        if (this.debug) {
            log.info(`Delete column ${colIdx}`);
        }
        const cmd = new CmdDelColumn(this.table, colIdx);
        const success = cmd.execute();
        if (success) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
        return success;
    }

    mergeCells(rowRange: TdRange, colRange: TdRange): boolean {
        if (!this.editable) {
            log.warn(NOT_EDITABLE_MSG);
            return false;
        }
        if (this.debug) {
            log.info(`Merge cells. Row: ${rowRange[0]} ~ ${rowRange[1]}, Column: ${colRange[0]} ~ ${colRange[1]}`);
        }
        const cmd = new CmdMergeCells(this.table, rowRange, colRange);
        const success = cmd.execute();
        if (success) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
        return success;
    }

    splitCell(rowIdx: number, colIdx: number, rowCount: number, colCount: number): boolean {
        if (!this.editable) {
            log.warn(NOT_EDITABLE_MSG);
            return false;
        }
        if (this.debug) {
            log.info(`Split cell (${rowIdx}, ${colIdx}) into ${rowCount} rows and ${colCount} columns`);
        }
        const cmd = new CmdSplitCell(this.table, rowIdx, colIdx, rowCount, colCount);
        const success = cmd.execute();
        if (success) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
        return success;
    }

    getCellContent(rowIdx: number, colIdx: number): string {
        return this.table.getCellContent(rowIdx, colIdx) || '';
    }

    setCellContent(rowIdx: number, colIdx: number, content: string): boolean {
        if (!this.editable) {
            log.warn(NOT_EDITABLE_MSG);
            return false;
        }
        if (this.debug) {
            log.info(`Set cell (${rowIdx}, ${colIdx}) "${content}"`);
        }
        const cmd = new CmdSetCellContent(this.table, rowIdx, colIdx, content);
        const success = cmd.execute();
        if (success) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
        return success;
    }

    undo(): boolean {
        if (!this.editable) {
            log.warn(NOT_EDITABLE_MSG);
            return false;
        }
        if (this.debug) {
            log.info('Undo');
        }
        const success = this.cmdHistory.undo();
        if (this.debug) {
            this.printDebugInfo();
        }
        return success;
    }

    redo() {
        if (!this.editable) {
            log.warn(NOT_EDITABLE_MSG);
            return;
        }
        if (this.debug) {
            log.info('Redo');
        }
        this.cmdHistory.redo();
        if (this.debug) {
            this.printDebugInfo();
        }
    }

    getTableData(): { rows: Array<Array<object>>, colWidth: Array<number> } {
        return this.table.getTableData();
    }

    setEditable(editable: boolean) {
        this.editable = editable;
        this.table.setEditable(this.editable);
    }

    addEventListener(name: string, handler: Function) {
        this.eventHandler.addHandler(name, handler);
    }

    removeEventListener(name: string, handler: Function) {
        this.eventHandler.removeHandler(name, handler);
    }

    private printDebugInfo() {
        const errorMsg = this.table.validate();
        if (errorMsg) {
            log.error(`💩 ${errorMsg}`);
        }
        this.cmdHistory.printStatus();
    }

    destroy() {
        this.table.destroy();
    }
}

class CommandHistory {
    private readonly commands: Array<Command | null>;
    private readonly cap: number;
    private divide: number = 0;
    private top: number = 0;

    constructor(max: number) {
        this.cap = max;
        this.commands = [];
    }

    push(cmd: Command) {
        if (this.divide < this.top) {
            for (let i = this.divide; i <= this.top - 1; i++) {
                this.commands[i] = null;
            }
            this.top = this.divide;
        }
        if (this.top === this.cap) {
            this.commands.shift();
            this.commands.push(cmd);
        } else {
            this.commands[this.top] = cmd;
            this.divide = ++this.top;
        }
    }

    undo(): boolean {
        if (this.divide === 0) {
            return false;
        }
        const success = (this.commands[this.divide - 1] as Command).undo();
        if (success) {
            this.divide--;
        }
        return success;
    }

    redo() {
        if (this.divide === this.top) {
            return false;
        }
        const success = (this.commands[this.divide + 1] as Command).execute();
        if (success) {
            this.divide++;
        }
        return success;
    }

    printStatus() {
        log.info(`👽 Command History: Capability: ${this.cap}  Undo: ${this.divide}  Redo: ${this.top - this.divide}`, this.commands);
    }
}
