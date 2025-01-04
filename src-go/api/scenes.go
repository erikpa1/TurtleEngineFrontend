package api

import (
	"github.com/gin-gonic/gin"
	"turtle/auth"
	"turtle/ctrl"
	"turtle/lg"
	"turtle/models"
	"turtle/tools"
)

func _ListScenes(c *gin.Context) {
	user := auth.GetUserFromContext(c)
	parent := c.Query("parent")
	tools.AutoReturn(c, ctrl.ListScenes(user.Org, parent))
}

func _COUScene(c *gin.Context) {
	user := auth.GetUserFromContext(c)

	lg.LogOk(c.PostForm("data"))

	scene := tools.ObjFromJsonPtr[models.TurtleScene](c.PostForm("data"))

	if scene.Uid == "" {
		scene.Uid = tools.GetUUID4()
		scene.At = tools.GetTimeNowMillis()
	}

	scene.Org = user.Org
	scene.CreatedBy = user.Org

	ctrl.COUScene(user.Org, scene)
	tools.AutoReturn(c, scene.Uid)

}

func initApiScenes(r *gin.Engine) {
	r.GET("/api/scenes", auth.LoginOrApp, _ListScenes)
	r.POST("/api/scene", auth.LoginRequired, _COUScene)
}
