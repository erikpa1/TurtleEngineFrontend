extern crate core;

use std::env;
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

pub fn CreateFolders(path: &String) {
    let folderPath = Path::new(&path);

    if folderPath.exists() == false {
        if let Ok(_) = fs::create_dir_all(folderPath.parent().unwrap()) {}
    }
}