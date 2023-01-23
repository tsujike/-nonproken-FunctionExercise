function myFunction() {

  const values = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  const newValues = values[0].map((col, i) => values.map(row => row[i]))
  console.log(newValues);

}


/**
 *  TEST用関数
 * */
function myFunction_20230123_103847() {

  const values = [
    ["num1", "num2", "num3"],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  const [header, ...records] = values;

  const objRecords = records.map(record => {
    const obj = {};
    header.forEach((element, index) => obj[element] = record[index]);
    return obj;
  });

  console.log(objRecords);
  // [ { num1: 1, num2: 2, num3: 3 },
  // { num1: 4, num2: 5, num3: 6 },
  // { num1: 7, num2: 8, num3: 9 } ]


  const newValues = objRecords.map(record => Object.values(record));

  const rotedValues = newValues[0].map((col, i) => newValues.map(row => row[i]))


  console.log(rotedValues);

}


/**
 *  TEST用関数
 */
function myFunction_20230123_104617() {

  const member = { id: 1, name: "Tsujike", address: "Hokkaido" };

  //指定したプロパティで抽出する
  const filterdObject = Object.entries(member).filter(([key]) => key === 'name' || key === 'id');

  //配列をオブジェクトに変換する
  const newObj = Object.fromEntries(filterdObject);

  console.log(newObj); //{ id: 1, name: 'Tsujike' }


}


/**
 *  TEST用関数
 */
function myFunction_20230123_104618() {

  const member = { id: 1, name: "Tsujike", address: "Hokkaido" };

  //削除するプロパティを指定する
  delete member.address;

  console.log(member); //{ id: 1, name: 'Tsujike' }


}

/**
 *  TEST用関数
 */
function myFunction_20230123_211820() {

  const array = [
    { "都道府県": "北海道", "担当者": "佐藤", "田": 345, "畑": 556, "雑種地": 342 },
    { "都道府県": "北海道", "担当者": "田中", "田": 400, "畑": 200, "雑種地": 100 },
    { "都道府県": "青森県", "担当者": "伊藤", "田": 345, "畑": 556, "雑種地": 342 }
  ];

  const json = {

    // "北海道": {
    //   "担当者": {
    //     "佐藤": [
    //       { "名称": "田", "面積": 345 },
    //       { "名称": "畑", "面積": 556 },
    //       { "名称": "雑種地", "面積": 342 }
    //     ],
    //     "田中": [
    //       { "名称": "田", "面積": 400 },
    //       { "名称": "畑", "面積": 200 },
    //       { "名称": "雑種地", "面積": 100 }
    //     ]
    //   }
    // },
    // "青森県": {
    //   "担当者": {
    //     "伊藤": [
    //       { "名称": "田", "面積": 345 },
    //       { "名称": "畑", "面積": 556 },
    //       { "名称": "雑種地", "面積": 342 }
    //     ]
    //   }
    // }

  };

  array.forEach(item => {
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

  console.log(JSON.stringify(json));

}



/**
 *  TEST用関数
 * */
function myFunction_20230123_220444() {

  const json = {
    "北海道": {
      "担当者": {
        "佐藤": [
          {
            "名称": "田",
            "面積": 345
          },
          {
            "名称": "畑",
            "面積": 556
          },
          {
            "名称": "雑種地",
            "面積": 342
          }
        ],
        "田中": [
          {
            "名称": "田",
            "面積": 400
          },
          {
            "名称": "畑",
            "面積": 200
          },
          {
            "名称": "雑種地",
            "面積": 100
          }
        ]
      }
    },
    "青森県": {
      "担当者": {
        "伊藤": [
          {
            "名称": "田",
            "面積": 345
          },
          {
            "名称": "畑",
            "面積": 556
          },
          {
            "名称": "雑種地",
            "面積": 342
          }
        ]
      }
    }
  };

  const records = [];

  Object.keys(json).forEach(pref => {
    Object.keys(json[pref]["担当者"]).forEach(manager => {
      json[pref]["担当者"][manager].forEach(item => {
        records.push([pref, manager, item.名称, item.面積]);
      });
    });
  });

  console.log(records);

}
