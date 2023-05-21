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
use tstructures::project::{CreateProjectParams, ProjectLight};

use serde_json;
use serde_json::json;
use crate::app::AppState;


#[tauri::command]
pub async fn CreateAsset(state: State<'_, Mutex<AppState>>, projectUid: String) -> Result<(), String> {
    let mut _state = state.lock().unwrap();

    // let mut dbc = _state.sqliteConn.lock().unwrap().as_ref();

    let uid = Uuid::new_v4().to_string();
    let name = "My asset";
    let type_ = "image";
    let extension = "json";

    let query = format!(
        "INSERT INTO Assets (Uid, Name, Type, Extension) VALUES ('{}', '{}', '{}', '{}');",
        uid, name, type_, extension
    );

    // dbc.unwrap().execute(&query, []);

    return Ok(());
}
