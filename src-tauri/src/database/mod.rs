use rusqlite::{Connection, Result, OpenFlags};


pub fn CreateDatabaseConnection(databasePath: &String) -> Result<Connection> {
    let flags = OpenFlags::SQLITE_OPEN_READ_WRITE | OpenFlags::SQLITE_OPEN_CREATE | OpenFlags::SQLITE_OPEN_FULL_MUTEX;

    return Connection::open_with_flags(databasePath.clone(), flags);
}