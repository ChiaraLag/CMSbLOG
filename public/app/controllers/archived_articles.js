class ArchivedArticlesController {

    constructor() {
        this.restController = new RestController()
        this.postContainer
        this.modal
        this.openModalBtn     
        this.postTags = []       
        this.commentAuthor
        this.commentBody
        this.CommentDate
        this.commentPublic
        this.commentArticleId
        this.article
        this.username
        this.password
        this.archivedPostBtn
    }

    init() {
        $(document).ready(function () {
            this.postsRow = $("#postsRow")
            this.postContainer = $("#postContainer")
            this.postTag = $("#postTag")
            this.commentAuthor = $("#commentAuthor")
            this.commentBody = $("#commentBody")
            this.commentDate = $("#commentDate") 
            this.archivedPostBtn = $("#archivedBtn")

            this.username = JSON.parse(sessionStorage.getItem('username'));
            this.password = JSON.parse(sessionStorage.getItem('password'));
  

            this.getPosts()

        }.bind(this))

    }

    getPosts() {
        this.restController.get("http://localhost:3000/articles/?username="+this.username+"&password="+this.password+"", function (data, status, xhr) {
            console.log("data", data.archived)
            for (var id in data) {
                var post = data[id]
                if(post.archived===true)
                    this.createUIPost(post)
            }
        }.bind(this))
    }  


    createUIPost(post) {
        var postContainer = $("#postContainer").clone()
        console.log(postContainer)
        postContainer.css("display", "block")
        postContainer.attr("id", "")
        postContainer.addClass("class", "postContainer")

        var postAuthor = postContainer.find(".card-author")
        var postHeader = postContainer.find(".card-header")
        var postSubtitle = postContainer.find(".subtitle")
        var postBody = postContainer.find(".card-text")
        var postDate = postContainer.find(".card-date")
        var postTTags = postContainer.find(".card-tag")
        var postImg = postContainer.find(".card-img-top")

        if (post.featured === true) {
            postHeader.css("background-color", "#64b5f6");         
            postHeader.css("font-weight", "bold");
        };

        postAuthor.html(post.autore)
        postBody.html(post.body)
        postHeader.html(post.title)
        postSubtitle.html(post.subtitle)
        postDate.html(this.formatDate(post.Created_date))
        postTTags.html(post.Ttags.toString())
        console.log(post.Ttags.toString())
        postImg.attr("src", "" + post.img_source + "")

        postContainer.find("#readPost").click(function (e) {
            e.preventDefault();
            sessionStorage.setItem('data', JSON.stringify(post))
            window.location.href = 'article_page.html'
        }.bind(this))

        $("#postsRow").append(postContainer)
    };

   
    add_element_to_array(post) {
        let splits = document.getElementById("postTag").value.split(',');
        for (var i = 0; i < splits.length; i++) {
            post.tag.push(splits[i]);
        }

        document.getElementById("postTag").value = "";
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    }

}
