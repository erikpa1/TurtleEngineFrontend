use rusqlite;
use std::collections::HashMap;

use std::sync::{Arc, Mutex};

use serde_json::{json, Value};

use tstructures::licence::Licence;

pub struct AppStateMut {
    pub activeProjectFolder: String,
    pub activeProjectPath: String,
    pub activeProject: Value,
}

impl AppStateMut {
    pub fn New() -> Self {
        return Self {
            activeProject: json!({}),
            activeProjectPath: "".into(),
            activeProjectFolder: "".into(),
        };
    }
}
