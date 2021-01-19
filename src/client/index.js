import { evaluate } from "./js/evaluate";
import "./styles/main.scss"

document.getElementById('evaluate').addEventListener('click', () => {
    const websiteInput = document.getElementById('website')
    const resultOutput = document.getElementById('result')
    evaluate(websiteInput.value).then(data => {
        resultOutput.innerText = data
    }).catch(error => {
        resultOutput.innerText = 'Error found:' + error
    }).finally(() => {
        websiteInput.value = ''
    })
})