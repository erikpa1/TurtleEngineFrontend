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

    // let mut dbc = state.sqliteConn.lock().unwrap();
    //
    // let query = format!(
    //     "SELECT * from Assets WHERE Type='{}'", asset_type
    // );
    //
    // let mut statement = dbc.prepare(&query).unwrap();
    //
    // let rows = statement.query_map([], |row| {
    //     println!("Row: {:?}", row);
    //
    //     return Ok(());
    // });

    return Ok("[]".into());
}


pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("turtle_assets")
        .invoke_handler(tauri::generate_handler![
            CreateAsset,
            GetAllAssetsOfType
        ])
        .build()
}