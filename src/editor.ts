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

type EditorOptions = {
    elem: HTMLElement
    data: TableData | TableCells
    colWidth?: number | Array<number>
    debug?: boolean
}

export class TableEditor {
    static version = '0.0.1';
    private elem: HTMLElement;
    private readonly table: Table;
    private cmdHistory: CommandHistory;
    private readonly debug: boolean;

    constructor(options: EditorOptions) {
        this.elem = options.elem;
        this.elem.innerHTML = '';
        const className = `table-editor-${TableEditor.version.replace(/\./g, '-')}`;
        this.table = new Table(className, options.data, options['colWidth'] || [], this.debug);
        this.elem.appendChild(this.table.elem);
        this.cmdHistory = new CommandHistory(10);
        this.debug = 'debug' in options ? !!options.debug : false;
    }

    addRow(rowIdx: number, above: boolean) {
        if (this.debug) {
            log.info(`Add one row ${above ? 'above' : 'below'} row: ${rowIdx + 1}`);
        }
        const cmd = new CmdAddRow(this.table, rowIdx, above);
        if (cmd.execute()) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
    }

    delRow(rowIdx: number) {
        if (this.debug) {
            log.info(`Delete row ${rowIdx + 1}`);
        }
        const cmd = new CmdDelRow(this.table, rowIdx);
        if (cmd.execute()) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
    }

    addColumn(colIdx: number, left: boolean) {
        if (this.debug) {
            log.info(`Add one column ${left ? 'left' : 'right'} of column ${colIdx + 1}`);
        }
        const cmd = new CmdAddColumn(this.table, colIdx, left);
        if (cmd.execute()) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
    }

    delColumn(colIdx: number) {
        if (this.debug) {
            log.info(`Delete column ${colIdx + 1}`);
        }
        const cmd = new CmdDelColumn(this.table, colIdx);
        if (cmd.execute()) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
    }

    mergeCells(rowRange: TdRange, colRange: TdRange) {
        if (this.debug) {
            log.info(`Merge cells. Row: ${rowRange[0] + 1} ~ ${rowRange[1] + 1}, Column: ${colRange[0] + 1} ~ ${colRange[1] + 1}`);
        }
        const cmd = new CmdMergeCells(this.table, rowRange, colRange);
        if (cmd.execute()) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
    }

    splitCell(rowIdx: number, colIdx: number, rowCount: number, colCount: number) {
        if (this.debug) {
            log.info(`Split cell (${rowIdx + 1}, ${colIdx + 1}) into ${rowCount} rows and ${colCount} columns`);
        }
        const cmd = new CmdSplitCell(this.table, rowIdx, colIdx, rowCount, colCount);
        if (cmd.execute()) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
    }

    getCellContent(rowIdx: number, colIdx: number) {
        return this.table.getCellContent(rowIdx, colIdx);
    }

    setCellContent(rowIdx: number, colIdx: number, content: string) {
        if (this.debug) {
            log.info(`Set cell (${rowIdx + 1}, ${colIdx + 1}) "${content}"`);
        }
        const cmd = new CmdSetCellContent(this.table, rowIdx, colIdx, content);
        if (cmd.execute()) {
            this.cmdHistory.push(cmd);
        }
        if (this.debug) {
            this.printDebugInfo();
        }
    }

    undo() {
        if (this.debug) {
            log.info('Undo');
        }
        this.cmdHistory.undo();
        if (this.debug) {
            this.printDebugInfo();
        }
    }

    redo() {
        if (this.debug) {
            log.info('Redo');
        }
        this.cmdHistory.redo();
        if (this.debug) {
            this.printDebugInfo();
        }
    }

    getTableData(): {rows: Array<Array<object>>, colWidth: Array<number>} {
        return this.table.getTableData();
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
    private readonly commands: Array<Command>;
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

    undo() {
        if (this.divide > 0 && !this.commands[--this.divide].undo()) {
            this.clear();
        }
    }

    redo() {
        if (this.divide < this.top && !this.commands[this.divide++].execute()) {
            this.clear();
        }
    }

    clear() {
        this.commands.length = 0;
        this.divide = this.top = 0;
    }

    printStatus() {
        log.info(`👽 Command History: Capability: ${this.cap}  Undo: ${this.divide}  Redo: ${this.top - this.divide}`, this.commands);
    }
}
