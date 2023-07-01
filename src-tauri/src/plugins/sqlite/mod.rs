use std::borrow::BorrowMut;
use std::fmt::format;
use std::fs;

use futures::lock::Mutex;

use rusqlite::{Connection, Result};
use rusqlite::ffi::sqlite3;

use uuid::{Uuid};

use tauri::{Asset, Runtime, State};
use tauri::plugin::{Builder, TauriPlugin};

use tfs;
use tstructures::project::{CreateAssetParamas, UploadAssetFileParams};


use tstructures::assets::{TurtleAsset};

use serde_json;
use serde_json::json;
use tfs::{CreateFolders, GetProjectsPath};
use crate::app::AppState;

use crate::database;


#[tauri::command]
pub async fn Exec(state: State<'_, AppState>, query: String) -> Result<(), String> {
    let dbPath = state.activeProjectDbPath.lock().unwrap().clone();

    let mut dbc = database::CreateDatabaseConnection(&dbPath).unwrap();

    let execResult = dbc.execute(&query, []);

    println!("Query {}", query);
    println!("{:?}", execResult);

    return Ok(());
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("turtle_sqlite")
        .invoke_handler(tauri::generate_handler![
            Exec
        ])
        .build()
}