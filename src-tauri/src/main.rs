#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

#![allow(unused_imports)]
#![allow(dead_code)]

mod app;
mod plugins;
mod database;


fn main() {
    let mut app = app::AppState::New();

    tauri::Builder::default()
        .manage(app)
        .manage(app::DbTest {
            mapMutex: Default::default()
        })
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(plugins::project::init())
        .plugin(plugins::assets::init())
        .plugin(plugins::os::init())
        .plugin(plugins::images::init())
        .plugin(plugins::sqlite::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
