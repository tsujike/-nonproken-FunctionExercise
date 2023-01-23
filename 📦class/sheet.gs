/** Dataシートクラス */
class DataSheet {

  /** コンストラクタ */
  constructor() {
    this.id = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");　//global.gsに定義しています
    this.sheetName = '筋肉先輩からのお題';
    this.sheet = SpreadsheetApp.openById(this.id).getSheetByName(this.sheetName);
  }

  /** すべてのRecordsをオブジェクトレコーズで取得するメソッド
   * @return{Array} objRecords
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


  /** 商品名テーブルの商品ID列を取得するメソッド
   * @return{Array}
   */
  getItemNameColumn_() {
    const data = this.getDataSheetRecords();
    const ids = data.map(record => { return record["商品ID"] });

    //空白セルが入ってることがあるっぽい
    const itemNameColum = ids.filter(id => id !== "");

    return itemNameColum
  }


  /** 受け取った2次元配列をシートに上書きする 
  * @param{array} Records
  */
  setRecords_(records) {
    this.sheet.getRange(2, 12, records.length, records[0].length).setValues(records);
    return 'Dataシートに書き込み完了しました';
  }

  /** 商品名テーブルの商品名を埋めた2次元配列を返すメソッド
  * @return{array} 商品名を含む2次元配列
  */
  getResultItemNameTable_() {

    //商品ID列
    const ids = this.getItemNameColumn_()

    //全レコード
    const table = this.getDataSheetRecords();

    //商品ID列を回しながら、全レコードから商品名テーブルを完成させる
    ids.forEach((id, index) => table[index]["商品名"] = this.getItemName_(id));

    //商品名テーブルのみを返す
    const itemNamesTable = table.map(record => { return [record["商品ID"], record["商品名"]] })
    return itemNamesTable;
  }


  /** 商品IDを渡すと、商品名を返すメソッド
   * @param{string} 商品ID 
  * @return{string} 商品名
  */
  getItemName_(itemId) {
    const filteredRecord = this.getDataSheetRecords().filter(record => record["商品IDマスタ"] === itemId)[0]; //1件しかヒットしない
    return filteredRecord["商品名マスタ"];
  }


  /** オブジェクトレコーズの横持ちデータを受け取ると、縦持ちデータに変換（いわゆるJSON）で返すメソッド
   * @param{array} Records
   * @return{object} JSON 
   */
  getJson(objRecords) {

    const json = {};

    objRecords.forEach(item => {
      if (!json[item["都道府県"]]) {
        json[item["都道府県"]] = { "担当者": {} };
      }
      if (!json[item["都道府県"]]["担当者"][item["担当者"]]) {
        json[item["都道府県"]]["担当者"][item["担当者"]] = [];
      }
      json[item["都道府県"]]["担当者"][item["担当者"]].push({ "名称": "田", "面積": item["田"] });
      json[item["都道府県"]]["担当者"][item["担当者"]].push({ "名称": "畑", "面積": item["畑"] });
      json[item["都道府県"]]["担当者"][item["担当者"]].push({ "名称": "雑種地", "面積": item["雑種地"] });
    });

    return json
  }


  /** JSONを2次元配列に変換するメソッド
   * @param{object} JSON
   * @return{array} 2次元配列
   */
  get2dArray(json) {

    const records = [];

    Object.keys(json).forEach(pref => {
      Object.keys(json[pref]["担当者"]).forEach(manager => {
        json[pref]["担当者"][manager].forEach(item => {
          records.push([pref, manager, item.名称, item.面積]);
        });
      });
    });

    return records
  }


}



/** TEST関数 */
function testDataSheet() {

  //Dataシートの・・・
  const d = new DataSheet();

  //全てのRecordsをオブジェクトレコーズで取得する
  const records = d.getDataSheetRecords();
  // console.log(d.getDataSheetRecords());

  //商品マスタを取得する
  // const masterTableObjRecords = d.getMasterTable();
  // console.log(masterTableObjRecords);

  //商品IDを渡すと、商品名を返す
  // const itemId = "Z002";
  // console.log(d.getItemName_(itemId));

  //商品名テーブルの商品名を埋めたものを返す
  // console.log(d.getResultItemNameTable_());

  //商品名テーブルを受け取ってシートに上書きする 
  // const itemNamesTable = d.getResultItemNameTable_();
  // console.log(d.setRecords_(itemNamesTable));

  //横持ちデータを縦持ちに変換する
  const json = d.getJson(records);

  //JSONを2次元配列に変換する
  const values = d.get2dArray(json);
  d.setRecords_(values);

}