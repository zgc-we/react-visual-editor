import { message } from 'antd';

let db: any;
export const initDB = (dbName: string, dbTable: string, dbTableConfig: any, tableIndexs: any, version?: number) => {
  // 生成 indexedDB 数据库
  let dbRequest = window.indexedDB.open(dbName, version);
  // 事件的监听函数,后续操作都在这里操作
  dbRequest.onupgradeneeded = (event: any) => {
    db = event.target.result; // db 返回值
    if (dbTable && !db.objectStoreNames.contains(dbTable)) {
      // 创建新建对象仓库（即新建表）
      let objectStore = db.createObjectStore(dbTable, dbTableConfig);
      for (let { name, keyPath, options } of tableIndexs) {
        // 参数名称、索引所在的属性
        objectStore.createIndex(name, keyPath, options);
      }
    }
  };
  // 成功
  dbRequest.onsuccess = () => {
    db = dbRequest.result;
  };
  // 失败
  dbRequest.onerror = function (event) { 
    console.log("数据库报错：", event);
  };
};

export const addTemplates = (payload: any, resolve: any) => {
  const { img, name, config } = payload;
  // templates 读取表中数据，添加数据
  const addRequest = db.transaction(['templates'], 'readwrite')
    .objectStore('templates')
    .add({ img, name, config });
  addRequest.onsuccess = () => {
    resolve();
    message.success('模板数据保存成功！');
  };
};

export const getTemplates = (resolve: any) => {
  // templates 读取数据，遍历数据
  const getRequest = db.transaction(['templates'], 'readonly')
    .objectStore('templates')
    .openCursor(null, 'next');
  let templateInfos: any[] = [];
  getRequest.onsuccess = (event: any) => {
    let cursor = event.target.result;
    // 读取数据，对数据做判读分别处理
    if (cursor) {
      templateInfos.push({ id: cursor.key, ...cursor.value });
      cursor.continue();
    } else {
      resolve(templateInfos);
    }
  };

};


export const deleteTemplate = (id: string, resolve: any) => {
  // templates 读取数据，遍历数据,删除 id 该条数据
  const deleteRequest = db.transaction(['templates'], 'readwrite')
    .objectStore('templates')
    .delete(id);
  // 成功之后操作
  deleteRequest.onsuccess = () => {
    resolve();
    message.success('模板删除成功！');
  };


};

export const searchTemplate = (value: string, resolve: any) => {
  // 获取值查询数据库
  const searchRequest = db.transaction(['templates'], 'readonly')
    .objectStore('templates')
    .index('name')
    .get(value);
  // 查询完之后，返回数据
  searchRequest.onsuccess = (event: any) => {
    resolve(event.target.result);
  };

};
