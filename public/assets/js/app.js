$(document).ready(() => {
    $("#modal").hide();
    //console.log('ready')
    $(".all-notes").hide();

    $("#close").on("click", (e)=> {
        $("#note-input").val("");
        $("#modal").hide();
    })

    $("#scrape-button").on("click", () => {
        window.location.href="/scrape"
    })

    $(document).on("click", ".article-time", function(e) {
        e.preventDefault();
        $("#modal").show();
    })

    $("#submit").on("click", function(e) {
    e.preventDefault();
    let thisId = $(this).attr("data-id");
    let input = $("#note-input").val().trim();

        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                title: "note",
                body: input
            }
        }).then((data) => {
            console.log(data)
            $("#modal").val("");
            $("#modal").hide();
        })
    })

    $(".note-time").on("click", function(e) {
        e.preventDefault();
        let id = $(this).attr("data-id")
        //console.log(id);
        $.ajax({
            method: "GET",
            url: "/allnotes/" + id,
        }).then((data) => {
            console.log(data.note);
            $(".all-notes").show();
            $(".all-of-the-notes").append(data.note.body);
            
        })
    })
});