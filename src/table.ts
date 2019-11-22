import log from './log';
import {insertNode, getEventPath} from "./dom";
import get = Reflect.get;

type TdRange = [number, number];
type TdData = {
    row: TdRange;
    col: TdRange;
    content: string;
    style?: object
}
type TrData = Array<TdData>
type TableData = Array<TrData>

interface Props {
    style?: object
}

type TableCells = Array<TdData>;

function tdRangeToString(range: TdRange | Array<TdRange>): string {
    if (range.length === 0) {
        return '';
    }
    if (typeof range[0] === 'number') {
        return `[${range[0]}, ${range[1]}]`;
    }
    const tmpArr = (<Array<TdRange>>range).map((r) => {
        return `[${r[0]}, ${r[1]}]`;
    });
    return `[${tmpArr.join(', ')}]`;
}

class Td {
    private rowRange: TdRange;
    private colRange: TdRange;
    private content: string;
    private readonly elem: HTMLTableCellElement;
    private props: Props;

    constructor(rowRange: TdRange, colRange: TdRange, content?: string, props?: Props) {
        this.content = content || '';
        this.elem = document.createElement('td');
        const div = document.createElement('div');
        div.className = 'cell-content';
        div.contentEditable = 'true';
        div.innerText = this.content;
        this.elem.appendChild(div);
        this.elem['td'] = this;
        this.setRowRange(rowRange);
        this.setColRange(colRange);
        this.props = props || {};
        if (this.props.style) {
            Object.keys(this.props.style).forEach((k) => {
                this.elem.style[k] = this.props.style[k];
            });
        }
    }

    getRowRange() {
        return this.rowRange;
    }

    getColRange() {
        return this.colRange;
    }

    getContent() {
        return this.content;
    }

    getElem() {
        return this.elem;
    }

    setRowRange(range: TdRange) {
        this.rowRange = range;
        if (range[1] === range[0]) {
            this.elem.removeAttribute('rowspan');
        } else {
            this.elem.rowSpan = range[1] - range[0] + 1;
        }
    }

    setColRange(range: TdRange) {
        this.colRange = range;
        if (range[1] === range[0]) {
            this.elem.removeAttribute('colspan');
        } else {
            this.elem.colSpan = range[1] - range[0] + 1;
        }
    }

    setContent(content: string, updateElement: boolean = true) {
        this.content = content;
        if (updateElement) {
            this.elem.innerText = content;
        }
    }

    remove() {
        this.elem.remove();
    }
}

class Tr {
    private readonly tds: Array<Td>;
    private readonly elem: HTMLTableRowElement;
    private colCount: number;

    constructor(tds?: Array<Td>) {
        this.tds = tds || [];
        this.elem = document.createElement('tr');
        this.tds.forEach((td) => {
            this.elem.appendChild(td.getElem());
        })
    }

    getElem() {
        return this.elem;
    }

    getTds() {
        return this.tds;
    }

    addTd(td: Td): number {
        const colRange = td.getColRange();
        if (this.tds.length === 0 || this.tds[this.tds.length - 1].getColRange()[1] < colRange[0]) {
            // 空行或者需要插入到最后
            this.elem.appendChild(td.getElem());
            this.tds.push(td);
            return 1;
        } else if (this.tds[0].getColRange()[0] > colRange[1]) {
            // 插入到开头
            insertNode(this.elem, td.getElem(), 0);
            this.tds.unshift(td);
            return 1;
        } else {
            // 插入到中间
            for (let i = 0; i < this.tds.length; i++) {
                if (i !== this.tds.length - 1) {
                    const tmpColRange = this.tds[i].getColRange();
                    const tmpNextColRange = this.tds[i + 1].getColRange();
                    if (colRange[0] > tmpColRange[1] && colRange[1] < tmpNextColRange[0]) {
                        // 插入到空洞
                        insertNode(this.elem, td.getElem(), i + 1);
                        this.tds.splice(i + 1, 0, td);
                        return 1;
                    }
                }
            }
        }
        const tdsRange = this.tds.map((td) => {
            return td.getColRange();
        });
        log.error('Tr.addTd', `Add td fail. tds col range: ${tdRangeToString(tdsRange)}, tdRange: ${tdRangeToString(colRange)}`);
        return 0;
    }

    removeTdByColIdx(colIdx: number): number {
        for (let i = 0; i < this.tds.length; i++) {
            const td = this.tds[i];
            const colRange = td.getColRange();
            if (colRange[0] === colIdx) {
                this.elem.removeChild(td.getElem());
                this.tds.splice(i, 1);
                return 1;
            }
        }
        return 0;
    }

    getTdByColIndex(colIdx: number): Td | null {
        for (let i = 0; i < this.tds.length; i++) {
            if (this.tds[i].getColRange()[0] === colIdx) {
                return this.tds[i];
            }
        }
        return null;
    }

    getTdsInColRange(range: TdRange): Array<Td> {
        let start = -1;
        let end = -1;
        for (let i = 0; i < this.tds.length; i++) {
            const colRange = this.tds[i].getColRange();
            if (start === -1 && colRange[0] >= range[0]) {
                start = i;
            }
            if (colRange[1] <= range[1]) {
                end = i;
            }
        }
        return start >= 0 && end >= 0 ? this.tds.slice(start, end + 1) : [];
    }

    indexOf(td: Td): number {
        for (let i = 0; i < this.tds.length; i++) {
            if (td === this.tds[i]) {
                return i;
            }
        }
        return -1;
    }

    leftAlign(colIdx: number, strict: boolean = false): boolean {
        if (colIdx === 0) {
            return true;
        }
        let holeStart = 0;
        for (let i = 0; i < this.tds.length; i++) {
            const colRange = this.tds[i].getColRange();
            if (colRange[0] === colIdx) {
                return true;
            }
            // 如果非严格模式并且在空洞里
            if (!strict && colIdx >= holeStart && colIdx < colRange[0]) {
                return true;
            }
            holeStart = colRange[1] + 1;
        }
        // 非严格模式落在最后一个空洞里
        return !strict && colIdx >= holeStart && colIdx < this.colCount - 1;

    }

    rightAlign(colIdx: number, strict: boolean = false): boolean {
        if (colIdx === this.colCount - 1) {
            return true;
        }
        let holeStart = 0;
        for (let i = 0; i < this.tds.length; i++) {
            const colRange = this.tds[i].getColRange();
            if (colIdx === colRange[1]) {
                return true;
            }
            if (!strict && colIdx >= holeStart && colIdx < colRange[0]) {
                return true
            }
            holeStart = colRange[1] + 1;
        }
        return !strict && colIdx >= holeStart && colIdx < this.colCount - 1;
    }

    moveRows(offset: number = 1) {
        this.tds.forEach((td) => {
            const rowRange = td.getRowRange();
            td.setRowRange([rowRange[0] + offset, rowRange[1] + offset]);
        });
    }

    moveCols(offset: number, startColIdx: number): number {
        let anchorIdx = -1;
        this.tds.forEach((td) => {
            const colRange = td.getColRange();
            if (colRange[0] >= startColIdx) {
                td.setColRange([colRange[0] + offset, colRange[1] + offset]);
                if (anchorIdx < 0) {
                    anchorIdx = colRange[0] + offset;
                }
            }
        });
        return anchorIdx;
    }

    extendRows(rows: number) {
        this.tds.forEach((td) => {
            const rowRange = td.getRowRange();
            td.setRowRange([rowRange[0], rowRange[1] + rows]);
        });
    }

    extendCols(colIdx: number, offsetCols: number) {
        let targetTd;
        let targetIdx;
        // 设置为"空洞"的开始
        let prevIdx = 0;
        for (let i = 0; i < this.tds.length; i++) {
            const td = this.tds[i];
            const colRange = td.getColRange();
            if ((colIdx >= colRange[0] && colIdx <= colIdx) || (colIdx >= prevIdx && colIdx < colRange[0])) {
                targetTd = td;
                targetIdx = i;
            }
            prevIdx = colRange[1] + 1;
        }
        if (targetTd) {
            let colRange = targetTd.getColRange();
            targetTd.setColRange([colRange[0], colRange[1] + offsetCols]);
            for (let i = targetIdx + 1; i < this.tds.length; i++) {
                colRange = this.tds[i].getColRange();
                this.tds[i].setColRange([colRange[0] + offsetCols, colRange[1] + offsetCols]);
            }
        }
    }

    setColContent(n: number) {
        this.colCount = n;
    }
}

enum MouseMode {
    NONE,
    RESIZE,
    SELECT
}

class Table {
    static defaultColWidth: number = 50;

    readonly elem: HTMLTableElement;
    private readonly colgroupElem: HTMLElement;
    private readonly tbodyElem: HTMLElement;
    private readonly trs: Array<Tr>;
    private colCount: number = 0;

    private mouseMode: MouseMode = MouseMode.NONE;
    private mouseDownPos: {pageX: number, pageY: number, clientX: number, clientY: number};
    // 拖动的竖线的状态变量
    private colElsResizing: Array<HTMLElement>;
    private resizeRange: [number, number];
    // 开始拖拽的单元格
    private tdSelectStart: {r: number, c: number};

    private debug: boolean;

    constructor(className: string, data: TableData | TableCells, colWidth: number | Array<number>, debug: boolean) {
        this.elem = document.createElement('table');
        this.elem.className = className;
        this.elem.innerHTML = '<colgroup></colgroup><tbody></tbody>';
        this.colgroupElem = this.elem.querySelector('colgroup');
        this.tbodyElem = this.elem.querySelector('tbody');
        this.trs = [];
        this.debug = debug;
        if (!data) {
            (<TableData>data) = [[{
                row: [0, 0],
                col: [0, 0],
                content: '',
                style: {}
            }]];
        }
        try {
            if (data.length === 0) {
                return;
            }
            if ('row' in data[0]) {
                // TableCells
                (<TableCells>data).forEach((tdData) => {
                    const rowRange = tdData.row;
                    const colRange = tdData.col;
                    if (this.trs.length - 1 < rowRange[1]) {
                        for (let i = this.trs.length; i <= rowRange[1]; i++) {
                            const tr = new Tr();
                            this.trs.push(tr);
                            this.tbodyElem.appendChild(tr.getElem());
                        }
                    }
                    const tr = this.trs[rowRange[0]];
                    tr.addTd(new Td(rowRange, colRange, tdData.content, {style: tdData.style || {}}));
                    if (this.colCount < colRange[1]) {
                        this.colCount = colRange[1];
                    }
                });
            } else {
                // TableData
                this.trs = (<TableData>data).map((trData) => {
                    const tds = trData.map((td) => {
                        if (this.colCount < td.col[1]) {
                            this.colCount = td.col[1];
                        }
                        return new Td(td.row, td.col, td.content, {style: td.style || {}});
                    });
                    const tr = new Tr(tds);
                    this.tbodyElem.appendChild(tr.getElem());
                    return tr;
                });
            }
            this.colCount++;
            let i = 0;
            while (i < this.colCount) {
                const colElem = document.createElement('col');
                colElem.style.width = `${typeof colWidth === 'number' ? colWidth : (colWidth[i] || Table.defaultColWidth)}px`;
                this.colgroupElem.appendChild(colElem);
                i++;
            }
        } catch (e) {
            log.error('Invalid table data.', data, e);
            return;
        }
        this.initEventListener();
    }

    private initEventListener() {
        this.elem.addEventListener('input', (e) => {
            e.stopPropagation();
            const ep = getEventPath(e);
            const target = e.target;
            if (this.eventTargetIsCellContent(e)) {
                const td: Td = ep[1].td;
                td.setContent(target['innerText'], false);
            }
        });

        const RESIZE_OFFSET = 5;

        this.elem.addEventListener('mousedown', (e) => {
            if (!this.eventTargetIsCellContent(e)) {
                return;
            }
            this.mouseDownPos = {
                pageX: e.pageX,
                pageY: e.pageY,
                clientX: e.clientX,
                clientY: e.clientY
            };
            const target = e.target;
            const td = <Td>target['parentNode']['td'];
            let tmpIdx = td.getColRange()[0] + (target['offsetX'] < RESIZE_OFFSET ? 0 : 1);
            if ((e.offsetX < RESIZE_OFFSET && tmpIdx > 0) || e.offsetX > target['clientWidth'] - RESIZE_OFFSET) {
                if (e.offsetX < RESIZE_OFFSET) {
                    tmpIdx--;
                }
                // 不能拖拽第一条竖线
                this.mouseMode = MouseMode.RESIZE;
                const colEls = this.colgroupElem.children;
                const maxLeftOffset = +colEls[tmpIdx + 1]['style'].width.slice(0, -2) - 2 * RESIZE_OFFSET;
                const colEl = <HTMLElement>colEls[tmpIdx];
                colEl['originWidth'] = +colEl.style.width.slice(0, -2);
                if (tmpIdx === colEls.length) {
                    // 最后一条竖线
                    this.resizeRange = [maxLeftOffset, this.elem.parentElement.clientWidth - this.elem.clientWidth];
                    this.colElsResizing = [colEl];
                } else {
                    const maxRightOffset = +colEl['style'].width.slice(0, -2) - 2 * RESIZE_OFFSET;
                    this.resizeRange = [maxLeftOffset, maxRightOffset];
                    const leftColEl = <HTMLElement>colEls[tmpIdx - 1];
                    leftColEl['originWidth'] = +leftColEl.style.width.slice(0, -2);
                    this.colElsResizing = [leftColEl, colEl];
                }
            } else {
                this.mouseMode = MouseMode.SELECT;
                this.tdSelectStart = {r: td.getRowRange()[0], c: td.getColRange()[0]};
            }
        });

        this.elem.addEventListener('mouseup', (e) => {
            this.elem.style.cursor = 'text';
            this.mouseMode = MouseMode.NONE;
        });

        this.elem.addEventListener('mousemove', (e) => {
            const target = e.target;
            const ep = getEventPath(e);
            if (this.mouseMode === MouseMode.NONE) {
                if (this.eventTargetIsCellContent(e) && (e.offsetX < RESIZE_OFFSET || e.offsetX > e.target['clientWidth'] - RESIZE_OFFSET)) {
                    this.elem.style.cursor = 'col-resize';
                } else {
                    this.elem.style.cursor = 'text';
                }
            } else if (this.mouseMode === MouseMode.RESIZE) {
                this.elem.style.cursor = 'col-resize';
                const startPageX = this.mouseDownPos.pageX;
                const leftOffset = e.pageX < startPageX
                    ? Math.min(startPageX - e.pageX, this.resizeRange[0])
                    : -Math.min(e.pageX - startPageX, this.resizeRange[1]);
                const leftColEl = this.colElsResizing[0];
                leftColEl.style.width = `${leftColEl['originWidth'] - leftOffset}px`;
                if (this.colElsResizing.length > 1) {
                    const rightColEl = this.colElsResizing[1];
                    rightColEl.style.width = `${rightColEl['originWidth'] + leftOffset}px`;
                }
            } else if (this.mouseMode === MouseMode.SELECT) {
                //
            }
        });

        this.elem.addEventListener('mouseout', (e) => {
            this.elem.style.cursor = 'default';
        });
    }

    private eventTargetIsCellContent(e) {
        const ep = getEventPath(e);
        return e.target instanceof HTMLElement && e.target.classList.contains('cell-content') && ep[4] === this.elem;
    }

    private columnOffsetLeft(idx: number): number {
        const cols = this.colgroupElem.children;
        let offset = 0;
        if (idx < 0) {
            return offset;
        }
        for (let i = 0; i < cols.length; i++) {
            if (i === idx) {
                break;
            }
            offset += +cols[i]['style'].width.slice(0, -2);
        }
        return offset;
    }

    addRow(rowIdx: number): number {
        if (rowIdx < 0 || rowIdx > this.trs.length) {
            log.error('Table.addRow', `Invalid rowIdx: ${rowIdx}`);
            return 0
        }
        const tr = new Tr();
        insertNode(this.tbodyElem, tr.getElem(), rowIdx);
        this.trs.splice(rowIdx, 0, tr);
        return 1;
    }

    delRow(rowIdx: number): number {
        if (rowIdx < 0 || rowIdx >= this.trs.length) {
            log.error('Table.delRow', `Invalid rowIdx: ${rowIdx}`);
            return 0
        }
        const tr = this.trs[rowIdx];
        this.tbodyElem.removeChild(tr.getElem());
        this.trs.splice(rowIdx, 1);
        return 1;
    }

    addColHeader(colIdx: number): number {
        const cols = this.colgroupElem.children;
        if (colIdx < 0 || colIdx >= cols.length) {
            log.error('Table.addCol', `Invalid colIdx: ${colIdx}`);
            return 0;
        }
        const colElem = document.createElement('col');
        colElem.style.width = `${Table.defaultColWidth}px`;
        insertNode(this.colgroupElem, colElem, colIdx);
        return 1;
    }

    delColHeader(colIdx: number): number {
        const colElem = this.colgroupElem.children[colIdx];
        if (!colElem) {
            return 0;
        }
        this.colgroupElem.removeChild(colElem);
        return 1;
    }

    getRows() {
        return this.trs;
    }

    getRowCount(): number {
        return this.trs.length;
    }

    getColCount(): number {
        return this.colCount;
    }

    setColCount(n: number) {
        this.colCount = n;
        this.trs.forEach((tr) => {
            tr.setColContent(n);
        });
    }

    getRowByIndex(idx: number): Tr | null {
        if (idx < 0 || idx >= this.trs.length) {
            return null;
        }
        return this.trs[idx];
    }

    // 获取空洞位置的单元格
    getTdsCrossRow(fromRowIdx: number, colStartIdx: number, colEndIdx: number): Array<Td> | null {
        const ret = [];
        if (fromRowIdx < 0 || fromRowIdx >= this.trs.length) {
            log.error('Table.getTdsCrossRow', `Invalid param fromRowIdx: ${fromRowIdx}`);
            return ret;
        }
        let c = 1;
        for (let i = fromRowIdx; i >= 0; i--) {
            const td = this.trs[i].getTdByColIndex(colStartIdx);
            if (td) {
                ret.push(td);
                const colRange = td.getColRange();
                if (colRange[1] < colEndIdx) {
                    colStartIdx = colRange[1] + 1;
                    i = fromRowIdx;
                    c++;
                } else {
                    break;
                }
            }
        }
        if (c !== ret.length) {
            log.error('Table.getTdsCrossRow', `Table data error`);
        }
        return ret;
    }

    removeCell(rowIdx: number, colIdx: number): number {
        if (rowIdx < 0 || rowIdx >= this.trs.length) {
            log.error('Table.removeCell', `Invalid param rowIdx: ${rowIdx}`);
            return 0;
        }
        const tr = this.trs[rowIdx];
        return tr.removeTdByColIdx(colIdx);
    }

    getCell(rowIdx: number, colIdx: number): Td | null {
        if (rowIdx < 0 || rowIdx >= this.trs.length) {
            log.error('Table.getCell', `Invalid param rowIdx: ${rowIdx}`);
            return null;
        }
        const tr = this.trs[rowIdx];
        return tr.getTdByColIndex(colIdx);
    }

    getCellContent(rowIdx: number, colIdx: number): string | null {
        const td = this.getCell(rowIdx, colIdx);
        if (!td) {
            return null;
        }
        return td.getContent();
    }

    setCellContent(rowIdx: number, colIdx: number, content: string): boolean {
        const td = this.getCell(rowIdx, colIdx);
        if (!td) {
            return false;
        }
        td.setContent(content);
        return true;
    }

    validate(): string {
        if (this.trs.length !== this.tbodyElem.children.length) {
            return 'Row number not match';
        }
        for (let i = 0; i < this.trs.length; i++) {
            const tds = this.trs[i].getTds();
            const tdElems = this.tbodyElem.children[i].children;
            if (tds.length !== tdElems.length) {
                return `The td amount of ${i + 1}th row not match`;
            }
            for (let j = 0; j < tds.length; j++) {
                const td = tds[j];
                const tdElem = tdElems[j];
                const rowRange = td.getRowRange();
                const colRange = td.getColRange();
                if (rowRange[0] !== i) {
                    return `Row range not match. rowIndex: ${i}`;
                }
                const colspan = tdElem.hasAttribute('colspan') ? +tdElem.getAttribute('colspan') : 1;
                if (colspan !== colRange[1] - colRange[0] + 1) {
                    return `Colspan not match. rowIndex: ${i}, colIndex: ${j}`;
                }
                const rowspan = tdElem.hasAttribute('rowspan') ? +tdElem.getAttribute('rowspan') : 1;
                if (rowspan !== rowRange[1] - rowRange[0] + 1) {
                    return `Rowspan not match. rowIndex: ${i}, colIndex: ${j}`;
                }
                if (td.getContent() !== tdElem.firstChild['innerText']) {
                    return `Td content not match. rowIndex: ${i}, colIndex: ${j}`;
                }
            }
        }
        return '';
    }

    getTableData() {
        const rows = this.trs.map((tr) => {
            return tr.getTds().map((td) => {
                const rowRange = td.getRowRange();
                const colRange = td.getColRange();
                return {
                    row: [rowRange[0], rowRange[1]],
                    col: [colRange[0], colRange[1]],
                    content: td.getContent(),
                    width: td.getElem().clientWidth,
                    height: td.getElem().clientHeight
                };
            });
        });
        const colEls = this.colgroupElem.children;
        const colWidth = [];
        for (let i = 0; i < colEls.length; i++) {
            colWidth.push(+colEls[i]['style'].width.slice(0, -2));
        }
        return {
            rows,
            colWidth
        };
    }

    destroy() {
        this.elem.remove();
    }
}

export {TdRange, TableData, TableCells, Td, Table, tdRangeToString};
