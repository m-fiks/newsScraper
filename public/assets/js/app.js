$(document).ready(() => {
    console.log('ready')

    $("#scrape-button").on("click", () => {
        window.location.href="/all"
        
    })

    $("#save-button").on("click", () => {
        window.location.href="/saved"
    })

});