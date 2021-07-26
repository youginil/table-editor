import { TableData, TableCells, TdRange } from './table';
import '../style/editor.scss';
/**
 * @public
 */
export declare type EditorOptions = {
    elem: HTMLElement;
    data: TableData | TableCells;
    defaultColWidth?: number;
    fullWidth?: boolean;
    editable?: boolean;
    resizeable?: boolean;
    borderColor?: string;
    cellStyle?: {
        [prop: string]: string;
    };
    cellClass?: string;
    debug?: boolean;
    maxUndoTimes?: number;
};
/**
 * @public
 */
export default class TableEditor {
    private elem;
    private readonly table;
    private cmdHistory;
    private editable;
    private readonly debug;
    private eventHandler;
    constructor(options: EditorOptions);
    addRow(rowIdx: number, above: boolean): boolean;
    delRow(rowIdx: number): boolean;
    addColumn(colIdx: number, left: boolean): boolean;
    delColumn(colIdx: number): boolean;
    mergeCells(rowRange: TdRange, colRange: TdRange): boolean;
    splitCell(rowIdx: number, colIdx: number, rowCount: number, colCount: number): boolean;
    getCellContent(rowIdx: number, colIdx: number): string;
    setCellContent(rowIdx: number, colIdx: number, content: string): boolean;
    undo(): boolean;
    redo(): void;
    getTableData(): {
        rows: Array<Array<object>>;
        colWidth: Array<number>;
    };
    setEditable(editable: boolean): void;
    addEventListener(name: string, handler: Function): void;
    removeEventListener(name: string, handler: Function): void;
    private printDebugInfo;
    destroy(): void;
}
//# sourceMappingURL=index.d.ts.map