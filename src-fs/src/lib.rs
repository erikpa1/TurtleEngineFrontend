extern crate core;

use std::env;
use std::fmt::format;
use std::fs;
use std::fs::{File};
use std::path::Path;


pub fn GetExePath() -> String {
    let pathR = env::current_exe();

    if let Ok(path) = pathR {
        let parentPathOption = path.parent();
        return parentPathOption.unwrap().to_str().unwrap().into();
    }

    return "".into();
}

pub fn GetProjectsPath() -> String {
    return format!("{}/../projects/", GetExePath());
}

pub fn CreateFolders(path: &String) {
    let folderPath = Path::new(&path);

    if folderPath.exists() == false {
        if let Ok(_) = fs::create_dir_all(folderPath.parent().unwrap()) {}
    }
}

pub fn ListFolders(path: &String) -> Vec<String> {
    let mut folders: Vec<String> = Vec::new();

    if let Ok(entries) = fs::read_dir(path) {
        for entry in entries {
            if let Ok(entry) = entry {
                if let Ok(file_type) = entry.file_type() {
                    if file_type.is_dir() {
                        if let Ok(file_name) = entry.file_name().into_string() {
                            folders.push(format!("{}{}/", path, file_name))
                        }
                    }
                }
            }
        }
    }

    return folders;
}

pub fn CheckProjectExistenceAndValidity(projectPath: &String) -> bool {
    let lPathString = format!("{}project_light.json", &projectPath);
    let dbPathString = format!("{}project.db", &projectPath);

    let lightPath = Path::new(&lPathString);
    let dbPath = Path::new(&dbPathString);

    return ((lightPath.exists() && lightPath.is_file()) && (dbPath.exists() && dbPath.is_file()));
}

pub fn FileToString(filePath: &String) -> String {
    if let Ok(contents) = fs::read_to_string(filePath) {
        return contents;
    } else {
        return "".into();
    }
}