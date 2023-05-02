use rusqlite::{Connection, Result};


use tauri::{Runtime};
use tauri::plugin::{Builder, TauriPlugin};


#[tauri::command]
fn SaveProject(projectJson: &str) -> String {
    println!("Creating project");

    let connRes = Connection::open("cats.db");

    if let Ok(conn) = connRes {
        conn.execute(
            "create table if not exists cat_colors (
             id integer primary key,
             name text not null unique
         )",
            [],
        );
    }


    return String::from("success");
}


pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("turtle_projects")
        .invoke_handler(tauri::generate_handler![
            SaveProject,
        ])
        .build()
}