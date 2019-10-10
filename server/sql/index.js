const sql = "SELECT * FROM `bgy_ap_payables_header` WHERE `HEADER_ID` = '1'";
const sql1 = "SELECT * FROM `runoob_tbl`";
const sql2 = `
select * from information_schema.columns
where table_schema = 'study'
and table_name = 'study_table' ;`;

module.exports = {
  sql,
  sql1,
  sql2
};
