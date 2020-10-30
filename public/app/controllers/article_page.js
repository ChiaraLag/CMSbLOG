class ArticlePageController {

    constructor() {
        this.restController = new RestController()
        this.postHeader
        this.postSubtitle
        this.postBody
        this.postImg
        this.postAuthor
        this.postDate
        this.postTags
    }

    init(){
        $(document).ready(function () {
            this.postHeader = $(".articleTitle")
            this.postSubtitle = $(".articleSubtitle")
            this.postBody = $(".articleBody")
            this.postImg = $(".img-thumbnail")
            this.postAuthor = $(".articleAuthor")
            this.postDate = $(".articleDate")
            this.postTags = $(".articleTag")

            var post = JSON.parse(sessionStorage.getItem('data'));
            this.getPost(post);
            this.getComments(post);
            //console.log("post", JSON.parse(sessionStorage.getItem('data')))
        }.bind(this))
    }

    getPost(post) {
        this.restController.getArticle("http://localhost:3000/articles/" + post._id, function (data, status, xhr) {
            post = data
            this.createUIArticlePage(post)


        }.bind(this))
    }

    createUIArticlePage(post) {
        var postContainer = $(".articleContainer").clone()
        postContainer.css("display", "block")
        postContainer.attr("id", "")
        postContainer.addClass("class", "articleContainer")

        this.postAuthor.html(post.autore)
        this.postBody.html(post.body)
        this.postHeader.html(post.title)
        this.postSubtitle.html(post.subtitle)
        this.postDate.html(this.formatDate(post.Created_date))
        this.postTags.html(post.Ttags.toString())
        this.postImg.attr("src", "" + post.img_source + "")

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

    getComments(post) {
        this.restController.getCommentsArticle("http://localhost:3000/comments", function (data, status, xhr) {
            console.log("data", data)
            for (var id in data) {
                var comment = data[id]
                if(comment.id_articolo===post._id)
                    this.createUIComment(comment)

            }
        }.bind(this))
    }

    createUIComment(comment) {
        
        var commentDate = $(".commentDate")
        var commentName = $(".commentAuthor")
        var commentBody = $(".commentBody")
        var commentStatus = $(".commentStatus")
        var hideCommentBtn = '<a href="#" class="card-link pl-3 pb-1" id="hideComment">mostra/nascondi</a>'

        commentDate.html(this.formatDate(comment.Created_date))
        commentName.html(comment.autore)
        commentBody.html(comment.body)
        $(".row").append(hideCommentBtn)

        if(comment.public===true){
            commentStatus.html("Visibile")
        }
        else{
            commentStatus.html("Nascosto")
        }


        $("#hideComment").click(function () {
            console.log("ciao")
            if(comment.public===false){
                comment.public=true
            }
            else{
                comment.public=false
            }    
            this.statusComment(comment)
        }.bind(this))

        

        

    };

    statusComment(comment) {

        var data = {
            "public": comment.public
        }

        this.restController.statusComment("http://localhost:3000/comments/" + comment._id, data,
            function () {      
                location.reload(true)
            }.bind(this)
        )


    }
}