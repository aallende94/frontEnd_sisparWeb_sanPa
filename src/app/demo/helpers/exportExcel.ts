import { Injectable } from '@angular/core'
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})


export class ExportExcelt {

    exportArrayToExcel(arr: any[], name?: string) {
        let { sheetName, fileName } = this.getFileName(name);
    
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(arr);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        XLSX.writeFile(wb, `${fileName}.xlsx`);
      }
    
    
      getFileName = (name: string) => {
       //  let timeSpan = new Date().toISOString();
        let sheetName = name || "ExportResult";
        let fileName = `${sheetName}`;
        return {
          sheetName,
          fileName
        }
    }

}