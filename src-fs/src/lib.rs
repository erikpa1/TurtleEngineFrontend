extern crate core;

use std::env;
use std::fmt::format;
use std::fs;
use std::fs::File;
use std::path::{Component, Path, PathBuf};

use serde_json::{json, Value};

pub fn Exists(path: &String) -> bool {
    return Path::new(path).exists();
}

pub fn GetJson(path: &String) -> Option<Value> {
    let read_r = fs::read_to_string(path);

    if let Ok(json_string) = read_r {
        let val_r = serde_json::from_str(&json_string);

        if let Ok(value) = val_r {
            return Some(value);
        } else {
            println!("Unable to deparse: {}", &json_string);
        }

        return None;
    } else {
        println!("Unable to load file: {}", path);
    }
    return None;
}

pub fn SaveJson(path: &String, jObj: &Value) {
    if let Some(parent) = Path::new(path).parent() {
        let parent_path = String::from(parent.to_str().unwrap());
        CreateFolders(&parent_path);

        fs::write(
            path,
            serde_json::to_string(&jObj).unwrap(),
        );
        
    } else {
        println!("Unable to write to: {}", path);
    }
}

pub fn GetAppData() -> String {
    if let Ok(local_appdata) = env::var("LOCALAPPDATA") {
        return local_appdata;
    } else {
        return String::from("");
    }
}

pub fn GetExePath() -> String {
    let path_r = env::current_exe();

    if let Ok(path) = path_r {
        let parentPathOption = path.parent();
        return parentPathOption.unwrap().to_str().unwrap().into();
    }

    return "".into();
}

pub fn GetProjectsPath() -> String {
    let original_path = format!("{}\\..\\projects\\", &GetExePath());
    // Create a PathBuf from the original path
    let mut path_buf = PathBuf::from(&original_path);

    let canonical_path = NormalizePath(&path_buf);

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

pub fn NormalizePath(path: &Path) -> PathBuf {
    let mut components = path.components().peekable();
    let mut ret = if let Some(c @ Component::Prefix(..)) = components.peek().cloned() {
        components.next();
        PathBuf::from(c.as_os_str())
    } else {
        PathBuf::new()
    };

    for component in components {
        match component {
            Component::Prefix(..) => unreachable!(),
            Component::RootDir => {
                ret.push(component.as_os_str());
            }
            Component::CurDir => {}
            Component::ParentDir => {
                ret.pop();
            }
            Component::Normal(c) => {
                ret.push(c);
            }
        }
    }
    ret
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
