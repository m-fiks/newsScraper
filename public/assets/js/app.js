$(document).ready(() => {
    console.log('ready')

    $("#scrape-button").on("click", () => {
        window.location.href="/all"
    })

    $("#save-button").on("click", () => {
        window.location.href="/saved"
    })

    $(document).on("click",".article-time", function(e) {
    e.preventDefault();
    let thisId = $(this).attr("data-id");
    console.log(thisId)
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
        }).then((data) => {
            console.log(`success ${data} added`)
        })
    })

});