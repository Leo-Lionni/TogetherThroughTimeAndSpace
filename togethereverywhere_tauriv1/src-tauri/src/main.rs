// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


#[tauri::command]
fn greet_together(name: &str) -> String {
  format!("Hello, {}!", name)
}


fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![greet_together])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
