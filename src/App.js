import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const makes = [
  "Toyota",
  "Ford",
  "Porsche"
];

const useRotatingStyle = (name, color) => {
  const [makeToHighlightIndex, setMakeToHighlightIndex] = useState(0);

  const getStyle = useCallback(({ data }) => {
    console.log(name, "getStyle", makeToHighlightIndex, makes[makeToHighlightIndex]);
    return data.make === makes[makeToHighlightIndex]
      ? { backgroundColor: color }
      : { backgroundColor: "rgba(0,0,0,0)" }
  }, [makeToHighlightIndex, color, name]);

  const rotate = () => {
    const nextMakeIndex = (makeToHighlightIndex + 1) % makes.length
    console.log(name, "rotate", nextMakeIndex, makes[nextMakeIndex]);
    setMakeToHighlightIndex(nextMakeIndex);
  };

  return { getStyle, rotate };
};

const App = () => {  
  const { getStyle: getCellStyle, rotate: rotateCellStyle } = useRotatingStyle("Cell", "#F2BD99");

  const columnDefs = [
    { headerName: "Make", field: "make", cellStyle: getCellStyle },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" }
  ];
  
  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 }, 
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
  ];

  const { getStyle: getRowStyle, rotate: rotateRowStyle } = useRotatingStyle("Row", "#99CEF2");

  const [gridApi, setGridApi] = useState();
  const onGridReady = useCallback(({ api }) => {
    setGridApi(api);
  }, []);

  useEffect(() => {
    if (gridApi) {
      console.log("redraw");
      gridApi.redrawRows();
    }
  }, [gridApi, getRowStyle, getCellStyle]);

  return (
    <div
      className="grid-wrapper ag-theme-balham"
    >
      <button onClick={rotateRowStyle}>Rotate Row Style</button>
      <button onClick={rotateCellStyle}>Rotate Cell Style</button>
      <AgGridReact
        getRowStyle={getRowStyle}
        columnDefs={columnDefs}
        rowData={rowData}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default App;