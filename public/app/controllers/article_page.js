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
        this.username
        this.password
        this.commentSubcontainer
    }

    init() {
        $(document).ready(function () {
            this.commentSubcontainer = $("#commentSubcontainer")
            this.postHeader = $(".articleTitle")
            this.postSubtitle = $(".articleSubtitle")
            this.postBody = $(".articleBody")
            this.postImg = $(".img-thumbnail")
            this.postAuthor = $(".articleAuthor")
            this.postDate = $(".articleDate")
            this.postTags = $(".articleTag")

            var post = JSON.parse(sessionStorage.getItem('data'));
            this.username = JSON.parse(sessionStorage.getItem('username'));
            this.password = JSON.parse(sessionStorage.getItem('password'));
            this.getPost(post);           
            this.getComments(post);
            //console.log("post", JSON.parse(sessionStorage.getItem('data')))
        }.bind(this))
    }

    getPost(post) {
        this.restController.getArticle("http://localhost:3000/articles/" + post._id + "?this.username=" + this.username + "&this.password=" + this.password + "", function (data, status, xhr) {
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
        this.restController.getCommentsArticle("http://localhost:3000/comments?username="+this.username+"&password="+this.password+"", function (data, status, xhr) {
            console.log("data", data)
            for (var id in data) {
                var comment = data[id]
                if(post._id==comment.id_articolo)
                    this.createUIComment(comment)
                
            }
        }.bind(this))
    }

    createUIComment(comment) {

        var commentSubcontainer = $("#comments").clone()
        commentSubcontainer.css("display", "block")
        commentSubcontainer.attr("id", "")
        commentSubcontainer.addClass("class", "commentSubcontainer")

        var commentDate = commentSubcontainer.find(".commentDate")
        var commentName = commentSubcontainer.find(".commentAuthor")
        var commentBody = commentSubcontainer.find(".commentBody")
        var commentStatus = commentSubcontainer.find(".commentStatus")
        var commentColumn = commentSubcontainer.find(".column")
        var hideCommentBtn = '<a href="#" class="card-link pb-1" id="hideComment">nascondi</a>'
        var showCommentBtn = '<a href="#" class="card-link pb-1" id="showComment">mostra</a>'

        commentDate.html(this.formatDate(comment.Created_date))
        commentName.html(comment.autore)
        commentBody.html(comment.body)
        commentColumn.append(hideCommentBtn)
        commentColumn.append(showCommentBtn)
            

        if (comment.public === true) {
            commentStatus.html("Visibile")
        }
        else {
            commentStatus.html("Nascosto")
        }


        commentSubcontainer.find("#hideComment").click(function (e) {
            e.preventDefault();
            comment.public = false
            this.statusComment(comment)
        }.bind(this))

        commentSubcontainer.find("#showComment").click(function (e) {
            e.preventDefault();
            comment.public = true
            this.statusComment(comment)
        }.bind(this))


        $("#commentContainer").append(commentSubcontainer)


    };

    statusComment(comment) {

        var data = {
            "public": comment.public
        }

        this.restController.patchComment("http://localhost:3000/comments/"+comment._id+"?username="+this.username+"&password="+this.password, data,
            function () {
                console.log("visibilità",comment.public)
                console.log("username",this.password)
                location.reload(true)
            }.bind(this)
        )


    }
}