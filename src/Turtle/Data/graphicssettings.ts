export default class GraphicSettings {

    static AVL_PANORAMAS = new Set(["clouds.hdr"])

    env_preset = "clouds.hdr"
    env_blur = 0.8
    env_background = true
    gl_logarithmicDepthBuffer = true

    FromJson(data: any) {
        this.env_preset = data.env_preset ?? this.env_preset
        this.env_blur = data.env_blur ?? this.env_blur
        this.env_background = data.env_background ?? this.env_background
        this.gl_logarithmicDepthBuffer = data.gl_logarithmicDepthBuffer ?? this.gl_logarithmicDepthBuffer
    }

    ToJson(): any {
        return {
            env_preset: this.env_preset,
            env_blur: this.env_blur,
            env_background: this.env_background,
            gl_logarithmicDepthBuffer: this.gl_logarithmicDepthBuffer,
        }
    }

    Duplicate(): GraphicSettings {
        const self = this.ToJson()
        const newOne = new GraphicSettings()
        newOne.FromJson(self)
        return newOne
    }
}