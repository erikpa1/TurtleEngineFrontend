use std::fmt::format;
use std::fs;
use rusqlite::{Connection, Result, OpenFlags, params};
use uuid::Uuid;
use tstructures::assets::{AssetManager, AssetParentLight};
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
             Type text,
             Subtype text DEFAULT '',
             Extension text DEFAULT '',
             HasPreview integer DEFAULT 0
         );",
        [],
    );

    println!("{:?}", result);

    let result = conn.execute(
        "CREATE TABLE IF NOT EXISTS AssetData (
             Uid text primary key,
             Data BLOB
         );",
        [],
    );

    println!("{:?}", result);
}

pub fn GetAssetFromDatabase(dbc: &Connection, asset_uid: &String) -> Option<AssetParentLight> {
    let query = format!(
        "SELECT Uid, Name, Type from Assets WHERE Uid='{}'", asset_uid
    );

    let mut statement = dbc.prepare(&query).unwrap();

    let rows_iter = statement.query_map([], |row| {
        let mut tmp = AssetParentLight::New();

        tmp.uid = row.get(0).unwrap_or("".into());
        tmp.name = row.get(1).unwrap_or("".into());
        tmp.assetType = row.get(2).unwrap_or("".into());

        return Ok(tmp);
    }).unwrap();


    for myRow in rows_iter {
        if let Ok(lightAsset) = myRow {
            println!("{:?}", lightAsset);

            return Some(lightAsset);
        } else {
            return None;
        }
    }

    return None;
}

pub fn UpdateAsset(dbc: &Connection, assetLight: &AssetParentLight) -> Result<()> {
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