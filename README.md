# AG-Grid getStyle update

This repo is intended to deomonstrate a behaviour of the AG-Grid. Specifically when used with it's react bindings. 

This repo uses [`getRowStyle`](https://www.ag-grid.com/javascript-grid-row-styles/#row-styles) or [`cellStyle`](https://www.ag-grid.com/javascript-grid-row-styles/#row-styles) to color the background of certain rows and cells. However when a new function instance is generated for either `getRowStyle` or `cellStyle` the ag-grid does not use the new instance. Not only does it not update the styles on the rows or cells, but even when prompted via [`api.redrawRows`](https://www.ag-grid.com/javascript-grid-api/#refresh) the previously supplied function is used.

Given how react usually behaves this makes the API counterintuitive and I wonder if this is intended behaviour or if this is a bug.

If it is intened then how should one go about updating the instance of the functions in question? The only solution i have come up with so far is to wrap the functions in a method on the parent component. But this solution leads to complexity especially when applied to the `cellStyle` on column definitions.