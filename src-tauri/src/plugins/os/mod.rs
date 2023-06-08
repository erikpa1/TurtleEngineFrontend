use tauri::{Asset, Runtime, State};
use tauri::plugin::{Builder, TauriPlugin};

use std::process::Command;

use crate::app::AppState;

#[tauri::command]
pub async fn OpenFolder(folder: String) -> Result<String, ()> {

    //Linux Command::new( "xdg-open" )
    //MacOs Command::new( "xdg-open" )
    //MacOs Command::new( "xdg-open" )

    Command::new("explorer")
        .arg(folder)
        .spawn()
        .unwrap();

    return Ok("{}".into());
}


pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("turtle_os")
        .invoke_handler(tauri::generate_handler![
                OpenFolder
        ])
        .build()
}