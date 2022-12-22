const getColorSchemeBtn = document.getElementById("get-color-scheme-btn")

const copyHexCode = (content) => {
  navigator.clipboard.writeText(content)
  alert(`Copied Color: ${content}`)
}

document.addEventListener("click", (e) => {

  if(e.target.dataset.color) {
    copyHexCode(e.target.dataset.color)
  }

})


getColorSchemeBtn.addEventListener("click", (e)=> {
  e.preventDefault()

  const colorCode = document.getElementById("color-picker").value.slice(1)
  const colorScheme = document.getElementById("color-scheme-selector").value

  console.log(colorCode)
  console.log(colorScheme)
  fetch(`https://www.thecolorapi.com/scheme?hex=${colorCode}&mode=${colorScheme}&count=5`)
    .then(res => res.json())
    .then(data => {
      const resultColors = data.colors.map(color => {
        return color.hex.value
      })

      const resultColorsHtml = resultColors.map(color => {
        return `
        <div class="color-container">
          <div class="color-scheme" style="background: ${color}">
          </div>
          <p class="hex-code" data-color=${color}>${color}</p>
        </div>
        `
      }).join("")

      console.log(resultColorsHtml)

      document.getElementById("palette-container").innerHTML = resultColorsHtml
    })
})
