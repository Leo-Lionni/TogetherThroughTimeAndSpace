
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![greet_together])
    .setup(|app| {
      if cfg!(debug_assertions) {
          // log plugin
        app.handle().plugin(
       tauri_plugin_log::Builder::default()
           .level(log::LevelFilter::Info)
           .build(),
        )?;
      }
        // sql plugin
        app.handle().plugin(
            tauri_plugin_sql::Builder::default().build()
        )?;
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}



// #[tauri::command]
// fn my_custom_command() {
//   println!("I was invoked from JavaScript!");
// }

#[tauri::command]
fn greet_together(name: &str) -> String {
  format!("Hello,this is tauri app, {}!", name)
}