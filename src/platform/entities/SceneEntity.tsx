// import * as three from "three"

import SceneEntitiesFactory from "@platform/entities/SceneEntitiesFactory";
import React from "react";

export class SceneEntity {

    static TYPE = "base"
    type = "base"

    children = new Array<SceneEntity>()

    name = ""
    uid = ""
    position: [number, number, number] | number[] = [0, 0, 0]
    rotation: [number, number, number] | number[] = [0, 0, 0]
    scale: [number, number, number] | number[] = [1, 1, 1]

    onChildrenChanged: any = null
    onChanged: any = null

    _parent: SceneEntity | null = null

    constructor() {
        //pass

        const conts: any = this.constructor

        this.type = conts.TYPE
        this.uid = `${this.type}-${crypto.randomUUID()}`
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

            console.log(`Deserializing: ${value.type}`)

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

    AddChildren(child: SceneEntity) {
        child._parent = this
        this.children.push(child)
    }

}


export function EntityView({}) {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]}/>
            <meshBasicMaterial color={"#f70fe8"}/>
        </mesh>
    )
}