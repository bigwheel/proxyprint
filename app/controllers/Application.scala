package controllers

import play.api._
import play.api.mvc._
import play.api.data._
import play.api.data.Forms._

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def card_images = Action { implicit request =>
    val cardlistForm = Form(tuple("multiverseid" -> list(number), "number_of_card" -> list(number)))
    val (mid, noc) = cardlistForm.bindFromRequest.get

    Ok(mid.zip(noc).filter(_._2 != 0).toString())
  }
}