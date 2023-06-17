extern crate core;

use std::env;
use std::fmt::format;
use std::fs;
use std::fs::{File};
use std::path::{Path, PathBuf};


pub fn GetExePath() -> String {
    let pathR = env::current_exe();

    if let Ok(path) = pathR {
        let parentPathOption = path.parent();
        return parentPathOption.unwrap().to_str().unwrap().into();
    }

    return "".into();
}

pub fn GetProjectsPath() -> String {
    let original_path = format!("{}/../projects/", GetExePath());
    // Create a PathBuf from the original path
    let mut path_buf = PathBuf::from(original_path);

    let canonical_path = match path_buf.canonicalize() {
        Ok(path) => path,
        Err(err) => {
            println!("Failed to canonicalize path: {}", err);
            return "".into();
        }
    };

    let final_path = match canonical_path.to_str() {
        Some(path_str) => path_str.to_string(),
        None => {
            println!("Failed to convert path to string");
            return "".into();
        }
    };

    let result = format!("{}\\", &final_path);

    let path_without_prefix = match result.strip_prefix(r"\\?\") {
        Some(stripped_path) => stripped_path,
        None => &result, // Prefix not found, use original path
    };

    return path_without_prefix.into();
}


pub fn GetWorkingDirectory() -> String {
    let original_path = format!("{}/../", GetExePath());
    // Create a PathBuf from the original path
    let mut path_buf = PathBuf::from(original_path);

    let canonical_path = match path_buf.canonicalize() {
        Ok(path) => path,
        Err(err) => {
            println!("Failed to canonicalize path: {}", err);
            return "".into();
        }
    };

    let final_path = match canonical_path.to_str() {
        Some(path_str) => path_str.to_string(),
        None => {
            println!("Failed to convert path to string");
            return "".into();
        }
    };

    let result = format!("{}\\", &final_path);

    let path_without_prefix = match result.strip_prefix(r"\\?\") {
        Some(stripped_path) => stripped_path,
        None => &result, // Prefix not found, use original path
    };

    return path_without_prefix.into();
}

pub fn CreateFolders(path: &String) {
    let folderPath = Path::new(&path);

    if folderPath.exists() == false {
        println!("Creating folder: {}", folderPath.to_str().unwrap());
        println!("{:?}", fs::create_dir_all(folderPath));
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
                            folders.push(format!("{}{}\\", path, file_name))
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

pub fn DeleteFolder(path: &String) {
    if let Ok(status) = fs::remove_dir_all(Path::new(path)) {
        println!("Success to remove file: {}", path);
    } else {
        println!("Failed to remove file: {}", path);
    }
}