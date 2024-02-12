#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#![allow(warnings, unused)]
#![allow(unused_imports)]
#![allow(dead_code)]

mod app;
mod database;
mod plugins;

use tfs;

use std::sync::{Arc, Mutex};

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
    let mut appTest = Mutex::new(app::AppStateMut::New());

    println!("-----------");
    println!("Running Turtle engine on path: {}", &tfs::GetExePath());
    println!("-----------");

    // Code for splash screen, need to put to tauri.config.json
    // {
    //     "width": 500,
    //     "height": 500,
    //     "decorations": false,
    //     "url": "splash.svg",
    //     "label": "splashscreen",
    //     "alwaysOnTop": true,
    //     "center": true
    //   }

    tauri::Builder::default()
        .manage(appTest)
        .invoke_handler(tauri::generate_handler![close_splashscreen])
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(plugins::project::init())
        .plugin(plugins::os::init())
        .plugin(plugins::images::init())

        // .setup(|app| {
        //     let splashscreen_window = app.get_window("splashscreen").unwrap();
        //     splashscreen_window.center().unwrap();
        //     let main_window = app.get_window("main").unwrap();
        //     main_window.hide().unwrap();
        //     // we perform the initialization code on a new task so the app doesn't freeze
        //     tauri::async_runtime::spawn(async move {
        //         // initialize your app here instead of sleeping :)
        //         println!("Initializing...");
        //         std::thread::sleep(std::time::Duration::from_secs(5));
        //         println!("Done initializing.");
        //         // After it's done, close the splashscreen and display the main window
        //         splashscreen_window.center().unwrap();
        //         splashscreen_window.close().unwrap();
        //         main_window.show().unwrap();
        //     });
        //     Ok(())
        // })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
