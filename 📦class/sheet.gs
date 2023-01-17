/** Dataシートクラス */
class DataSheet {

  /** コンストラクタ */
  constructor() {
    this.id = SHEET_ID;　//global.gsに定義しています
    this.sheetName = 'Data';
    this.sheet = SpreadsheetApp.openById(this.id).getSheetByName(this.sheetName);
  }

  /** すべてのRecordsをdictsMapsで取得するメソッド
   * @return{Array} objArray
   */
  getDataSheetRecords() {
    const [header, ...records] = this.sheet.getDataRange().getValues();

    const objectRecords = records.map(record => {
      const obj = {};
      header.forEach((element, index) => obj[element] = record[index]);
      return obj;
    });

    return objectRecords;
  }


/** starのついていないRecordだけを取得するメソッド */
  getRecordWithoutStar() {
    const record = this.getDataSheetRecords().filter(record => record['star'] !== '★');
    return record;
  }


  /** recordをSTAR済みにしてDataシートを更新するメソッド */
  setStarToDataSheetRecord() {

    //すべてのrecordsを取得
    const objectRecords = this.getDataSheetRecords();

    //スターでフィルター掛け
    const withoutStarRecords = objectRecords.filter(record => record['star'] !== '★');

    //スターを付ける
    withoutStarRecords.map(record => {
      record['star'] = '★';
      return record;
    });

    //Dataシートに貼り付け
    this.setAllRecords_(objectRecords);

    return "Dataシートに引数を渡しました";

  }


  /** 受け取ったdictsMapsをシートに上書きする 
    * @param{Array} objectRecords
    */
  setAllRecords_(objectRecords) {

    //2次元配列に戻す
    const records = objectRecords.map(record => Object.values(record));

    //貼り付け    
    this.sheet.getRange(2, 1, records.length, records[0].length).setValues(records);
    return 'Dataシートに書き込み完了しました';

  }


  /** シートのクリア(単独で走らせたら危ないので、必ずプライベート化して、setAllRecords()などに組み込む) */
  sheetClear_() {
    const lastRow = this.sheet.getLastRow();
    const lastColumn = this.sheet.getLastColumn();
    const range = this.sheet.getRange(2, 1, lastRow, lastColumn);
    range.clear();
    return 'シートをクリアしました';
  }


}



/** TEST関数 */
function testDataSheet() {

  //Dataシートの・・・
  const d = new DataSheet();

  //全てのRecordsをdictsMapsで取得する
  const records = d.getDataSheetRecords();
  // console.log(d.getDataSheetRecords());

  //starのついていないRecordだけをobjectRecordsで取得する（1件のはず）
  const record = d.getRecordWithoutStar();
  // console.log(d.getRecordWithoutStar());

  // すべてのRecordsにStarをつけて更新するメソッド
  console.log(d.setStarToDataSheetRecord());

  //シートのクリア sheetClear()　単独では呼ばない
  // console.log(d.sheetClear_());

}