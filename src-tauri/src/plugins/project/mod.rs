use std::fmt::format;
use rusqlite::{Connection, Result};

use uuid::{Uuid};

use tauri::{Runtime};
use tauri::plugin::{Builder, TauriPlugin};


use tfs;


#[tauri::command]
fn CreateProject(projectJson: &str) -> String {
    let projectUid = Uuid::new_v4().to_string();

    let dbPath = format!("{}/../projects/{}/project.db", tfs::GetExePath(), projectUid);

    tfs::CreateFolders(&dbPath);

    println!("Creating project");

    let connRes = Connection::open(dbPath.clone());

    if let Ok(conn) = connRes {
        conn.execute(
            "CREATE TABLE IF NOT EXISTS Spots (
             Uid text primary key,
             name text,
             type text
         )",
            [],
        );
    }


    return String::from("success");
}


pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("turtle_projects")
        .invoke_handler(tauri::generate_handler![
            CreateProject,
        ])
        .build()
}