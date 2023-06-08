#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

mod app;
mod plugins;
mod database;


#[tauri::command]
async fn serve_any_file(path: String) -> Result<Vec<u8>, String> {
    println!("File to serve {}", path);

    //Toto treba otestovat

    match std::fs::read(&path) {
        Ok(content) => Ok(content),
        Err(err) => Err(err.to_string()),
    }
}


fn main() {
    let mut app = app::AppState::New();

    tauri::Builder::default()
        .manage(app)
        .manage(app::DbTest{
            mapMutex: Default::default()
        })
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(plugins::project::init())
        .plugin(plugins::assets::init())
        .plugin(plugins::os::init())
        .invoke_handler(tauri::generate_handler![serve_any_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
