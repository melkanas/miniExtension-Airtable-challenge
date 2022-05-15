import Airtable from "airtable";

const AIRTABLE_API_KEY = "keyHj4aTbVnT1qwiv";
const BASE_ID = "app8ZbcPx7dkpOnP0";
const schoolBase = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(BASE_ID);

const TABLES = {
  CLASS_TABLE: {
    ID: "tblgh8YARZPqeJF07",
    FIELDS: {
      Name: {id:"fldkSRh4WHOHOyYLf",fieldName:"Name"},
      Students: {id:"fld1TImr7nucL2tGJ",fieldName:"Students"},
    },
  },
  STUDENT_TABLE: {
    ID: "tblIzakozsIHPiZnI",
    FIELDS: {
      Name: {id:"fld5ckhQnYC5iGlRR",fieldName:"Name"},
      Classes:{id:"fldc8Tyl8YheKW6Xp",fieldName:"Classes"},
    },
  },
};
export { schoolBase, TABLES };
