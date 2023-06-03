use std::collections::HashMap;
use rusqlite;


use std::sync::{Arc, Mutex};

use tstructures::licence::Licence;


pub struct AppState {
    pub licence: Arc<Mutex<Licence>>,
    pub sqliteConn: Arc<Mutex<Option<rusqlite::Connection>>>,
    pub activeProjectUid: Arc<Mutex<String>>,
    pub activeProjectDbPath: Arc<Mutex<String>>,
    pub test: Arc<Mutex<HashMap<String, String>>>,
}

impl AppState {
    pub fn New() -> Self {
        return Self {
            licence: Arc::new(Mutex::new(Licence::NewFull())),
            sqliteConn: Arc::new(Mutex::new(None)),
            activeProjectUid: Arc::new(Mutex::new("".into())),
            activeProjectDbPath: Arc::new(Mutex::new("".into())),
            test: Arc::new(Mutex::new(HashMap::new())),
        };
    }

    pub fn SetSqlLiteConnection(&self, connection: rusqlite::Connection) {
        let mut my_lock = self.sqliteConn.lock().unwrap();

        *my_lock = Some(connection);
    }


    pub fn SetActiveProjectUid(&self, project: String) {
        let mut my_lock = self.activeProjectUid.lock().unwrap();
        *my_lock = project;
    }

    pub fn SetActiveProjectDbPah(&self, project: String) {
        let mut my_lock = self.activeProjectDbPath.lock().unwrap();
        *my_lock = project;
    }
}

#[derive(Default)]
pub struct DbTest {
    pub mapMutex: Arc<Mutex<HashMap<String, String>>>,
}
