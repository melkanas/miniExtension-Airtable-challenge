import { student } from "./studentsSlice";
import { schoolBase, TABLES } from "../../app/airtableAPI";
// A mock function to mimic making an async request for data
export function fetchStudent(name:string) {
  return new Promise<{ data: student & {Classes:string[]}}>((resolve,reject) =>{
    schoolBase('Students').select({
      fields: ["Name","Classes"],
      filterByFormula:`{Name}='${name}'`,
    }).eachPage(function page(records, fetchNextPage) {
      if(records.length === 0)
        return reject('no student with this name in db');
      let {id,fields:{Name,Classes}} = records[0]._rawJson as {createdTime:string,fields:{Classes:string[],Name:string},id:string};
      let data = {id,Name,Classes};
      resolve({data})
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error("api error");reject(err); return; }
    });
  }

  );
}

export function fetchStudentsWithIds(ids:string[] = []) {
  let filterByFormula="OR("+ids.reduce((acc,curr,Index)=>{
    let comma = (Index === (ids.length-1))? "":",";
    acc += `RECORD_ID()='${curr}'`+comma;
    return acc;
  },"")+")";
  return new Promise<{ data: Array<student & {Classes:string[]}> }>((resolve,reject) =>{
    schoolBase(TABLES.STUDENT_TABLE.ID).select({
        fields: ["Name","Classes"],
        filterByFormula,
      }).eachPage(function page(records, fetchNextPage) {
        if(records.length === 0)
            return reject('no students found');
        let data = records.map(r=>{
          let {id,fields:{Name,Classes}}= r._rawJson as {createdTime:string,fields:{Name:string,Classes:string[]},id:string};
          return {id,Name,Classes};
        });
        resolve({data})       
        fetchNextPage();
      }, function done(err) {
        if (err) { console.error(err);reject(err); return; }
      });
  }

  );
}





