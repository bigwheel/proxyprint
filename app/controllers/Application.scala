package controllers

import play.api.mvc._
import play.api.data._
import play.api.data.Forms._

object Application extends Controller {

  def index = Action {
    Ok(views.html.index())
  }

  def card_images = Action { implicit request =>
    val cardlistForm = Form(tuple("mid" -> list(number), "num" -> list(number)))
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
    val cardlist = mid.zip(noc).flatMap(a => List.fill(a._2)(a._1))
    Ok(views.html.card_images(separateBy9(cardlist)))
  }
}