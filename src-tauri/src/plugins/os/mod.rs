use std::fs;
use tauri::{Asset, Runtime, State};
use tauri::plugin::{Builder, TauriPlugin};

use std::process::Command;

use tfs;

use crate::app::AppState;

#[tauri::command]
pub async fn OpenFolder(folder: String) -> Result<String, ()> {

    //Linux Command::new( "xdg-open" )
    //MacOs Command::new( "xdg-open" )

    Command::new("explorer")
        .arg(folder)
        .spawn()
        .unwrap();

    return Ok("{}".into());
}

#[tauri::command]
pub async fn DeleteFolder(folder: String) -> Result<bool, ()> {
    println!("Deleting folder: {}", folder);
    fs::remove_dir_all(folder);
    return Ok(true);
}


#[tauri::command]
pub async fn WriteFileString(file: String, content: String) -> Result<bool, ()> {
    println!("Writting to file: {}", file);
    fs::write(&file, content);
    return Ok(true);
}


#[tauri::command]
pub async fn GetWorkingDirectory() -> Result<String, ()> {
    let path = tfs::GetWorkingDirectory();
    return Ok(path);
}


pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("turtle_os")
        .invoke_handler(tauri::generate_handler![
                OpenFolder,
                DeleteFolder,
                WriteFileString,
                GetWorkingDirectory
        ])
        .build()
}