use std::fmt::format;
use std::fs;
use rusqlite::{Connection, Result, OpenFlags, params};
use uuid::Uuid;
use tstructures::assets::{TurtleAsset};
use tstructures::project::CreateAssetParamas;


pub fn CreateDatabaseConnection(databasePath: &String) -> Result<Connection> {
    let flags = OpenFlags::SQLITE_OPEN_READ_WRITE | OpenFlags::SQLITE_OPEN_CREATE | OpenFlags::SQLITE_OPEN_FULL_MUTEX;

    return Connection::open_with_flags(databasePath.clone(), flags);
}

pub fn FixProject(conn: &Connection) {
    let result = conn.execute(
        "CREATE TABLE IF NOT EXISTS Assets (
             Uid text primary key,
             Name text DEFAULT '',
             Description text DEFAULT '',
             Tags text DEFAULT '',
             Type text,
             Subtype text DEFAULT '',
             Extension text DEFAULT '',
             HasPreview integer DEFAULT 0
         );",
        [],
    );

    println!("{:?}", result);
}


pub fn UpdateAsset(dbc: &Connection, assetLight: &TurtleAsset) -> Result<()> {
    let uid = Uuid::new_v4().to_string();

    let hasPreview = if assetLight.hasPreview == true {
        1
    } else {
        0
    };

    let query = format!(
        "UPDATE Assets SET Name='{}' HasPreview={}  WHERE Uid = '{}';",
        assetLight.name,
        hasPreview,
        assetLight.uid
    );

    dbc.execute(&query, []).unwrap();

    println!("Updated Asset with uid: {}", assetLight.uid);


    return Ok(());
}

pub fn CreateAssetData(dbc: &Connection, assetUid: &String, blobData: &[u8]) -> Result<()> {
    let uid = Uuid::new_v4().to_string();

    let query = format!(
        "INSERT INTO AssetData (Uid, Data) VALUES ('{}', (?));",
        uid
    );

    dbc.execute(&query, params![blobData]).unwrap();


    return Ok(());
}