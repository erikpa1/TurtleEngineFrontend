use std::fs;

use tauri::{Asset, Runtime, State};
use tauri::plugin::{Builder, TauriPlugin};

use std::process::Command;
use std::path::Path;


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
pub async fn FileExists(file: String) -> Result<String, ()> {
    let file_exists = fs::metadata(file).is_ok();

    if file_exists {
        return Ok("true".into());
    } else {
        return Ok("false".into());
    }
}


#[tauri::command]
pub async fn WriteFileString(file: String, content: String) -> Result<bool, ()> {
    println!("Writting to file: {}", file);

    let path = Path::new(&file);

    let folderPath: String = String::from(path.parent().unwrap().to_str().unwrap());

    tfs::CreateFolders(&folderPath);

    fs::write(&file, content);
    return Ok(true);
}

#[tauri::command]
pub async fn ReadFileString(file: String) -> Result<String, String> {
    println!("Reading file from: {}", file);

    let streamResult = fs::read(&file);

    if let Ok(fileContent) = streamResult {
        let result = String::from_utf8(fileContent).unwrap_or("".into());

        return Ok(result);
    } else {
        println!("{:?}", &file);
        return Result::Err("404".into());
    }
}

#[tauri::command]
pub async fn CopyFile(from_path: String, to_path: String) -> Result<bool, String> {
    println!("Copying file from: {}", &from_path);
    println!("To: {}", &to_path);

    let path = Path::new(&to_path);

    let folderPath: String = String::from(path.parent().unwrap().to_str().unwrap());

    tfs::CreateFolders(&folderPath);

    fs::copy(&from_path, &to_path);

    Ok(true)
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
                CopyFile,
                WriteFileString,
                FileExists,
                ReadFileString,
                GetWorkingDirectory
        ])
        .build()
}