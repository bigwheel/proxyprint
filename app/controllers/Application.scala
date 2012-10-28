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

    def separateBy9(l :List[Int]) : List[List[Int]] = {
      l match {
        case List() =>
          Nil
        case _ =>
          val (heads, tails) = l.splitAt(9)
          List(heads):::separateBy9(tails)
      }
    }
    val a = mid.zip(noc).flatMap(a => List.fill(a._2)(a._1))
    println(separateBy9(a))
    Ok(views.html.card_images(separateBy9(a)))
  }
}