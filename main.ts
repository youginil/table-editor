import TableEditor from './src';
import { TableCells, Td, TdRange } from './src/table';

let table: TableEditor;
const elem = document.getElementById('preview')!;

document.getElementById('generate-table')!.addEventListener('click', function () {
  const rows = +(document.getElementById('table-row') as HTMLInputElement).value;
  var columns = +(document.getElementById('table-column') as HTMLInputElement).value;
  var data: TableCells = [];
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      data.push({
        row: [i, i],
        col: [j, j],
        content: '(' + i + ',' + i + '),(' + j + ',' + j + ')',
        // width: 60,
      });
    }
  }
  table = new TableEditor({
    elem,
    data,
    // defaultColWidth: 160,
    fullWidth: true,
    borderColor: 'blue',
    resizeable: true,
    cellStyle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cellClass: 'cell-style',
    debug: true,
  });

  table.addEventListener('cellfocus', function (e: unknown) {
    console.log('cellfocus', e);
  });

  table.addEventListener('cellblur', function (e: unknown) {
    console.log('cellblur', e);
  });

  table.addEventListener('mousemove', function (e: unknown) {
    // console.log('mousemove', e);
  });
});

window.onload = function () {
  document.getElementById('generate-table')!.click();
};

function debugPos() {
  var trs = elem.querySelector('tbody')!.children;
  for (let i = 0; i < trs.length; i++) {
    var tds = trs[i].children;
    for (let j = 0; j < tds.length; j++) {
      var td = tds[j];
      // @ts-ignore
      var rowRange = (td.td as Td).getRowRange();
      // @ts-ignore
      var colRange = (td.td as Td).getColRange();
      var content = rowRange.join(', ') + '\n' + colRange.join(', ');
      table.setCellContent(rowRange[0], colRange[0], content);
    }
  }
}

document.getElementById('add-row')!.addEventListener('click', function () {
  var n = +(document.getElementById('add-row-num') as HTMLInputElement).value - 1;
  var above = +(document.querySelector('[name="addRowPos"]:checked') as HTMLInputElement).value === 0;
  table.addRow(n, above);
});

document.getElementById('del-row')!.addEventListener('click', function () {
  var n = +(document.getElementById('del-row-num') as HTMLInputElement).value - 1;
  table.delRow(n);
});

document.getElementById('add-col')!.addEventListener('click', function () {
  var n = +(document.getElementById('add-col-num') as HTMLInputElement).value - 1;
  var left = +(document.querySelector('[name="addColPos"]:checked') as HTMLInputElement).value === 0;
  table.addColumn(n, left);
});

document.getElementById('del-col')!.addEventListener('click', function () {
  var n = +(document.getElementById('del-col-num') as HTMLInputElement).value - 1;
  table.delColumn(n);
});

document.getElementById('merge')!.addEventListener('click', function () {
  var row: TdRange = [
    +(document.getElementById('merge-1') as HTMLInputElement).value,
    +(document.getElementById('merge-2') as HTMLInputElement).value,
  ];
  var col: TdRange = [
    +(document.getElementById('merge-3') as HTMLInputElement).value,
    +(document.getElementById('merge-4') as HTMLInputElement).value,
  ];
  table.mergeCells(row, col);
  debugPos();
});

document.getElementById('split')!.addEventListener('click', function () {
  var rowIdx = +(document.getElementById('split-1') as HTMLInputElement).value;
  var colIdx = +(document.getElementById('split-2') as HTMLInputElement).value;
  var rowCount = +(document.getElementById('split-3') as HTMLInputElement).value;
  var colCount = +(document.getElementById('split-4') as HTMLInputElement).value;
  table.splitCell(rowIdx, colIdx, rowCount, colCount);
});

document.getElementById('undo')!.addEventListener('click', function () {
  table.undo();
});

document.getElementById('redo')!.addEventListener('click', function () {
  table.redo();
});
