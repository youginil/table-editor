import {TdRange, Table, Tr, Td} from './table'
import log from "./log";

export interface Command {
    execute(): boolean

    undo(): boolean
}

class CmdDebugger implements Command {
    constructor() {
    }

    execute(): boolean {
        debugger;
        return true;
    }

    undo(): boolean {
        return true;
    }
}

export class CommandMacro implements Command {
    private readonly commands: Array<Command>;

    constructor(commands?: Array<Command>) {
        this.commands = commands || [];
    }

    addCommand(...cmds: Array<Command>): void {
        this.commands.push(...cmds);
    }

    execute(): boolean {
        for (let i = 0; i < this.commands.length; i++) {
            if (!this.commands[i].execute()) {
                log.error(`CommandMacro fail on ${i}th command.`, this.commands);
                while (--i >= 0) {
                    this.commands[i].undo();
                }
                return false;
            }
        }
        return true;
    }

    undo(): boolean {
        let i = this.commands.length;
        while (--i >= 0) {
            if (!this.commands[i].undo()) {
                const c = this.commands.length - 1;
                while (++i <= c) {
                    this.commands[i].execute();
                }
                return false;
            }
        }
        return true;
    }
}

const noopCmdMacro = new CommandMacro();

class CmdAddCell implements Command {
    private table: Table;
    private readonly td: Td;

    constructor(table: Table, td: Td) {
        this.table = table;
        this.td = td;
    }

    execute(): boolean {
        const rowRange = this.td.getRowRange();
        const tr = this.table.getRowByIndex(rowRange[0]);
        if (!tr) {
            log.error('CmdAddCell', `Invalid rowRange: ${rowRange}, colRange: ${this.td.getColRange()}`);
            return false;
        }
        return tr.addTd(this.td) > 0;
    }

    undo(): boolean {
        return this.table.removeCell(this.td.getRowRange()[0], this.td.getColRange()[0]) > 0;
    }
}

class CmdDelCell implements Command {
    private table: Table;
    private readonly rowIdx: number;
    private readonly colIdx: number;
    private td: Td | null = null;

    constructor(table: Table, rowIdx: number, colIdx: number) {
        this.table = table;
        this.rowIdx = rowIdx;
        this.colIdx = colIdx;
    }

    execute(): boolean {
        this.td = this.table.getCell(this.rowIdx, this.colIdx);
        if (!this.td) {
            log.error('CmdDelCell', `Cell not found. rowIdx: ${this.rowIdx}, colIdx: ${this.colIdx}`);
            return false;
        }
        return this.table.removeCell(this.rowIdx, this.colIdx) > 0;
    }

    undo(): boolean {
        const tr = this.table.getRowByIndex(this.rowIdx);
        if (!tr) {
            log.error('CmdDelCell', `Row not found. rowIdx: ${this.rowIdx}`);
            return false;
        }
        return tr.addTd(this.td as Td) > 0;
    }
}

class CmdAddColHeader implements Command {
    private readonly table: Table;
    private readonly colIdx: number;

    constructor(table: Table, colIdx: number) {
        this.table = table;
        this.colIdx = colIdx;
    }

    execute(): boolean {
        return this.table.addColHeader(this.colIdx) > 0;
    }

    undo(): boolean {
        return this.table.delColHeader(this.colIdx) > 0;
    }
}

class CmdDelColHeader implements Command {
    private readonly table: Table;
    private readonly colIdx: number;

    constructor(table: Table, colIdx: number) {
        this.table = table;
        this.colIdx = colIdx;
    }

    execute(): boolean {
        return this.table.delColHeader(this.colIdx) > 0;
    }

    undo(): boolean {
        return this.table.addColHeader(this.colIdx) > 0;
    }
}

class CmdSetCellRowRange implements Command {
    private table: Table;
    private readonly rowIdx: number;
    private readonly colIdx: number;
    private oldRange: TdRange | null = null;
    private readonly newRange: TdRange;

    constructor(table: Table, rowIdx: number, colIdx: number, newRange: TdRange) {
        this.table = table;
        this.rowIdx = rowIdx;
        this.colIdx = colIdx;
        this.newRange = newRange;
    }

    execute(): boolean {
        const td = this.table.getCell(this.rowIdx, this.colIdx);
        if (!td) {
            log.error('CmdSetCellRowRange', `Invalid position. rowIdx: ${this.rowIdx}, colIdx: ${this.colIdx}`);
            return false;
        }
        this.oldRange = td.getRowRange();
        td.setRowRange(this.newRange);
        return true;
    }

    undo(): boolean {
        const td = this.table.getCell(this.rowIdx, this.colIdx);
        if (!td) {
            log.error('CmdSetCellRowRange', `Cell not found. rowIdx: ${this.rowIdx}, colIdx: ${this.colIdx}`);
            return false;
        }
        td.setRowRange(this.oldRange as TdRange);
        return true;
    }
}

class CmdSetCellColRange implements Command {
    private table: Table;
    private readonly rowIdx: number;
    private readonly colIdx: number;
    private oldRange: TdRange | null = null;
    private readonly newRange: TdRange;

    constructor(table: Table, rowIdx: number, colIdx: number, newRange: TdRange) {
        this.table = table;
        this.rowIdx = rowIdx;
        this.colIdx = colIdx;
        this.newRange = newRange;
    }

    execute(): boolean {
        const td = this.table.getCell(this.rowIdx, this.colIdx);
        if (!td) {
            return false;
        }
        this.oldRange = td.getColRange();
        td.setColRange(this.newRange);
        return true;
    }

    undo(): boolean {
        const td = this.table.getCell(this.newRange[0], this.newRange[1]);
        if (!td) {
            log.error('CmdSetCellColRange', `Cell not found. rowIdx: ${this.newRange[0]}, colIdx: ${this.newRange[1]}`);
            return false;
        }
        td.setColRange(this.oldRange as TdRange);
        return true;
    }
}

class CmdAddBlankRow implements Command {
    private table: Table;
    private readonly rowIdx: number;

    constructor(table: Table, rowIdx: number) {
        this.table = table;
        this.rowIdx = rowIdx;
    }

    execute(): boolean {
        return this.table.addRow(this.rowIdx) > 0;
    }

    undo(): boolean {
        return this.table.delRow(this.rowIdx) > 0;
    }
}

class CmdDelBlankRow implements Command {
    private table: Table;
    private readonly rowIdx: number;

    constructor(table: Table, rowIdx: number) {
        this.table = table;
        this.rowIdx = rowIdx;
    }

    execute(): boolean {
        return this.table.delRow(this.rowIdx) > 0;
    }

    undo(): boolean {
        return this.table.addRow(this.rowIdx) > 0;
    }
}

class CmdRemoveBlankRows implements Command {
    private readonly table: Table;
    private cmdMacro: CommandMacro = noopCmdMacro;

    constructor(table: Table) {
        this.table = table;
    }

    execute(): boolean {
        this.cmdMacro = new CommandMacro();
        const trs = this.table.getRows();
        for (let i = 0; i < trs.length; i++) {
            if (trs[i].getTds().length === 0) {
                if (i !== trs.length - 1) {
                    this.cmdMacro.addCommand(new CmdMoveRow(this.table, i + 1, -1));
                }
                this.cmdMacro.addCommand(new CmdDelBlankRow(this.table, i));
            }
        }
        return this.cmdMacro.execute();
    }

    undo(): boolean {
        return this.cmdMacro.undo();
    }
}

export class CmdAddRow implements Command {
    private readonly table: Table;
    private readonly refRowIdx: number;
    private readonly above: boolean;
    private cmdMacro: CommandMacro = noopCmdMacro;

    constructor(table: Table, refRowIdx: number, above: boolean) {
        this.table = table;
        this.refRowIdx = refRowIdx;
        this.above = above;
    }

    execute(): boolean {
        this.cmdMacro = new CommandMacro();
        const trs = this.table.getRows();
        if (this.refRowIdx < 0 || this.refRowIdx >= trs.length) {
            log.error('CmdAddRow', `Invalid refRowIdx: ${this.refRowIdx}`);
            return false;
        }
        const relativeTr = trs[this.refRowIdx];
        const targetRowIdx = this.refRowIdx + (this.above ? 0 : 1);
        // 对应位置增加空行
        this.cmdMacro.addCommand(new CmdAddBlankRow(this.table, targetRowIdx));
        // 空行下面的每行向下偏移一行
        if (this.refRowIdx !== trs.length - 1 || this.above) {
            const rowIdxWillMoveDown = this.above ? this.refRowIdx + 1 : this.refRowIdx + 2;
            this.cmdMacro.addCommand(new CmdMoveRow(this.table, rowIdxWillMoveDown, 1));
        }
        // 按照相对行的单元格生成单元格并插入到空行中
        const relativeTds = relativeTr.getTds();
        let holeStartColIdx = 0;
        for (let i = 0; i < relativeTds.length; i++) {
            const relTd = relativeTds[i];
            const relTdColRange = relTd.getColRange();
            const relTdRowRange = relTd.getRowRange();
            // 如果单元格跨行，向下增加行时不用加单元格，但需要把单元格的跨行+1
            if (relTdRowRange[0] === relTdRowRange[1] || this.above) {
                const tmpTd = this.table.createCell({
                    rowRange: [targetRowIdx, targetRowIdx],
                    colRange: [relTdColRange[0], relTdColRange[1]]
                });
                this.cmdMacro.addCommand(new CmdAddCell(this.table, tmpTd));
            } else {
                this.cmdMacro.addCommand(new CmdSetCellRowRange(this.table, relTdRowRange[0], relTdColRange[0], [relTdRowRange[0], relTdRowRange[1] + 1]));
            }
            // 前面有空洞
            if (holeStartColIdx < relTdColRange[0]) {
                // 去上面的行中找到跨行的单元格，并取出跨了几行，如果相对的行《不是空洞的最后一个》或者《是最后一个并且向上添加行》
                // 就把跨行的单元格增加跨一行
                const tmpTds: Array<Td> = this.table.getTdsCrossRow(this.refRowIdx - 1, holeStartColIdx, relTdColRange[0] - 1);
                if (tmpTds.length === 0) {
                    log.error('CmdAddRow', `Table data error`);
                    return false;
                }
                for (let j = 0; j < tmpTds.length; j++) {
                    const tmpRowRange = tmpTds[j].getRowRange();
                    if (tmpRowRange[1] !== this.refRowIdx || this.above) {
                        tmpTds[j].setRowRange([tmpRowRange[0], tmpRowRange[1] + 1]);
                    }
                }
            }
            holeStartColIdx = relTdColRange[1] + 1;
        }
        // 最后如果有空洞
        const lastColIdx = this.table.getColCount() - 1;
        if (holeStartColIdx < lastColIdx) {
            const tmpTds = this.table.getTdsCrossRow(this.refRowIdx - 1, holeStartColIdx, lastColIdx);
            if (tmpTds.length === 0) {
                log.error('CmdAddRow', `Table data error`);
                return false;
            }
            tmpTds.forEach((td) => {
                const tmpRowRange = td.getRowRange();
                if (tmpRowRange[1] !== this.refRowIdx || this.above) {
                    td.setRowRange([tmpRowRange[0], tmpRowRange[1] + 1]);
                }
            });
        }
        return this.cmdMacro.execute();
    }

    undo(): boolean {
        return this.cmdMacro.undo();
    }
}

export class CmdDelRow implements Command {
    private readonly table: Table;
    private readonly rowIdx: number;
    private cmdMacro: CommandMacro = noopCmdMacro;

    constructor(table: Table, rowIdx: number) {
        this.table = table;
        this.rowIdx = rowIdx;
    }

    execute(): boolean {
        this.cmdMacro = new CommandMacro();
        const tr = this.table.getRowByIndex(this.rowIdx);
        if (!tr) {
            return false;
        }
        tr.getTds().forEach((td) => {
            this.cmdMacro.addCommand(new CmdDelCell(this.table, td.getRowRange()[0], td.getColRange()[0]));
        });
        this.cmdMacro.addCommand(new CmdDelBlankRow(this.table, this.rowIdx));
        if (this.rowIdx < this.table.getRowCount() - 1) {
            this.cmdMacro.addCommand(new CmdMoveRow(this.table, this.rowIdx, -1));
        }
        return this.cmdMacro.execute();
    }

    undo(): boolean {
        return this.cmdMacro.undo();
    }
}

export class CmdAddColumn implements Command {
    private readonly table: Table;
    private readonly refColIdx: number;
    private readonly left: boolean;
    private cmdMacro: CommandMacro = noopCmdMacro;

    constructor(table: Table, refColIdx: number, left: boolean) {
        this.table = table;
        this.refColIdx = refColIdx;
        this.left = left;
    }

    execute(): boolean {
        this.cmdMacro = new CommandMacro();
        this.cmdMacro.addCommand(new CmdAddColHeader(this.table, this.left ? this.refColIdx : this.refColIdx + 1));
        const colCount = this.table.getColCount();
        const trs = this.table.getRows();
        for (let i = 0; i < trs.length; i++) {
            const tr = trs[i];
            const tds = tr.getTds();
            let holeStart = 0;
            for (let j = 0; j < tds.length; j++) {
                const td = tds[j];
                const colRange = td.getColRange();
                // 参考位置在空洞里，不需要加单元格，把该位置单元格往后移动一列
                if (holeStart < colRange[0] && this.refColIdx === holeStart && this.refColIdx <= colRange[0] - 1) {
                    this.cmdMacro.addCommand(new CmdMoveCol(this.table, i, colRange[0], 1));
                    break;
                }
                // 参考位置在单元格中
                if (this.refColIdx >= colRange[0] && this.refColIdx <= colRange[1]) {
                    const rowRange = td.getRowRange();
                    const cellWidth = colRange[1] - colRange[0] + 1;
                    if (colRange[0] !== colRange[1] && (
                        (!this.left && this.refColIdx < colRange[1])
                        || (this.left && this.refColIdx > colRange[0])
                    )) {
                        // 如果单元格跨列，并且插入的位置在跨列范围内，跨列+1
                        this.cmdMacro.addCommand(new CmdSetCellColRange(this.table, rowRange[0], colRange[0], [colRange[0], colRange[1] + 1]));
                    } else {
                        // 插入不跨列的单元格
                        const tmpColIdx = this.left ? colRange[0] : colRange[1] + 1;
                        this.cmdMacro.addCommand(new CmdMoveCol(this.table, rowRange[0], tmpColIdx, 1));
                        const tmpTd = this.table.createCell({
                            rowRange: [rowRange[0], rowRange[1]],
                            colRange: [tmpColIdx, tmpColIdx]
                        });
                        this.cmdMacro.addCommand(new CmdAddCell(this.table, tmpTd));
                    }
                    break;
                }
                // 如果在最后一个单元格后面是空洞并且参考位置在空洞里，什么都不做
                if (j === tds.length - 1 && colRange[1] < colCount - 1 && this.refColIdx > colRange[1] && this.refColIdx <= colCount - 1) {
                    // do nothing
                }
                holeStart = colRange[1] + 1;
            }
        }
        const success = this.cmdMacro.execute();
        if (success) {
            const c = this.table.getColCount();
            this.table.setColCount(c + 1);
        }
        return success;
    }

    undo(): boolean {
        const success = this.cmdMacro.undo();
        if (success) {
            const c = this.table.getColCount();
            this.table.setColCount(c - 1);
        }
        return success;
    }
}

export class CmdDelColumn implements Command {
    private readonly table: Table;
    private readonly colIdx: number;
    private cmdMacro: CommandMacro = noopCmdMacro;

    constructor(table: Table, colIdx: number) {
        this.table = table;
        this.colIdx = colIdx;
    }

    execute(): boolean {
        this.cmdMacro = new CommandMacro();
        this.cmdMacro.addCommand(new CmdDelColHeader(this.table, this.colIdx));
        const firstTr = this.table.getRowByIndex(0);
        let firstTd = (firstTr as Tr).getTdByColIndex(this.colIdx);
        if (!firstTd) {
            log.warn('CmdDelColumn', `Invalid colIdx: ${this.colIdx}`);
            return false;
        }
        const trs = this.table.getRows();
        // 校验每行是否都有colIdx的单元格，保证左边列对齐
        for (let i = 0; i < trs.length; i++) {
            if (!trs[i].leftAlign(this.colIdx)) {
                log.warn('CmdDelColumn', `Invalid colIdx: ${this.colIdx}`);
                return false;
            }
        }
        const firstTdIdx = (firstTr as Tr).indexOf(firstTd);
        const tdsOfFirstRow = (firstTr as Tr).getTds();
        // 第一行从colIdx单元格往后依次检查，保证列对齐
        let rightAlignColIdx: number = -1;
        let rightAligned = false;
        for (let i = firstTdIdx; i < tdsOfFirstRow.length; i++) {
            rightAlignColIdx = tdsOfFirstRow[i].getColRange()[1];
            if (trs.every(tr => tr.rightAlign(rightAlignColIdx))) {
                rightAligned = true;
                break;
            }
        }
        if (!rightAligned) {
            return false;
        }
        const offset = rightAlignColIdx - this.colIdx + 1;
        trs.forEach((tr, i) => {
            const tdsMatched = tr.getTdsInColRange([this.colIdx, rightAlignColIdx]);
            tdsMatched.forEach((td) => {
                this.cmdMacro.addCommand(new CmdDelCell(this.table, i, td.getColRange()[0]));
            });
            this.cmdMacro.addCommand(new CmdMoveCol(this.table, i, this.colIdx, -offset));
        });
        const success = this.cmdMacro.execute();
        if (success) {
            const c = this.table.getColCount();
            this.table.setColCount(c - 1);
        }
        return success;
    }

    undo(): boolean {
        const success = this.cmdMacro.undo();
        if (success) {
            const c = this.table.getColCount();
            this.table.setColCount(c - 1);
        }
        return success;
    }
}

class CmdMoveRow implements Command {
    private table: Table;
    private readonly rowIdx: number;
    private readonly offsetRows: number;

    constructor(table: Table, rowIdx: number, offsetRows: number) {
        this.table = table;
        this.rowIdx = rowIdx;
        this.offsetRows = offsetRows;
    }

    execute(): boolean {
        const trs = this.table.getRows();
        if (this.rowIdx < 0 || this.rowIdx >= trs.length) {
            log.error('CmdMoveRow', `Invalid rowIdx: ${this.rowIdx}, total rows: ${trs.length}`);
            return false;
        }
        for (let i = this.rowIdx; i < trs.length; i++) {
            trs[i].moveRows(this.offsetRows);
        }
        return true;
    }

    undo(): boolean {
        const trs = this.table.getRows();
        for (let i = this.rowIdx; i < trs.length; i++) {
            trs[i].moveRows(-this.offsetRows);
        }
        return true;
    }
}

class CmdMoveCol implements Command {
    private table: Table;
    private readonly rowIdx: number;
    private readonly startColIdx: number;
    private readonly offset: number;
    private anchorIdx: number = -1;

    constructor(table: Table, rowIdx: number, startColIdx: number, offset: number) {
        this.table = table;
        this.rowIdx = rowIdx;
        this.startColIdx = startColIdx;
        this.offset = offset;
    }

    execute(): boolean {
        const tr = this.table.getRowByIndex(this.rowIdx);
        if (!tr) {
            return false;
        }
        this.anchorIdx = tr.moveCols(this.offset, this.startColIdx);
        return true;
    }

    undo(): boolean {
        if (this.anchorIdx >= 0) {
            const tr = this.table.getRowByIndex(this.rowIdx) as Tr;
            tr.moveCols(-this.offset, this.anchorIdx);
        }
        return true;
    }
}

class CmdExtendRows implements Command {
    private table: Table;
    private readonly rowIdx: number;
    private readonly offsetRows: number;
    private cmdMacro: CommandMacro = noopCmdMacro;

    constructor(table: Table, rowIdx: number, offsetRows: number) {
        this.table = table;
        this.rowIdx = rowIdx;
        this.offsetRows = offsetRows;
    }

    execute(): boolean {
        this.cmdMacro = new CommandMacro();
        const trs = this.table.getRows();
        if (this.rowIdx < 0 || this.rowIdx >= trs.length) {
            log.error('CmdExtendRow', `Invalid rowIdx: ${this.rowIdx}, total rows: ${trs.length}`);
            return false;
        }
        const colCount = this.table.getColCount();
        const tds = trs[this.rowIdx].getTds();
        let holeStart = 0;
        const holeList = [];
        for (let i = 0; i < tds.length; i++) {
            const td = tds[i];
            const colRange = td.getColRange();
            if (holeStart < colRange[0]) {
                // 遇到空洞把空洞上面的单元格进行扩展
                holeList.push([holeStart, colRange[1] - 1]);
            } else {
                // 扩展单元格
                const rowRange = td.getRowRange();
                this.cmdMacro.addCommand(new CmdSetCellRowRange(this.table, rowRange[0], colRange[0], [rowRange[0], rowRange[1] + this.offsetRows]));
            }
            holeStart = colRange[1] + 1;
        }
        // 如果最后有空洞
        if (holeStart <= colCount - 1) {
            holeList.push([holeStart, colCount - 1]);
        }
        holeList.forEach((holeRange) => {
            const holes = this.table.getTdsCrossRow(this.rowIdx, holeRange[0], holeRange[1]);
            holes.forEach((hole) => {
                const holeRowRange = hole.getRowRange();
                const holeColRange = hole.getColRange();
                this.cmdMacro.addCommand(new CmdSetCellRowRange(this.table, holeRowRange[0], holeColRange[0], [holeRowRange[0], holeRowRange[1] + this.offsetRows]));
            });
        });
        return this.cmdMacro.execute();
    }

    undo(): boolean {
        return this.cmdMacro.undo();
    }
}

class CmdExtendCols implements Command {
    private table: Table;
    private readonly rowIdx: number;
    private readonly colIdx: number;
    private readonly offsetCols: number;

    constructor(table: Table, rowIdx: number, colIdx: number, offsetCols: number) {
        this.table = table;
        this.rowIdx = rowIdx;
        this.colIdx = colIdx;
        this.offsetCols = offsetCols;
    }

    execute(): boolean {
        const tr = this.table.getRowByIndex(this.rowIdx);
        if (!tr) {
            log.error('CmdExtendCol', `Invalid rowIdx: ${this.rowIdx}`);
            return false;
        }
        tr.extendCols(this.colIdx, this.offsetCols);
        return true;
    }

    undo(): boolean {
        const tr = this.table.getRowByIndex(this.rowIdx) as Tr;
        tr.extendCols(this.colIdx, -this.offsetCols);
        return true;
    }
}

export class CmdMergeCells implements Command {
    private readonly table: Table;
    private readonly rowRange: TdRange;
    private readonly colRange: TdRange;
    private tds: Array<Td> = [];
    private cmdMacro: CommandMacro = noopCmdMacro;

    constructor(table: Table, rowRange: TdRange, colRange: TdRange) {
        this.table = table;
        this.rowRange = rowRange;
        this.colRange = colRange;
    }

    execute(): boolean {
        this.cmdMacro = new CommandMacro();
        const rowRange = this.rowRange;
        const colRange = this.colRange;
        const trs = this.table.getRows();
        const totalColCount =  this.table.getColCount();
        if (rowRange[0] < 0 || rowRange[0] >= trs.length || rowRange[1] < 0 || rowRange[1] >= trs.length || rowRange[0] > rowRange[1]) {
            log.error('Table.mergeCells', `Invalid rowRange: ${this.rowRange}`);
            return false;
        }
        if (colRange[0] < 0 || colRange[0] >= totalColCount || colRange[1] < 0 || colRange[1] >= totalColCount || colRange[0] > colRange[1]) {
            log.error('Table.mergeCells', `Invalid colRange: ${this.colRange}`);
            return false;
        }
        // 校验左右是否对齐
        for (let i = rowRange[0]; i <= rowRange[1]; i++) {
            const tr = trs[i];
            if (!tr.leftAlign(colRange[0], true) || !tr.rightAlign(colRange[1], true)) {
                log.error('Table.mergeCells', `Invalid range. rowRange: ${rowRange}, colRange: ${colRange}`);
                return false;
            }
        }
        // 校验第一行选中的单元格是否连续
        let tmpTds = trs[rowRange[0]].getTdsInColRange(colRange);
        for (let i = 0; i < tmpTds.length - 1; i++) {
            if (tmpTds[i].getColRange()[1] + 1 !== tmpTds[i + 1].getColRange()[0]) {
                log.error('Table.mergeCells', `Invalid rowRange: ${rowRange}`);
                return false;
            }
        }
        // 检验最后一行的空洞是否不再延续到下面
        let tmpTr = trs[rowRange[1]];
        tmpTds = tmpTr.getTdsInColRange(colRange);
        let holeStartIdx = colRange[0];
        for (let i = 0; i < tmpTds.length; i++) {
            const tmpTd = tmpTds[i];
            const tmpColRange = tmpTd.getColRange();
            if (holeStartIdx < tmpColRange[0]) {
                const tdsInHole = this.table.getTdsCrossRow(rowRange[1], holeStartIdx, tmpColRange[0] - 1);
                if (tdsInHole.length === 0) {
                    log.error('CmdMergeCells', `Invalid hole. rowIndex: ${rowRange[1]}, colRange: [${colRange[0]}, ${tmpColRange[0] - 1}]`);
                    return false;
                }
                if (!tdsInHole.every(td => td.getRowRange()[1] === rowRange[1])) {
                    log.error('CmdMergeCells', `Hole is too large`);
                    return false;
                }
            }
            holeStartIdx = tmpColRange[1] + 1;
            if (i === tmpTds.length - 1 && holeStartIdx <= colRange[1]) {
                const tdsInHole = this.table.getTdsCrossRow(rowRange[1], colRange[0], colRange[1]);
                if (tdsInHole.length === 0) {
                    log.error('CmdMergeCells', `Invalid hole. rowIndex: ${rowRange[1]}, colRange: [${colRange[0]}, ${tmpColRange[0] - 1}]`);
                    return false;
                }
                if (!tdsInHole.every(td => td.getRowRange()[1] === rowRange[1])) {
                    log.error('CmdMergeCells', `Hole is too large`);
                    return false;
                }
            }
        }
        // 取出所选区域的单元格
        let content = '';
        for (let i = rowRange[0]; i <= rowRange[1]; i++) {
            const tr = this.table.getRowByIndex(i) as Tr;
            const tds = tr.getTdsInColRange(colRange);
            this.tds = this.tds.concat(tds);
            content += tds.reduce((r, td) => {
                this.cmdMacro.addCommand(new CmdDelCell(this.table, td.getRowRange()[0], td.getColRange()[0]));
                return r + td.getContent();
            }, '');
        }
        const tdMerged = this.table.createCell({
            rowRange,
            colRange,
            content
        });
        this.cmdMacro.addCommand(new CmdAddCell(this.table, tdMerged), new CmdRemoveBlankRows(this.table));
        // 如果跨n列合并的单元格上下的所有单元格都横跨该单元格的横向范围，就把这些单元格的跨列-(n - 1)
        if (colRange[0] != colRange[1]) {
            this.cmdMacro.addCommand(new CmdShrinkColumns(this.table, colRange));
        }
        return this.cmdMacro.execute();
    }

    undo(): boolean {
        return this.cmdMacro.undo();
    }
}

class CmdShrinkColumns implements Command {
    private readonly table: Table;
    private readonly colRange: TdRange;
    private cmdMacro: CommandMacro = noopCmdMacro;

    constructor(table: Table, colRange: TdRange) {
        this.table = table;
        this.colRange = colRange;
    }

    execute(): boolean {
        this.cmdMacro = new CommandMacro();
        const trs = this.table.getRows();
        const intersectRanges = this.table.getIntersectColRanges(this.colRange, 1);
        let colCountShrinked = 0;

        // 对交集列表从右到左进行遍历，避免计算上一次命令导致的偏移
        for (let i = intersectRanges.length - 1; i >= 0; i--) {
            const cmdList = [];
            const insRange = intersectRanges[i];
            const insRangeCount = insRange[1] - insRange[0] + 1;
            colCountShrinked += insRangeCount;
            for (let j = 0; j < trs.length; j++) {
                const tds = trs[j].getTds();
                let holeStartIdx = 0;
                for (let z = 0; z < tds.length; z++) {
                    const colRange = tds[z].getColRange();
                    if (colRange[0] <= insRange[0] && colRange[1] >= insRange[1]) {
                        // 在单元格里（因为获取交集时的冗余参数设置为1，因此肯定比交集大），就可以进行缩减
                        const tmpColIdxAfterShrink = colRange[0] + (colRange[1] - colRange[0]) - (insRange[1] - insRange[0]) - 1;
                        cmdList.push(new CmdSetCellColRange(this.table, j, colRange[0], [colRange[0], tmpColIdxAfterShrink]));
                        if (z !== tds.length - 1) {
                            // 把后面的单元格往左移动
                            cmdList.push(new CmdMoveCol(this.table, j, tds[z + 1].getColRange()[0], -insRangeCount));
                        }
                        break;
                    } else if (holeStartIdx <= insRange[0] && colRange[0] > insRange[1]) {
                        // 在前面的空洞里（交集不会占据多个连续的空洞），就把后面的单元格往左移动
                        cmdList.push(new CmdMoveCol(this.table, j, colRange[0], -insRangeCount));
                        break;
                    }
                    // 交集在最后的空洞里不需要做任何事
                    holeStartIdx = colRange[1] + 1;
                }
            }
            if (cmdList.length > 0) {
                this.cmdMacro.addCommand(...cmdList);
            }
        }
        const success = this.cmdMacro.execute();
        if (success) {
            this.table.setColCount(this.table.getColCount() - colCountShrinked);
        }
        return success;
    }

    undo(): boolean {
        return this.cmdMacro.undo();
    }
}

export class CmdSplitCell implements Command {
    private readonly table: Table;
    private readonly rowIdx: number;
    private readonly colIdx: number;
    private readonly rowCount: number;
    private readonly colCount: number;
    private cmdMacro: CommandMacro = noopCmdMacro;

    constructor(table: Table, rowIdx: number, colIdx: number, rowCount: number, colCount: number) {
        this.table = table;
        this.rowIdx = rowIdx;
        this.colIdx = colIdx;
        this.rowCount = rowCount;
        this.colCount = colCount;
    }

    execute(): boolean {
        this.cmdMacro = new CommandMacro();
        const trs = this.table.getRows();
        if (this.rowIdx < 0 || this.rowIdx >= trs.length) {
            log.error('CmdSplitCell', `Invalid rowIdx: ${this.rowIdx}`);
            return false;
        }
        const td = this.table.getCell(this.rowIdx, this.colIdx);
        if (!td) {
            log.error('CmdSplitCell', `Cell not found. rowIdx: ${this.rowIdx}, colIdx: ${this.colIdx}`);
            return false;
        }
        const rowRange = td.getRowRange();
        const originStartRowIdx = rowRange[0];
        const originEndRowIdx = rowRange[1];
        const originRowCount = originEndRowIdx - originStartRowIdx + 1;

        const colRange = td.getColRange();
        const originStartColIdx = colRange[0];
        const originEndColIdx = colRange[1];
        const originColCount = originEndColIdx - originStartColIdx + 1;
        // 拆分必须是整数倍
        if (this.rowCount % originRowCount !== 0 && originRowCount % this.rowCount !== 0) {
            log.error(`${originRowCount} rows cannot be split into ${this.rowCount} rows`);
            return false;
        }
        if (this.colCount % originColCount !== 0 && originColCount % this.colCount !== 0) {
            log.error(`${originColCount} columns cannot be split into ${this.colCount} columns`);
            return false;
        }
        // *** 分割行 ***
        let endRowIdxAfterSplit = originEndRowIdx;
        let rowStep;
        if (this.rowCount > originRowCount) {
            /* 如果分割的行比最小单位的行数多 */
            const cPerRow = this.rowCount / originRowCount;
            endRowIdxAfterSplit = originStartRowIdx + this.rowCount - 1;
            rowStep = 1;
            const blankRowsInc = cPerRow - 1;
            // 把被拆分的单元格下面的行都向下移动
            if (originEndRowIdx !== trs.length - 1) {
                this.cmdMacro.addCommand(new CmdMoveRow(this.table, originEndRowIdx + 1, this.rowCount - originRowCount));
            }
            for (let i = originStartRowIdx; i < originEndRowIdx + 1; i++) {
                const tmpIdx = i + (cPerRow - 1) * (i - originStartRowIdx);
                // 把被拆分单元格所在的所有行向下扩展
                let tmpC = blankRowsInc;
                while (tmpC-- > 0) {
                    this.cmdMacro.addCommand(new CmdAddBlankRow(this.table, tmpIdx + 1));
                }
                this.cmdMacro.addCommand(new CmdExtendRows(this.table, tmpIdx, blankRowsInc));
            }
        } else {
            rowStep = originRowCount / this.rowCount;
        }
        // 缩小被拆分单元格所占的行数
        this.cmdMacro.addCommand(new CmdSetCellRowRange(this.table, originStartRowIdx, originStartColIdx, [originStartRowIdx, originStartRowIdx + rowStep - 1]));
        // 插入单元格到被拆分的单元格中
        for (let i = originStartRowIdx + rowStep; i < endRowIdxAfterSplit + 1; i += rowStep) {
            const tmpTd = this.table.createCell({
                rowRange: [i, i + rowStep - 1],
                colRange: [originStartColIdx, originEndColIdx]
            });
            this.cmdMacro.addCommand(new CmdAddCell(this.table, tmpTd));
        }
        // 修改行后的末行索引
        const finalEndRowIdx = trs.length + endRowIdxAfterSplit - originEndRowIdx;
        // *** 分割列 ***
        let endColIdxAfterSplit = originEndColIdx;
        let colStep;
        if (this.colCount > originColCount) {
            /* 如果分割的列比最小单位的列数多 */
            // originStartColIdx = 0 originEndColIdx = 1 cPerCol = 2
            const cPerCol = this.colCount / originColCount;
            colStep = 1;
            endColIdxAfterSplit = originStartColIdx + this.colCount - 1;
            const blankColsInc = cPerCol - 1;
            // 每行在被拆分单元格（包含）及后面的单元格进行扩展
            for (let i = originStartColIdx; i < originEndColIdx + 1; i++) {
                for (let j = 0; j < finalEndRowIdx; j++) {
                    this.cmdMacro.addCommand(new CmdExtendCols(this.table, j, originStartColIdx, blankColsInc));
                }
                let tmpC = blankColsInc;
                while (tmpC-- > 0) {
                    this.cmdMacro.addCommand(new CmdAddColHeader(this.table, i + (i - originStartColIdx) * cPerCol));
                }
            }
        } else {
            colStep = originColCount / this.colCount;
        }
        for (let i = originStartRowIdx; i < endRowIdxAfterSplit + 1; i += rowStep) {
            // 缩小被拆分的单元格
            this.cmdMacro.addCommand(new CmdSetCellColRange(this.table, i, originStartColIdx, [originStartColIdx, originStartColIdx + colStep - 1]));
            // 插入新增的单元格
            for (let j = originStartColIdx + colStep; j < endColIdxAfterSplit + 1; j += colStep) {
                const tmpTd = this.table.createCell({
                    rowRange: [i, i + rowStep - 1],
                    colRange: [j, j + colStep - 1]
                });
                this.cmdMacro.addCommand(new CmdAddCell(this.table, tmpTd));
            }
        }
        this.cmdMacro.addCommand(new CmdRemoveBlankRows(this.table));
        const success = this.cmdMacro.execute();
        if (success) {
            this.table.setColCount(this.table.getColCount() + this.colCount - 1);
        }
        return success;
    }

    undo(): boolean {
        return this.cmdMacro.undo();
    }
}

export class CmdSetCellContent implements Command {
    private table: Table;
    private readonly row: number;
    private readonly col: number;
    private readonly content: string;
    private prevContent: string = '';

    constructor(table: Table, row: number, col: number, content: string) {
        this.table = table;
        this.row = row;
        this.col = col;
        this.content = content;
    }

    execute(): boolean {
        const prevContent = this.table.getCellContent(this.row, this.col);
        if (prevContent === null) {
            return false;
        }
        this.prevContent = prevContent as string;
        return this.table.setCellContent(this.row, this.col, this.content);
    }

    undo(): boolean {
        const content = this.table.getCellContent(this.row, this.col);
        if (content === null) {
            return false;
        }
        if (content !== this.content) {
            // warn
        }
        return this.table.setCellContent(this.row, this.col, this.prevContent);
    }
}
