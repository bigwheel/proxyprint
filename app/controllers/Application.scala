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
    val cardlistForm = Form(tuple("multiverseid[0]" -> number, "number_of_card[0]" -> number))
    val (mid, noc) = cardlistForm.bindFromRequest.get

    Ok(mid.toString + " " + noc.toString)
  }
}