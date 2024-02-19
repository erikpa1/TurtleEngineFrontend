use rusqlite;
use std::collections::HashMap;

use std::sync::{Arc, Mutex};
use std::vec;
use uuid::Uuid;

use serde_json::{json, Value};

use tstructures::licence::Licence;

pub struct AppStateMut {
    pub activeProjectFolder: String,
    pub activeProjectPath: String,
    pub activeProject: Value,

    pub containers: HashMap<String, HashMap<String, Value>>,
}

impl AppStateMut {
    pub fn New() -> Self {
        return Self {
            activeProject: json!({}),
            activeProjectPath: "".into(),
            activeProjectFolder: "".into(),
            containers: HashMap::new(),
        };
    }

    pub fn InsertEntity(&mut self, container: &String, mut entity: Value) -> Result<String, ()> {
        let mut uid = String::from("");
        let mut return_uid = String::from("");

        if let Some(val_obj) = entity.as_object_mut() {
            if let Some(val) = val_obj.get("uid") {
                if let Some(uid_val) = val.as_str() {
                    if uid_val == "" {
                        uid = Uuid::new_v4().to_string();
                        val_obj.insert("uid".into(), Value::String(uid.clone()));
                    } else {
                        uid = String::from(uid_val);
                    }
                }
            } else {
                uid = Uuid::new_v4().to_string();
                val_obj.insert("uid".into(), Value::String(uid.clone()));
            }
        }

        return_uid = uid.clone();

        let container_r = self.containers.get_mut(container);

        if let Some(map) = container_r {
            map.insert(uid, entity);
        } else {
            let mut map: HashMap<String, Value> = HashMap::new();
            map.insert(uid, entity);
            self.containers.insert(container.clone(), map);
        }

        Ok(return_uid)
    }

    pub fn DeleteEntities(&mut self, container_key: &String, query: &Value) {
        if let Some(container) = self.containers.get_mut(container_key) {
            if let Some(query_object) = query.as_object() {
                let keys_len = query_object.keys().len();

                if keys_len == 0 {
                    container.clear();
                } else if (keys_len == 1 && query_object.contains_key("uid")) {
                    let mut keys_to_delete: Vec<String> = vec![];

                    for val in container.values() {
                        let uid = String::from(val.get("uid").unwrap().as_str().unwrap());
                        keys_to_delete.push(uid);
                    }

                    for key in keys_to_delete {
                        container.remove_entry(&key);
                    }
                } else {
                    let mut keys_to_delete: Vec<String> = vec![];

                    for val in container.values() {
                        if Self::_ValueMatchQuery(val, query_object) {
                            let uid = String::from(val.get("uid").unwrap().as_str().unwrap());
                            keys_to_delete.push(uid);
                        }
                    }

                    for key in keys_to_delete {
                        container.remove_entry(&key);
                    }
                }
            }
        }
    }

    pub fn QueryEntities(&self, container_key: &String, query: &Value) -> Vec<Value> {
        let mut result: Vec<Value> = vec![];

        if let Some(container) = self.containers.get(container_key) {
            if let Some(query_object) = query.as_object() {
                let keys_len = query_object.keys().len();

                if keys_len == 0 {
                    return container.values().map(|val| val.clone()).collect();
                } else if (keys_len == 1 && query_object.contains_key("uid")) {
                    if let Some(uid_val_jobj) = query_object.get("uid") {
                        if let Some(uid_val) = uid_val_jobj.as_str() {
                            if let Some(entity) = container.get(&String::from(uid_val)) {
                                return vec![entity.clone()];
                            }
                        }
                    }
                } else {
                    return container
                        .values()
                        .filter(|&val| Self::_ValueMatchQuery(val, query_object))
                        .map(|val| val.clone())
                        .collect();
                }
            }
        }

        return result;
    }

    fn _ValueMatchQuery(val: &Value, query: &serde_json::Map<String, Value>) -> bool {
        if let Some(query_object) = val.as_object() {
            for i in query_object.keys() {
                if let Some(val) = query.get(i) {
                    let result = val.eq(val);
                    return result;
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    pub fn ToJson(&self) -> Value {
        json!({
            "name": "Some name",
            "containers": self.containers
        })
    }
}
