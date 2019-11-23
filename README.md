# table-editor

Web table editor

### Usage
````
import TableEditor from 'web-table-editor';

// create instance
const te = new TableEditor({...});
// event listener
te.addEventListener('load', () => {});
// destroy
te.destroy();
````

### Constructor options

 Name              | Type                    | Attributes | Description
------------------|-------------------------|------------|-------------
elem              | HTMLElement             |            | Table container element
data              | TableData, TableCells   |            | Table data
colWidth          | number, Array<number>   | <optional\> | Column width. "number" means all columns has same width.<br>Use "Array<number>" define width of special column. The default is 50
editable          | boolean                 | <optional\> | Table is editable or not. The default is true.
cellFocusedBg     | string                  | <optional\> | Background of cell which is focused. The default is transparent.
borderColor       | string                  | <optional\> | Border color of cell.
debug             | boolean                 | <optional\> | Debug switch. The default is false.

### Methods

* `addRow(rowIdx: number, above: boolean): void`
* `delRow(rowIdx: number): void`
* `addColumn(colIdx: number, left: boolean): void`
* `delColumn(colIdx: number): void`
* `mergeCells(rowRange: TdRange, colRange: TdRange): void`
* `splitCell(rowIdx: number, colIdx: number, rowCount: number, colCount: number): void`
* `getCellContent(rowIdx: number, colIdx: number): string`
* `setCellContent(rowIdx: number, colIdx: number, content: string): void`
* `undo(): void`
* `redo(): void`
* `getTableData(): { rows: Array<Array<object>>, colWidth: Array<number> }`
* `setEditable(editable: boolean): void`
* `addEventListener(name: string, handler: Function): void`
* `removeEventListener(name: string, handler: Function): void`
* `destroy(): void`


### Event Listeners

Name         | Callback param       | Description
-------------|----------------------|-------------
cellfocus    | TECellFocusEvent     | Cell focused
cellblur     | TECellBlurEvent      | Cell blur 
mousemove    | TEMouseMoveEvent     | Mouse move

### Type Definitions

````
type TdRange = [number, number];

type TdData = {
    row: TdRange;
    col: TdRange;
    content: string;
    style?: object
    width?: number
}

type TrData = Array<TdData>

type TableData = Array<TrData>

type TableCells = Array<TdData>;

class TECellFocusEvent {
    row: TdRange;
    col: TdRange;
}

class TECellBlurEvent {
    row: TdRange;
    col: TdRange;
}
class TEMouseMoveEvent {
    offsetX: number;
    offsetY: number;
}
````
