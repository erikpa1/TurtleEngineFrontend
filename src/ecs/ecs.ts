import {Command} from "@data/commands";

export class Ecs {


    commands_listeners: Array<string> = []


    ExecCommand(command: Command) {
        //pass
    }


}


const ECS = new Ecs()

export default ECS;