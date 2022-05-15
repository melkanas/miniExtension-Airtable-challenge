import { classe } from "./classesSlice";
import { schoolBase, TABLES } from "../../app/airtableAPI";
// A mock function to mimic making an async request for data
export function fetchClasses(ids:string[] = []) {
  let filterByFormula="OR("+ids.reduce((acc,curr,Index)=>{
    let comma = (Index === (ids.length-1))? "":",";
    acc += `RECORD_ID()='${curr}'`+comma;
    return acc;
  },"")+")";
  return new Promise<{ data: Array<classe & {Students:string[]}> }>((resolve,reject) =>{
    schoolBase(TABLES.CLASS_TABLE.ID).select({
        fields: ["Name","Students"],
        filterByFormula,
      }).eachPage(function page(records, fetchNextPage) {
        if(records.length === 0)
          return reject('no classes found');
        let data = records.map(r=>{
          let {id,fields:{Name,Students}}= r._rawJson as {createdTime:string,fields:{Name:string,Students:string[]},id:string};
          return {id,Name,Students};
        });
        resolve({data})       
        fetchNextPage();
      }, function done(err) {
        if (err) { console.error(err);reject(err); return; }
      });
  }

  );
}

