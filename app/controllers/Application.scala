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

    var count = 0
    def separateBy9 = {
      val result = count / 9
      count += 1
      result
    }
    val a = mid.zip(noc).flatMap(a => List.fill(a._2)(a._1)).groupBy(_ => separateBy9).values.toList
    println(a.toString())
    Ok(views.html.card_images(a))
  }
}