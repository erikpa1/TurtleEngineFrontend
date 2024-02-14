extern crate core;

use std::collections::HashSet;
use std::fmt::format;
use std::fs;
use std::fs::File;
use std::os::windows::fs::MetadataExt;
use std::path::{Component, Path, PathBuf};
use std::{default, env};

use serde::de::DeserializeOwned;

use serde::{Deserialize, Serialize};
use serde_json::{json, Error, Value};

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

pub fn GetGetTypedJson<T>(path: &str) -> Option<T>
where
    T: DeserializeOwned,
{
    if let Ok(json_string) = fs::read_to_string(path) {
        if let Ok(value) = serde_json::from_str(&json_string) {
            return Some(value);
        } else {
            println!("Unable to deserialize: {}", json_string);
        }
    } else {
        println!("Unable to load file: {}", path);
    }
    None
}

pub fn SaveJson(path: &String, jObj: &Value) {
    if let Some(parent) = Path::new(path).parent() {
        let parent_path = String::from(parent.to_str().unwrap());
        CreateFolders(&parent_path);

        let string_json = serde_json::to_string(&jObj).unwrap();

        println!("Saving json to: {}", path);
        println!("Json to: {}", &string_json);

        fs::write(path, string_json);
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

pub fn FolderEmpty(folder: &impl AsRef<Path>) -> bool {
    if let Ok(entries) = fs::read_dir(folder) {
        return entries.count() == 0;
    }
    false
}

pub fn FindFilesWithExtension(
    folder: &impl AsRef<Path>,
    extension: &String,
    is_recursive: bool,
) -> Vec<String> {
    let mut result: Vec<String> = vec![];

    _FindFilesWithExtension(folder, extension, is_recursive, &mut result);

    return result;
}

fn _FindFilesWithExtension(
    folder: &impl AsRef<Path>,
    searched_extension: &String,
    is_recursive: bool,
    result: &mut Vec<String>,
) {
    let read_dir_r = fs::read_dir(folder);

    if let Ok(read_dir) = read_dir_r {
        for path in read_dir {
            if let Ok(entry) = path {
                let entry_path = entry.path();

                if entry_path.is_file() {
                    if let Some(file_extension_osstr) = entry_path.extension() {
                        let file_extension: String =
                            file_extension_osstr.to_string_lossy().to_string();

                        if searched_extension.to_lowercase() == file_extension.to_lowercase() {
                            let string_path = entry_path.to_string_lossy().to_string();
                            result.push(string_path);
                        }
                    }
                } else {
                    if is_recursive {
                        _FindFilesWithExtension(
                            &entry.path(),
                            searched_extension,
                            is_recursive,
                            result,
                        )
                    }
                }
            }
        }
    } else {
        if let Result::Err(err) = read_dir_r {
            print!("{}", err)
        }
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
    let mut folderPath = Path::new(&path);

    if folderPath.is_file() {
        folderPath = folderPath.parent().unwrap();
    }

    if folderPath.exists() == false {
        println!("Creating folder: {}", folderPath.to_str().unwrap());
        println!("{:?}", fs::create_dir_all(folderPath));
    }
}

pub fn CheckProjectExistenceAndValidity(projectPath: &String) -> bool {
    let lPathString = format!("{}project_light.json", &projectPath);
    let dbPathString = format!("{}project.db", &projectPath);

    let lightPath = Path::new(&lPathString);
    let dbPath = Path::new(&dbPathString);

    return (lightPath.exists() && lightPath.is_file()) && (dbPath.exists() && dbPath.is_file());
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

#[derive(Serialize, Deserialize)]
pub struct FileWithMeta {
    #[serde(default)]
    pub name: String,

    #[serde(default)]
    pub extension: String,

    #[serde(default)]
    pub is_file: bool,

    #[serde(default)]
    pub path: String,

    #[serde(default)]
    pub modified_at: u64,

    #[serde(default)]
    pub created_at: u64,

    #[serde(default)]
    pub full_path: String,
}

impl FileWithMeta {
    pub fn new() -> Self {
        FileWithMeta {
            name: "".into(),
            extension: "".into(),
            path: "".into(),
            is_file: false,
            modified_at: 0,
            created_at: 0,
            full_path: "".into(),
        }
    }
}

pub fn ListFilesWithMetadata(
    folder: &impl AsRef<Path>,
    extensions: &HashSet<String>,
    recursive: bool,
) -> Vec<FileWithMeta> {
    let mut folders: Vec<FileWithMeta> = Vec::new();
    _ListFilesWithMetadata(folder, &mut folders, extensions, recursive);
    return folders;
}

pub fn _ListFilesWithMetadata(
    folder: &impl AsRef<Path>,
    buffer: &mut Vec<FileWithMeta>,
    extensions: &HashSet<String>,
    recursive: bool,
) {
    if let Ok(entries) = fs::read_dir(folder) {
        for entry in entries {
            if let Ok(entry) = entry {
                if let Ok(file_type) = entry.file_type() {
                    let mut data = FileWithMeta::new();
                    data.is_file = file_type.is_file();

                    let file_folder = folder.as_ref().to_string_lossy().to_string();
                    let file_path = entry.path().to_string_lossy().to_string();

                    let mut extension = String::from("");

                    if (file_type.is_file()) {
                        extension = entry
                            .path()
                            .extension()
                            .unwrap()
                            .to_string_lossy()
                            .to_string();
                    }

                    data.extension = extension.to_lowercase();

                    data.path = file_path.replace(&file_folder, "");
                    data.full_path = file_path.clone();

                    if let Ok(meta) = entry.metadata() {
                        data.created_at = meta.creation_time();
                        data.modified_at = meta.last_write_time();
                    }

                    if let Ok(file_name) = entry.file_name().into_string() {
                        data.name = file_name;
                    }

                    if extensions.len() == 0 {
                        buffer.push(data);
                    } else {

                        if extensions.contains(&data.extension) {
                            buffer.push(data);
                        }
                    }

                    if file_type.is_dir() {
                        _ListFilesWithMetadata(&entry.path(), buffer, extensions, recursive);
                    }
                }
            }
        }
    }
}
