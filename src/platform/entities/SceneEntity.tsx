// import * as three from "three"

import SceneEntitiesFactory from "@platform/entities/SceneEntitiesFactory";
import React from "react";

export class SceneEntity {

    static TYPE = "base"
    type = SceneEntity.TYPE

    children = new Array<SceneEntity>()

    name = ""
    uid = crypto.randomUUID()
    position: [number, number, number] | number[] = [0, 0, 0]
    rotation: [number, number, number] | number[] = [0, 0, 0]
    scale: [number, number, number] | number[] = [1, 1, 1]


    onChildrenChanged: any = null
    onChanged: any = null

    constructor() {
        //pass
    }

    ToJson(): any {
        return {
            uid: this.uid,
            name: this.name,
            type: this.type,
            position: this.position,
            scale: this.scale,
            rotation: this.rotation,
            children: this.ChildrenToJson()
        }
    }

    FromJson(jObject: any) {
        this.uid = jObject.uid ?? this.uid
        this.name = jObject.name ?? this.name
        this.position = jObject.position ?? this.position
        this.scale = jObject.scale ?? this.scale
        this.rotation = jObject.rotation ?? this.rotation

        const children = jObject.children ?? []

        children.forEach((value: any | SceneEntity) => {
            const clazz = SceneEntitiesFactory.GetClass(value.type ?? "base")
            const node = new clazz()
            node.FromJson(value)
            this.children.push(node)
        })
    }

    ChildrenToJson(): any {
        return this.children.map((value) => {
            return value.ToJson()
        })
    }


}


export function SceneNodeView({}) {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]}/>
            <meshBasicMaterial color={"#f70fe8"}/>
        </mesh>
    )
}