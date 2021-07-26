import { TECellBlurEvent, TECellFocusEvent, TEMouseMoveEvent } from './event';
export declare type TdRange = [number, number];
declare type TdData = {
    row: TdRange;
    col: TdRange;
    content: string;
    style?: object;
    width?: number;
};
declare type TrData = Array<TdData>;
export declare type TableData = Array<TrData>;
interface Props {
    style?: {
        [prop: string]: string;
    };
    class?: string;
}
export declare type TableCells = Array<TdData>;
export declare function tdRangeToString(range: TdRange | Array<TdRange>): string;
declare type tdOptions = {
    rowRange: TdRange;
    colRange: TdRange;
    content?: string;
    props?: Props;
    borderColor?: string;
};
export declare class Td {
    private rowRange;
    private colRange;
    private content;
    private readonly elem;
    private readonly ccElem;
    private props;
    private editable;
    constructor(options: tdOptions);
    getRowRange(): TdRange;
    getColRange(): TdRange;
    getContent(): string;
    getElem(): HTMLTableCellElement;
    setRowRange(range: TdRange): void;
    setColRange(range: TdRange): void;
    setContent(content: string, updateElement?: boolean): void;
    setEditable(editable: boolean): void;
}
export declare class Tr {
    private readonly tds;
    private readonly elem;
    private colCount;
    constructor(tds?: Array<Td>);
    getElem(): HTMLTableRowElement;
    getTds(): Td[];
    addTd(td: Td): number;
    removeTdByColIdx(colIdx: number): number;
    getTdByColIndex(colIdx: number): Td | null;
    getTdsInColRange(range: TdRange): Array<Td>;
    indexOf(td: Td): number;
    leftAlign(colIdx: number, strict?: boolean): boolean;
    rightAlign(colIdx: number, strict?: boolean): boolean;
    moveRows(offset?: number): void;
    moveCols(offset: number, startColIdx: number): number;
    extendCols(colIdx: number, offsetCols: number): void;
    setColContent(n: number): void;
}
declare type tableOptions = {
    className: string;
    data: TableData | TableCells;
    defaultColWidth: number;
    fullWidth: boolean;
    editable: boolean;
    resizeable: boolean;
    cellStyle: {
        [prop: string]: string;
    };
    cellClass: string;
    borderColor: string;
    debug: boolean;
    onCellFocus: (e: TECellFocusEvent) => void;
    onCellBlur: (e: TECellBlurEvent) => void;
    onMouseMove: (e: TEMouseMoveEvent) => void;
};
export declare class Table {
    readonly elem: HTMLTableElement;
    private readonly colgroupElem;
    private readonly tbodyElem;
    private readonly trs;
    private readonly defaultColWidth;
    private colCount;
    private readonly cellStyle;
    private readonly cellClass;
    private readonly borderColor;
    private editable;
    private readonly resizeable;
    private debug;
    private readonly onCellFocus;
    private readonly onCellBlur;
    private readonly onMouseMove;
    private mouseMode;
    private mouseDownPos;
    private colElsResizing;
    private resizeRange;
    private tdSelectStart;
    constructor(options: tableOptions);
    private initEventListener;
    createCell(options: tdOptions): Td;
    private eventTargetIsCellContent;
    addRow(rowIdx: number): number;
    delRow(rowIdx: number): number;
    addColHeader(colIdx: number): number;
    delColHeader(colIdx: number): number;
    getRows(): Tr[];
    getRowCount(): number;
    getColCount(): number;
    setColCount(n: number): void;
    getRowByIndex(idx: number): Tr | null;
    getTdsCrossRow(fromRowIdx: number, colStartIdx: number, colEndIdx: number): Array<Td>;
    removeCell(rowIdx: number, colIdx: number): number;
    getCell(rowIdx: number, colIdx: number): Td | null;
    getCellContent(rowIdx: number, colIdx: number): string | null;
    setCellContent(rowIdx: number, colIdx: number, content: string): boolean;
    validate(): string;
    getTableData(): {
        rows: {
            row: number[];
            col: number[];
            content: string;
            width: number;
            height: number;
        }[][];
        colWidth: number[];
    };
    setEditable(editable: boolean): void;
    getIntersectColRanges(colRange: TdRange, redundancy?: number): Array<TdRange>;
    destroy(): void;
}
export {};
//# sourceMappingURL=table.d.ts.map