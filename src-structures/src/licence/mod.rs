use serde::{Deserialize, Serialize};
use serde_json;


fn default_as_true() -> bool {
    false
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Licence {
    #[serde(default)]
    pub can_edit: bool,

    #[serde(default = "default_as_true")]
    pub can_play: bool,

}


impl Licence {
    pub fn NewFull() -> Self {
        return Licence {
            can_edit: true,
            can_play: true,
        };
    }

    fn CreateFromString(licenceJson: &String) -> Licence {
        return serde_json::from_str(licenceJson).unwrap();
    }
}