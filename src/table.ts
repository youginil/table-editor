import log from './log';
import {insertNode, getEventPath} from "./dom";
import {TECellBlurEvent, TECellFocusEvent, TEMouseMoveEvent} from "./event";
import {extend} from "./utils";

type TdRange = [number, number];
type TdData = {
    row: TdRange
    col: TdRange
    content: string
    style?: object
    width?: number
}
type TrData = Array<TdData>
type TableData = Array<TrData>

interface Props {
    style?: {
        [prop: string]: string
    },
    class?: string
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

type tdOptions = {
    rowRange: TdRange
    colRange: TdRange
    content?: string
    props?: Props
    borderColor?: string
};

class Td {
    private rowRange: TdRange = [-1, -1];
    private colRange: TdRange = [-1, -1];
    private content: string;
    private readonly elem: HTMLTableCellElement;
    private readonly ccElem: HTMLDivElement;
    private props: Props;
    private editable: boolean = true;

    constructor(options: tdOptions) {
        this.content = options.content || '';
        this.elem = document.createElement('td');
        if ('borderColor' in options && options.borderColor) {
            this.elem.style.borderColor = options.borderColor as string;
        }
        // cc is short for "content cell"
        this.ccElem = document.createElement('div');
        this.ccElem.className = 'cell-content';
        this.ccElem.innerText = this.content;
        this.elem.appendChild(this.ccElem);
        // @ts-ignore
        this.elem.td = this;
        this.setRowRange(options.rowRange);
        this.setColRange(options.colRange);
        this.props = options.props || {};
        if (this.props.style) {
            Object.keys(this.props.style).forEach((k) => {
                // @ts-ignore
                this.ccElem.style[k] = this.props.style[k];
            });
        }
        if (this.props.class) {
            this.ccElem.classList.add(this.props.class);
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
            this.ccElem.innerText = content;
        }
    }

    setEditable(editable: boolean) {
        this.editable = editable;
        if (this.editable) {
            this.ccElem.contentEditable = 'true';
        } else {
            this.ccElem.removeAttribute('contenteditable');
        }
    }
}

export class Tr {
    private readonly tds: Array<Td>;
    private readonly elem: HTMLTableRowElement;
    private colCount: number = 0;

    constructor(tds?: Array<Td>) {
        this.tds = tds || [];
        this.elem = document.createElement('tr');
        this.tds.forEach((td) => {
            this.elem.appendChild(td.getElem());
        });
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

    extendCols(colIdx: number, offsetCols: number) {
        let targetTd;
        let targetIdx = -1;
        // 设置为"空洞"的开始
        let holeStart = 0;
        for (let i = 0; i < this.tds.length; i++) {
            const td = this.tds[i];
            const colRange = td.getColRange();
            if (colIdx >= holeStart && colIdx < colRange[0]) {
                // 在空洞里，就把后面的都往后移动
                for (let j = i; j < this.tds.length; j++) {
                    const tmpTd = this.tds[j];
                    const tmpColRange = tmpTd.getColRange();
                    tmpTd.setColRange([tmpColRange[0] + offsetCols, tmpColRange[1] + offsetCols]);
                }
                break;
            } else if (colIdx >= colRange[0] && colIdx <= colRange[1]) {
                // 如果在单元格里，就把当前单元格扩展，把后面的单元格后移
                td.setColRange([colRange[0], colRange[1] + offsetCols]);
                for (let j = i + 1; j < this.tds.length; j++) {
                    const tmpColRange = this.tds[j].getColRange();
                    this.tds[j].setColRange([tmpColRange[0] + offsetCols, tmpColRange[1] + offsetCols]);
                }
                break;
            }
            holeStart = colRange[1] + 1;
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

type tableOptions = {
    className: string
    data: TableData | TableCells
    defaultColWidth: number
    fullWidth: boolean
    editable: boolean
    resizeable: boolean
    cellStyle: {[prop: string]: string}
    cellClass: string
    borderColor: string
    debug: boolean
    onCellFocus: (e: TECellFocusEvent) => void
    onCellBlur: (e: TECellBlurEvent) => void
    onMouseMove: (e: TEMouseMoveEvent) => void
};

type mousePos = { pageX: number, pageY: number, clientX: number, clientY: number };

class Table {
    readonly elem: HTMLTableElement;
    private readonly colgroupElem: HTMLElement;
    private readonly tbodyElem: HTMLElement;
    private readonly trs: Array<Tr>;
    private readonly defaultColWidth: number;
    private colCount: number = 0;
    private readonly cellStyle: {[prop: string]: string};
    private readonly cellClass: string;
    private readonly borderColor: string;
    private editable: boolean;
    private readonly resizeable: boolean;
    private debug: boolean;
    private readonly onCellFocus: (e: TECellFocusEvent) => void;
    private readonly onCellBlur: (e: TECellBlurEvent) => void;
    private readonly onMouseMove: (e: TEMouseMoveEvent) => void;

    private mouseMode: MouseMode = MouseMode.NONE;
    private mouseDownPos: mousePos = {pageX: 0, pageY: 0, clientX: 0, clientY: 0};
    // 拖动的竖线的状态变量
    private colElsResizing: Array<HTMLElement> = [];
    private resizeRange: [number, number] = [-1, -1];
    // 开始拖拽的单元格
    private tdSelectStart: {r: number, c: number} = {r: 0, c: 0};

    constructor(options: tableOptions) {
        this.elem = document.createElement('table');
        this.elem.className = options.className;
        if (options.fullWidth) {
            this.elem.classList.add('full-width');
        }
        this.colgroupElem = document.createElement('colgroup');
        this.tbodyElem = document.createElement('tbody');
        this.elem.appendChild(this.colgroupElem);
        this.elem.appendChild(this.tbodyElem);
        this.trs = [];
        this.defaultColWidth = options.defaultColWidth;
        this.editable = options.editable;
        this.resizeable = options.resizeable;
        this.cellStyle = options.cellStyle;
        this.cellClass = options.cellClass;
        this.borderColor = options.borderColor;
        this.debug = options.debug;
        this.onCellFocus = options.onCellFocus;
        this.onCellBlur = options.onCellBlur;
        this.onMouseMove = options.onMouseMove;
        let data = options.data || [[{
            row: [0, 0],
            col: [0, 0],
            content: '',
            style: {}
        }]];
        try {
            if (data.length === 0) {
                return;
            }
            const cwc = new ColWidthCalculator();
            if ('row' in data[0]) {
                // TableCells
                (data as TableCells).forEach((tdData) => {
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
                    tr.addTd(this.createCell({
                        rowRange,
                        colRange,
                        content: tdData.content,
                        props: {
                            style: 'style' in tdData ? extend(this.cellStyle, tdData.style as {[prop: string]: string}) : this.cellStyle,
                            class: this.cellClass
                        }
                    }));
                    if ('width' in tdData) {
                        cwc.add(colRange, tdData['width'] as number);
                    }
                    if (this.colCount < colRange[1]) {
                        this.colCount = colRange[1];
                    }
                });
            } else {
                // TableData
                this.trs = (data as TableData).map((trData) => {
                    const tds = trData.map((td) => {
                        if (this.colCount < td.col[1]) {
                            this.colCount = td.col[1];
                        }
                        if ('width' in td) {
                            cwc.add(td.col, td.width as number);
                        }
                        return this.createCell({
                            rowRange: td.row,
                            colRange: td.col,
                            content: td.content,
                            props: {
                                style: 'style' in td ? extend(this.cellStyle, td.style as {[prop: string]: string}) : this.cellStyle,
                                class: this.cellClass
                            }
                        });
                    });
                    const tr = new Tr(tds);
                    this.tbodyElem.appendChild(tr.getElem());
                    return tr;
                });
            }
            this.colCount++;
            let i = 0;
            const colWidthCalculated = cwc.calc(this.colCount, this.defaultColWidth);
            while (i < this.colCount) {
                const colElem = document.createElement('col');
                if (colWidthCalculated[i] > 0) {
                    colElem.style.width = `${colWidthCalculated[i]}px`;
                } else if (this.defaultColWidth > 0) {
                    colElem.style.width = `${this.defaultColWidth}px`;
                }
                this.colgroupElem.appendChild(colElem);
                i++;
            }
            // 空行
            const blankRowIndexes: Array<number> = [];
            this.trs.forEach((tr, tri) => {
                const tds = tr.getTds();
                if (tds.length === 0) {
                    blankRowIndexes.push(tri);
                } else {
                    tds.forEach((td) => {
                        td.setEditable(this.editable);
                    });
                }
            });
            if (blankRowIndexes.length > 0) {
                for (let tri = blankRowIndexes.length - 1; tri >= 0; tri--) {
                    this.trs[tri].getElem().remove();
                    this.trs.splice(tri, 1);
                }
                log.warn(`Rows: (${blankRowIndexes.join(', ')}) are blank.`);
            }
            // 校验一下
            const errMsg = this.validate();
            if (errMsg) {
                log.error('Table data error.', this.trs, `${errMsg}`);
                return;
            }
        } catch (e) {
            log.error('Invalid table data.', options.data, e);
            return;
        }
        this.initEventListener();
    }

    private initEventListener() {
        this.elem.addEventListener('input', (e) => {
            if (!this.editable) {
                return;
            }
            e.stopPropagation();
            const ep = getEventPath(e);
            const target = e.target as HTMLElement;
            if (this.eventTargetIsCellContent(e)) {
                // @ts-ignore
                const td: Td = (ep[1] as HTMLElement).td;
                td.setContent(target['innerText'] as string, false);
            }
        });

        const RESIZE_OFFSET = 5;

        this.elem.addEventListener('mousedown', (e) => {
            if (!this.editable || !this.eventTargetIsCellContent(e)) {
                return;
            }
            this.mouseDownPos = {
                pageX: e.pageX,
                pageY: e.pageY,
                clientX: e.clientX,
                clientY: e.clientY
            };
            const target = e.target as HTMLElement;
            // @ts-ignore
            const td = (target['parentNode'] as HTMLElement)['td'] as Td;
            let tmpIdx = td.getColRange()[0] + (e.offsetX < RESIZE_OFFSET ? 0 : 1);
            if ((e.offsetX < RESIZE_OFFSET && tmpIdx > 0) || e.offsetX > target['clientWidth'] - RESIZE_OFFSET) {
                if (!this.resizeable || this.defaultColWidth <= 0) {
                    return;
                }
                // 不能拖拽第一条竖线
                this.mouseMode = MouseMode.RESIZE;
                const colEls = this.colgroupElem.children as HTMLCollection;
                const maxLeftOffset = +(colEls[tmpIdx + 1] as HTMLElement)['style'].width.slice(0, -2) - 2 * RESIZE_OFFSET - 30;
                const colEl = colEls[tmpIdx] as HTMLElement;
                // @ts-ignore
                colEl['originWidth'] = +colEl.style.width.slice(0, -2);
                if (tmpIdx === colEls.length) {
                    // 最后一条竖线
                    this.resizeRange = [maxLeftOffset, (this.elem.parentElement as HTMLElement).clientWidth - this.elem.clientWidth];
                    this.colElsResizing = [colEl];
                } else {
                    const maxRightOffset = +colEl['style'].width.slice(0, -2) - 2 * RESIZE_OFFSET - 30;
                    this.resizeRange = [maxLeftOffset, maxRightOffset];
                    const leftColEl = colEls[tmpIdx - 1] as HTMLElement;
                    // @ts-ignore
                    leftColEl['originWidth'] = +leftColEl.style.width.slice(0, -2);
                    this.colElsResizing = [leftColEl, colEl];
                }
            } else {
                this.mouseMode = MouseMode.SELECT;
                this.tdSelectStart = {r: td.getRowRange()[0], c: td.getColRange()[0]};
            }
        });

        this.elem.addEventListener('mouseup', (e) => {
            if (!this.editable) {
                return;
            }
            this.elem.style.cursor = 'text';
            this.mouseMode = MouseMode.NONE;
        });

        this.elem.addEventListener('mousemove', (e) => {
            const target = e.target as HTMLElement;
            const ep = getEventPath(e);
            if (this.mouseMode === MouseMode.NONE) {
                if (this.eventTargetIsCellContent(e) && (e.offsetX < RESIZE_OFFSET || e.offsetX > target['clientWidth'] - RESIZE_OFFSET)) {
                    // 鼠标在竖线上
                    if (this.resizeable) {
                        this.elem.style.cursor = 'col-resize';
                    }
                } else {
                    if (this.editable) {
                        this.elem.style.cursor = 'text';
                    }
                }
            } else if (this.mouseMode === MouseMode.RESIZE) {
                if (this.resizeable) {
                    this.elem.style.cursor = 'col-resize';
                    const startPageX = this.mouseDownPos.pageX;
                    const leftOffset = e.pageX < startPageX
                        ? Math.min(startPageX - e.pageX, this.resizeRange[0])
                        : -Math.min(e.pageX - startPageX, this.resizeRange[1]);
                    const leftColEl = this.colElsResizing[0];
                    // @ts-ignore
                    leftColEl.style.width = `${leftColEl['originWidth'] - leftOffset}px`;
                    if (this.colElsResizing.length > 1) {
                        const rightColEl = this.colElsResizing[1];
                        // @ts-ignore
                        rightColEl.style.width = `${rightColEl['originWidth'] + leftOffset}px`;
                    }
                }
            } else if (this.mouseMode === MouseMode.SELECT) {
                if (this.editable) {
                    //
                }
            }
            this.onMouseMove(new TEMouseMoveEvent({
                offsetX: e.offsetX,
                offsetY: e.offsetY
            }));
        });

        this.elem.addEventListener('mouseout', (e) => {
            this.elem.style.cursor = 'default';
        });

        this.elem.addEventListener('focusin', (e) => {
            if (this.eventTargetIsCellContent(e)) {
                const target = e.target as HTMLElement;
                const tdEl = target.parentElement as HTMLElement;
                // @ts-ignore
                const td: Td = tdEl.td;
                const rowRange = td.getRowRange();
                const colRange = td.getColRange();
                this.onCellFocus(new TECellFocusEvent([rowRange[0], rowRange[1]], [colRange[0], colRange[1]]));
            }
        });

        this.elem.addEventListener('focusout', (e) => {
            if (this.eventTargetIsCellContent(e)) {
                const target = e.target as HTMLElement;
                const tdEl = target.parentElement as HTMLElement;
                tdEl.style.background = '';
                // @ts-ignore
                const td: Td = tdEl.td;
                const rowRange = td.getRowRange();
                const colRange = td.getColRange();
                this.onCellBlur(new TECellBlurEvent([rowRange[0], rowRange[1]], [colRange[0], colRange[1]]));
            }
        });
    }

    createCell(options: tdOptions): Td {
        if (!options.props) {
            options.props = {};
        }
        if (!options.props.style) {
            options.props.style = {};
        }
        if (this.cellClass) {
            options.props.class = this.cellClass;
        }
        if (this.borderColor) {
            options.borderColor = this.borderColor;
        }
        const td = new Td(options);
        td.setEditable(this.editable);
        return td;
    }

    private eventTargetIsCellContent(e: Event) {
        const ep = getEventPath(e);
        return e.target instanceof HTMLElement && e.target.classList.contains('cell-content') && ep[4] === this.elem;
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
        if (this.defaultColWidth > 0) {
            colElem.style.width = `${this.defaultColWidth}px`;
        }
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
    getTdsCrossRow(fromRowIdx: number, colStartIdx: number, colEndIdx: number): Array<Td> {
        const ret: Array<Td> = [];
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
        // 校验数据与生成的表格信息是否一致
        for (let i = 0; i < this.trs.length; i++) {
            const tds = this.trs[i].getTds();
            const tdElems = this.tbodyElem.children[i].children as HTMLCollection;
            if (tds.length !== tdElems.length) {
                return `The td amount of ${i + 1}th row not match`;
            }
            for (let j = 0; j < tds.length; j++) {
                const td = tds[j];
                const tdElem = tdElems[j] as HTMLElement;
                const rowRange = td.getRowRange();
                const colRange = td.getColRange();
                if (rowRange[0] < 0 || rowRange[1] < 0 || colRange[0] < 0 || colRange[1] < 0) {
                    return `Td data error. rowIndex: ${i}, colIndex: ${j}`;
                }
                if (rowRange[0] !== i) {
                    return `Row range not match. rowIndex: ${i}`;
                }
                const colspan = tdElem.hasAttribute('colspan') ? +(tdElem as any).getAttribute('colspan') : 1;
                if (colspan !== colRange[1] - colRange[0] + 1) {
                    return `Colspan not match. rowIndex: ${i}, colIndex: ${j}`;
                }
                const rowspan = tdElem.hasAttribute('rowspan') ? +(tdElem as any).getAttribute('rowspan') : 1;
                if (rowspan !== rowRange[1] - rowRange[0] + 1) {
                    return `Rowspan not match. rowIndex: ${i}, colIndex: ${j}`;
                }
                if (td.getContent() !== (tdElem.children[0] as HTMLElement).innerText) {
                    return `Td content not match. rowIndex: ${i}, colIndex: ${j}`;
                }
            }
        }
        // 校验表格是否为正常表格
        const totalColCount = this.colgroupElem.children.length;
        const trs = this.tbodyElem.children;
        // 空洞集合
        let holes: Array<{depth: number, range: TdRange}> = [];
        for (let tri = 0; tri < trs.length; tri++) {
            const tds = trs[tri].children;
            // 创建出实体的部分
            const solidRanges: Array<{fill: number, total: number, range: TdRange}> = [];
            if (holes.length === 0) {
                solidRanges.push({
                    fill: 0,
                    total: totalColCount,
                    range: [0, totalColCount - 1]
                });
            } else {
                let tmpColIdx = 0;
                for (let hi = 0; hi < holes.length; hi++) {
                    const holeStart = holes[hi].range[0];
                    if (holeStart > tmpColIdx) {
                        solidRanges.push({
                            fill: 0,
                            total: holeStart - tmpColIdx,
                            range: [tmpColIdx, holeStart - 1]
                        });
                    }
                    tmpColIdx = holes[hi].range[1] + 1;
                    if (hi === holes.length - 1 && tmpColIdx < totalColCount) {
                        solidRanges.push({
                            fill: 0,
                            total: totalColCount - tmpColIdx,
                            range: [tmpColIdx, totalColCount - 1]
                        });
                    }
                }
            }
            // 遍历当前行的单元格，往实体部分填充
            let solidIdx = 0;
            const newHoles: Array<{depth: number, range: TdRange}> = [];
            for (let tdi = 0; tdi < tds.length; tdi++) {
                const td = tds[tdi];
                // @ts-ignore
                const colspan = td.hasAttribute('colspan') ? +td.getAttribute('colspan') : 1;
                // @ts-ignore
                const rowspan = td.hasAttribute('rowspan') ? +td.getAttribute('rowspan') : 1;
                const solid = solidRanges[solidIdx];
                if (colspan <= solid.total - solid.fill) {
                    solid.fill += colspan;
                } else {
                    return `Invalid Row: ${tri} near Cell: ${tdi}`;
                }
                if (tdi === tds.length - 1) {
                    if (solid.fill !== solid.total || solidIdx < solidRanges.length - 1) {
                        return `Invalid Row: ${tri}`;
                    }
                } else if (solid.fill === solid.total) {
                    if (solidIdx === solidRanges.length - 1) {
                        return `Invalid Row: ${tri}`;
                    }
                    solidIdx++;
                }
                // 如果单元格跨行，就保存到新的空洞
                if (rowspan > 1) {
                    const tmpStartColIdx = solid.range[0] + solid.fill - 1;
                    newHoles.push({
                        depth: rowspan - 1,
                        range: [tmpStartColIdx, tmpStartColIdx + colspan - 1]
                    });
                }
            }
            // 把空洞集合过滤掉已经到底的空洞
            holes = holes.filter((item) => {
                item.depth--;
                return item.depth > 0;
            });
            // 把新的空洞插入到空洞集合并进行排序
            holes.push(...newHoles);
            // 校验空洞集合数据合法性
            for (let hi = 0; hi < holes.length; hi++) {
                if (hi !== holes.length - 1 && holes[hi].range[1] >= holes[hi + 1].range[0]) {
                    return `Invalid table structure. ${JSON.stringify(holes)}`;
                }
            }
            // 如果是最后一行，没有空洞了
            if (tri === trs.length - 1 && holes.length > 0) {
                return `Invalid Table structure. ${JSON.stringify(holes)}`;
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
        const colEls = this.colgroupElem.children as HTMLCollection;
        const colWidth = [];
        for (let i = 0; i < colEls.length; i++) {
            colWidth.push(+(colEls[i] as HTMLElement).style.width.slice(0, -2));
        }
        return {
            rows,
            colWidth
        };
    }

    setEditable(editable: boolean) {
        if (this.editable === editable) {
            return;
        }
        this.editable = editable;
        const edt = this.editable ? 'true' : 'false';
        this.trs.forEach((tr) => {
            tr.getTds().forEach((td) => {
                td.getElem().contentEditable = edt;
            });
        });
    }

    // 单元格的跨列交集
    getIntersectColRanges(colRange: TdRange, redundancy: number = 0): Array<TdRange> {
        if (colRange[0] >= colRange[1]) {
            return [];
        }
        const startIdx =  colRange[0];
        const endIdx = colRange[1] + 1;
        // 把result当作一个数轴，设置区间colRange[0] ~ colRange[1] + 1，把每行中列的点（索引）画（存）到数轴上
        // 最后把每2个点作为区间取出来，然后去掉不满足冗余条件的区间
        const axis = [startIdx, endIdx];
        this.trs.forEach((tr, rowIdx) => {
            const tds = tr.getTds();
            let holeStartIdx = 0;
            for (let i = 0; i < tds.length; i++) {
                const tdColRange = tds[i].getColRange();
                const points: Set<number> = new Set();
                if (holeStartIdx < tdColRange[0]) {
                    // 把空洞中所有的点取出来
                    const holes = this.getTdsCrossRow(rowIdx, holeStartIdx, tdColRange[0] - 1);
                    for (let j = 0; j < holes.length; j++) {
                        const tmpHoleTdColRange = holes[j].getColRange();
                        if (tmpHoleTdColRange[0] > startIdx && tmpHoleTdColRange[0] < endIdx) {
                            points.add(tmpHoleTdColRange[0]);
                        }
                        if (tmpHoleTdColRange[1] + 1 > startIdx && tmpHoleTdColRange[1] + 1 < endIdx) {
                            points.add(tmpHoleTdColRange[1] + 1);
                        }
                    }
                }
                if (tdColRange[0] + 1 >= endIdx) {
                    break;
                }
                if (tdColRange[0] > startIdx && tdColRange[0] < endIdx) {
                    points.add(tdColRange[0]);
                }
                if (tdColRange[1] + 1 > startIdx && tdColRange[1] + 1 < endIdx) {
                    points.add(tdColRange[1] + 1);
                }
                holeStartIdx = tdColRange[1] + 1;
                if (points.size > 0) {
                    points.forEach((v: number) => {
                        for (let i = 0; i < axis.length - 1; i++) {
                            if (v > axis[i] && v < axis[i + 1]) {
                                axis.splice(i + 1, 0, <number>v);
                                break;
                            }
                        }
                    });
                }
            }
        });
        const result: Array<TdRange> = [];
        for (let i = 0; i < axis.length - 1; i++) {
            if (axis[i + 1] - axis[i] > redundancy) {
                result.push([axis[i] + redundancy, axis[i + 1] - 1]);
            }
        }
        return result;
    }

    destroy() {
        this.elem.remove();
    }
}

class ColWidthCalculator {
    private readonly data: {
        [prop: number]: {
            [key: number]: number
        }
    };
    private readonly result: Array<number> = [];

    constructor() {
        this.data = Object.create(null);
    }

    add(colRange: TdRange, width: any) {
        if (typeof width !== 'number') {
            return;
        }
        if (colRange[0] === colRange[1]) {
            if (colRange[0] > this.result.length - 1) {
                for (let i = this.result.length; i <= colRange[0]; i++) {
                    this.result.push(0);
                }
                this.result[colRange[0]] = width as number;
            }
        } else {
            if (!(colRange[0] in this.data)) {
                this.data[colRange[0]] = {};
            }
            this.data[colRange[0]][colRange[1]] = width as number;
        }
    }

    calc(colCount: number, colWidth: number | Array<number>): Array<number> {
        if (colCount > this.result.length) {
            for (let i = this.result.length; i < colCount; i++) {
                this.result.push(0);
            }
        }
        const isNum: boolean = typeof colWidth === 'number';
        this.result.forEach((w, i) => {
            if (w === null) {
                this.result[i] = isNum ? colWidth as number : (colWidth as Array<number>)[i];
            }
        });
        return this.result;
    }
}

export {TdRange, TableData, TableCells, Td, Table, tdRangeToString};
