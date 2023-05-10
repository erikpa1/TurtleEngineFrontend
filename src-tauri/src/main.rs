#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

mod app;
mod plugins;



fn main() {


    let mut app = app::AppState::New();

    tauri::Builder::default()
        .manage(app)
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(plugins::project::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
