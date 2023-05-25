use std::borrow::BorrowMut;
use std::fmt::format;
use std::fs;
use std::sync::Mutex;


use rusqlite::{Connection, Result};

use serde::de::Unexpected::Str;

use uuid::{Uuid};

use tauri::{Runtime, State};
use tauri::plugin::{Builder, TauriPlugin};


use tfs;
use tstructures::project::{CreateAssetParamas, ProjectLight};

use serde_json;
use serde_json::json;
use crate::app::AppState;


#[tauri::command]
pub async fn CreateAsset(state: State<'_, Mutex<AppState>>, createJson: String) -> Result<(), String> {
    let mut createParams: CreateAssetParamas = serde_json::from_str(&createJson).unwrap();

    let mut _state = state.lock().unwrap();

    let mut dbc = _state.sqliteConn.lock().unwrap().take().unwrap();

    let uid = Uuid::new_v4().to_string();
    

    let query = format!(
        "INSERT INTO Assets (Uid, Name, Type, Extension) VALUES ('{}', '{}', '{}', '{}');",
        uid, createParams.uid, createParams.assetType, createParams.extension
    );

    dbc.execute(&query, []).unwrap();


    return Ok(());
}


pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("turtle_assets")
        .invoke_handler(tauri::generate_handler![
            CreateAsset,
        ])
        .build()
}