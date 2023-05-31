use std::borrow::BorrowMut;
use std::fmt::format;
use std::fs;

use futures::lock::Mutex;

use rusqlite::{Connection, Result};
use rusqlite::ffi::sqlite3;

use uuid::{Uuid};

use tauri::{Runtime, State};
use tauri::plugin::{Builder, TauriPlugin};

use tfs;
use tstructures::project::{CreateAssetParamas};


use tstructures::assets::AssetParentLight;

use serde_json;
use serde_json::json;
use crate::app::AppState;

use crate::database;


#[tauri::command]
pub async fn CreateAsset(state: State<'_, AppState>, createJson: String) -> Result<(), String> {
    println!("{}", &createJson);

    let mut createParams: CreateAssetParamas = serde_json::from_str(&createJson).unwrap();

    let dbPath = state.activeProjectDbPath.lock().unwrap().clone();
    // let mut dbc = state.sqliteConn.lock().unwrap().take().unwrap();

    println!("Database path: {}", &dbPath);

    let mut dbc = database::CreateDatabaseConnection(&dbPath).unwrap();

    let uid = Uuid::new_v4().to_string();

    let query = format!(
        "INSERT INTO Assets (Uid, Name, Type, Extension) VALUES ('{}', '{}', '{}', '{}');",
        uid, createParams.name, createParams.assetType, createParams.extension
    );

    dbc.execute(&query, []).unwrap();

    return Ok(());
}

#[tauri::command]
pub fn GetAllAssetsOfType(state: State<'_, AppState>, project_uid: String, asset_type: String) -> Result<String, ()> {
    // let mapLock = state.test.lock().unwrap();
    // let map = mapLock.as_mut().unwrap();
    //
    // map.insert("Test".into(), "value".into());
    //
    let dbPath = state.activeProjectDbPath.lock().unwrap().clone();
    let mut dbc = database::CreateDatabaseConnection(&dbPath).unwrap();

    println!("Selecting from assets with type: {}", asset_type);

    let query = format!(
        "SELECT Uid, Name, Type from Assets WHERE Type='{}'", asset_type
    );

    let mut statement = dbc.prepare(&query).unwrap();

    let rows_iter = statement.query_map([], |row| {
        println!("Row: {:?}", row);

        let mut tmp = AssetParentLight::New();

        tmp.uid = row.get(0).unwrap_or("".into());
        tmp.name = row.get(1).unwrap_or("".into());
        tmp.assetType = row.get(2).unwrap_or("".into());

        return Ok(tmp);
    }).unwrap();


    let mut result: Vec<AssetParentLight> = vec![];

    for myRow in rows_iter {
        if let Ok(lightAsset) = myRow {
            result.push(lightAsset);
        }
    }

    let resultValue = json!({"assets": result});

    let resString = serde_json::to_string(&resultValue)
        .unwrap_or("\"assets\": []".into());

    return Ok(resString);
}


pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("turtle_assets")
        .invoke_handler(tauri::generate_handler![
            CreateAsset,
            GetAllAssetsOfType
        ])
        .build()
}