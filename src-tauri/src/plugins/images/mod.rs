mod imops;

use std::borrow::BorrowMut;
use std::fmt::format;
use std::{fs, result};
use std::sync::Mutex;


use rusqlite::{Connection};


use uuid::{Uuid};

use tauri::{Runtime, State};
use tauri::plugin::{Builder, TauriPlugin};


use tfs;
use tstructures::project::{CreateProjectParams, ProjectLight};

use serde_json;
use serde_json::json;

use crate::database;

use crate::app::{AppState, DbTest};
use crate::database::FixProject;


#[tauri::command]
async fn CreatePreview(sourcePath: String, targetPath: String, width: u32) -> bool {
    println!("Creating thumbnail:");
    println!("From: {}", &sourcePath);
    println!("To: {}", &targetPath);

    imops::CreateThumbnail(&sourcePath, &targetPath, width);

    return true;
}


pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("turtle_images")
        .invoke_handler(tauri::generate_handler![
            CreatePreview,
        ])
        .build()
}