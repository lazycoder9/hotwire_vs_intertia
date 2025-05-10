import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { text: String }

  connect() {
    this.element.addEventListener("mouseenter", () =>
      this.showTip()
    )
    this.element.addEventListener("mouseleave", () =>
      this.hideTip()
    )
  }

  showTip() {
    this.tip = document.createElement("div")
    this.tip.textContent = this.textValue
    this.tip.className =
      "absolute bg-gray-800 text-white text-sm p-1 rounded"
    document.body.appendChild(this.tip)
    let { x, y } = this.element.getBoundingClientRect()
    Object.assign(this.tip.style, {
      top: `${y - this.tip.offsetHeight - 5}px`,
      left: `${x}px`,
    })
  }

  hideTip() {
    this.tip.remove()
  }
}
