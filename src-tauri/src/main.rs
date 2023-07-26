#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

#![allow(unused_imports)]
#![allow(dead_code)]

mod app;
mod plugins;
mod database;


use tfs;

use tauri::Manager;

#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
    // Close splashscreen
    if let Some(splashscreen) = window.get_window("splashscreen") {
        splashscreen.close().unwrap();
    }
    // Show main window
    window.get_window("main").unwrap().show().unwrap();
}


fn main() {
    let mut app = app::AppState::New();

    println!("-----------");
    println!("Running Turtle engine on path: {}", &tfs::GetExePath());
    println!("-----------");

    tauri::Builder::default()
        .manage(app)
        .manage(app::DbTest {
            mapMutex: Default::default()
        })
        .invoke_handler(tauri::generate_handler![close_splashscreen])

        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(plugins::project::init())
        .plugin(plugins::assets::init())
        .plugin(plugins::os::init())
        .plugin(plugins::images::init())
        .plugin(plugins::sqlite::init())

        .setup(|app| {
            let splashscreen_window = app.get_window("splashscreen").unwrap();
            splashscreen_window.set_always_on_top(true).unwrap();
            splashscreen_window.center().unwrap();

            let main_window = app.get_window("main").unwrap();

            main_window.hide().unwrap();
            // we perform the initialization code on a new task so the app doesn't freeze
            tauri::async_runtime::spawn(async move {
                // initialize your app here instead of sleeping :)
                println!("Initializing...");
                std::thread::sleep(std::time::Duration::from_secs(5));
                println!("Done initializing.");

                // After it's done, close the splashscreen and display the main window
                splashscreen_window.center().unwrap();
                splashscreen_window.close().unwrap();
                main_window.show().unwrap();
            });
            Ok(())
        })

        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
