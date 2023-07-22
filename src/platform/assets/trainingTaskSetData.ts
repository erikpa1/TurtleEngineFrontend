import {AssetData, ProjectSerializationContext} from "@platform/assets/Asset";

export default class TrainingTaskSetData extends AssetData {

    tasks = new Array<TrainingTask>()


    ToJson(): any {
        return {
            ...super.ToJson(),
            tasks: this.tasks.map(value => value.ToJson())
        }
    }

    FromJson(context: ProjectSerializationContext, data: any) {
        super.FromJson(context, data);

        const _tasks: Array<any> = data.tasks ?? []

        for (const i of _tasks) {
            const task = new TrainingTask()
            task._parent = this
            task.FromJson(i)
            this.tasks.push(task)
        }
    }

}


export class TrainingTask {

    uid = crypto.randomUUID()
    name = ""
    text = ""

    _parent: any = null

    tasks = new Array<TrainingTask>()


    FromJson(jobj: any) {
        this.uid = jobj.uid ?? this.uid
        this.name = jobj.name ?? this.name
        this.text = jobj.text ?? this.text

        const _tasks: Array<any> = jobj.tasks ?? []

        for (const i of _tasks) {
            const task = new TrainingTask()
            task._parent = this
            task.FromJson(i)
            this.tasks.push(task)
        }
    }

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            text: this.text,
            tasks: this.tasks.map(value => value.ToJson())
        }
    }

}


