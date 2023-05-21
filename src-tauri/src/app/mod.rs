use rusqlite;

use std::sync::Mutex;

use tstructures::licence::Licence;


pub struct AppState {
    pub licence: Mutex<Licence>,
    pub sqliteConn: Mutex<Option<rusqlite::Connection>>,
}

impl AppState {
    pub fn New() -> Self {
        return Self {
            licence: Mutex::new(Licence::NewFull()),
            sqliteConn: Mutex::new(None),
        };
    }

    pub fn SetSqlLiteConnection(&mut self, connection: rusqlite::Connection) {
        let mut my_lock = self.sqliteConn.lock().unwrap();
        *my_lock = Some(connection);
    }
}
