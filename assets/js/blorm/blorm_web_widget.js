var Xpost = {
    reblogs: ' 1 blog1.de, green.de, super.com, hello.org, special.net, usw.de, zbd.de, xxxx.com, web.de, spiegel.de',
    shares: 'special.net, usw.de, zbd.de, xxxx.com, web.de, spiegel.de',
    comments: 'green.de, super.com, hello.org, special.net'
}

var blormAssets = "assets/";
var blormplus = "<img src=\""+blormAssets+"icons/circle-add-plus-new-outline-stroke.png\" class='blormWidgetImagePlus'>";

class blorm_menue_bar {

    constructor(blormPostData) {

        this.blormAssets = blormapp.postConfig.blormAssets;

        // get the activity_id for the post
        this.postId = blormPostData.postid;

        // init the post data
        //this.initBlormPostData();
        this.blormPost = blormPostData;

        // prepare social data
        this.setSocialDataCounters();


        // create the html widget
        this.blormWidget = document.createElement("div");
        this.blormWidget.className = "blormWidget";

        this.ContainerMenu = document.createElement("div");
        this.ContainerMenu.className = "blormWidgetContainerMenu";

        // now render the widget
        this.RenderContainerMenu();

        // init the mouseover events for the template
        this.InitHandler();

    }


    setSocialDataCounters() {

        this.ReblogedCount = 0;
        if (typeof(this.blormPost.ReblogedCount) != "undefined") {
            this.ReblogedCount = this.blormPost.ReblogedCount;
        }

        this.SharedCount = 0;
        if (typeof(this.blormPost.SharedCount) != "undefined") {
            this.SharedCount = this.blormPost.SharedCount;
        }

        this.CommentsCount = 0;
        if (typeof(this.blormPost.CommentsCount) != "undefined") {
            this.CommentsCount = this.blormPost.CommentsCount;
        }
    }

    setSocialDataContent(data) {

        let socialData = new Array();

        switch(data) {
            case "rebloged":
                socialData = this.blormPost.Rebloged;
                break;
            case "shared":
                socialData = this.blormPost.Shared;
                break;
            case "comments":
                socialData = this.blormPost.Comments;
                break;
        }


        let ul = document.createElement("ul");

        // if there is interacton data build the list of links
        if (typeof(socialData) != "undefined") {

            this.listcontent = new Array();
            socialData.forEach(function (item, index, arr) {
                this.listcontent[index] = {name:item.user.data.data.website_name,link:item.user.data.data.website_url };
            }, this);
            let li = document.createElement("li");
            li.innerHTML = "Post is " + data +" on:";
            ul.appendChild(li);

            for (content of this.listcontent) {
                let li = document.createElement("li");
                let a = document.createElement('a');
                a.href = content.link;
                a.innerHTML = content.name;
                li.appendChild(a);
                ul.appendChild(li);
            }

            // if there is no interaction data just leave a short message
        } else {
            let li = document.createElement("li");
            li.innerHTML = "No interactions here";
            ul.appendChild(li);
        }

        let c = this.PowerbarContent.firstChild;
        if ( c != null) {
            this.PowerbarContent.removeChild(c);
        }
        this.PowerbarContent.appendChild(ul);
    }

    InitHandler() {
        console.log("init handler");
        // mouse event for the powerbar when mouse on icons
        this.handlePlusSocialBars = this.blormWidget.getElementsByClassName("blormWidgetPlusSocialBarEventHandler");
        this.PowerbarMobileTouchLayer = this.blormWidget.getElementsByClassName("blormWidgetPowerbarMobileTouchLayer")[0];
        let SocialBar;
        let _this = this;
        //let powerBar = this.Powerbar;

        for (SocialBar of this.handlePlusSocialBars) {
            SocialBar.addEventListener(
                "mouseover",
                function(){
                    _this.Powerbar.style.display = "inline";

                    let h = _this.PowerbarContent.scrollHeight;
                    console.log(h);

                    _this.Powerbar.style.height = h + 10 + "px";
                    _this.Powerbar.style.top =  "-" + h + "px";
                    _this.PowerbarContent.style.backgroundColor = "#000";
                    _this.PowerbarContent.style.color = "#fff";
                },
                false
            );

            SocialBar.addEventListener(
                "touchstart",
                function(){
                    console.log("touchstart");
                    _this.Powerbar.style.display = "inline";

                    let h = _this.PowerbarContent.scrollHeight;
                    _this.Powerbar.style.height = h + 45 + "px";
                    _this.Powerbar.style.top =  "-" + h - 5 + "px";
                    _this.PowerbarContent.style.backgroundColor = "#000";
                    _this.PowerbarContent.style.color = "#fff";
                    _this.PowerbarMobileTouchLayer.style.display = "inline-block";
                },
                false
            );

            SocialBar.addEventListener(
                "mouseout",
                function(){
                    _this.Powerbar.style.display = "none";
                },
                false
            );
        }

        // keep the powerbar visible as long we use it
        this.Powerbar.addEventListener(
            "mouseover",
            function(){
                _this.Powerbar.style.display = "inline";
            },
            false
        );

        this.Powerbar.addEventListener(
            "mouseout",
            function(){
                _this.Powerbar.style.display = "none";
            },
            false
        );

        this.handleLayerRebloged = this.ContainerDisplay.getElementsByClassName("blormWidgetPlusSocialBarRebloged")[0];
        this.handleLayerRebloged.addEventListener("mouseover", function(){_this.setSocialDataContent("rebloged");}, true);
        this.handleLayerRebloged.addEventListener("touchstart", function(){_this.setSocialDataContent("rebloged");}, true);


        this.handleLayerShared = this.ContainerDisplay.getElementsByClassName("blormWidgetPlusSocialBarShared")[0];
        this.handleLayerShared.addEventListener(
            "mouseover",
            function(){
                _this.setSocialDataContent("shared");
            },
            true
        );

        this.handleLayerComments = this.ContainerDisplay.getElementsByClassName("blormWidgetPlusSocialBarComments")[0];
        this.handleLayerComments.addEventListener(
            "mouseover",
            function(){
                _this.setSocialDataContent("comments");
            },
            true
        );

        this.handleLayerLogo = this.ContainerDisplay.getElementsByClassName("blormWidgetPlusLogoIcon")[0];
        this.handleLayerLogo.addEventListener(
            "mouseover",
            function(){


                let c = _this.PowerbarContent.firstChild;
                if ( c != null) {
                    _this.PowerbarContent.removeChild(c);
                }

                let span = document.createElement("span");
                span.classList.add("PowerbarContentText");
                let content = document.createTextNode("Blorm helps connecting publishers to promote each other and the content they love. Learn more about blorm at <a href=\"http://blorm.io\">blorm.io</a>\n");
                span.innerHTML = content.textContent;

                _this.PowerbarContent.appendChild(span);

            },
            true
        );
        console.log("init handler finished");
    }

    RenderContainerMenu() {

        /* powerbar plus content */
        // we need a container for the content(list of sharing publishers and comments)
        this.PowerbarContent = document.createElement("div");
        this.PowerbarContent.classList.add("blormWidgetPowerbarContent");

        // we need a powerbar and append the content to
        this.Powerbar = document.createElement("div");
        this.Powerbar.classList.add("blormWidgetPowerbar");
        this.Powerbar.appendChild(this.PowerbarContent);

        const markupContainerDisplay = `
                        <div class="blormWidgetPlus">
                            <div class="blormWidgetPlusSocial">
                                <ul class="blormWidgetPlusSocialBar">
                                    <li class="blormWidgetPlusSocialBarIcon blormWidgetPlusSocialBarEventHandler blormWidgetPlusSocialBarRebloged">
                                        <img src="${this.blormAssets}/icons/editor-copy-2-duplicate-glyph.png" alt="reblogged" >
                                    </li>
                                    <li class="blormWidgetPlusSocialBarText">
                                        <span class="blormWidgetPlusSocialBarRebloggedCount">${this.ReblogedCount}</span>
                                    </li>
                                    <li class="blormWidgetPlusSocialBarIcon blormWidgetPlusSocialBarEventHandler blormWidgetPlusSocialBarShared">
                                        <img src="${this.blormAssets}/icons/circle-sync-backup-2-glyph.png" alt="shared" >
                                    </li>
                                    <li class="blormWidgetPlusSocialBarText">
                                        <span class="blormWidgetPlusSocialBarSharedCount">${this.SharedCount}</span>
                                    </li>
                                    <li class="blormWidgetPlusSocialBarIcon blormWidgetPlusSocialBarEventHandler blormWidgetPlusSocialBarComments">
                                        <img src="${this.blormAssets}/icons/other-review-comment-glyph.png" alt="comments">
                                    </li>
                                    <li class="blormWidgetPlusSocialBarText">
                                        <span class="blormWidgetPlusSocialBarCommentsCount">${this.CommentsCount}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="blormWidgetPlusLogoIcon blormWidgetPlusSocialBarEventHandler">
                                <img src="${this.blormAssets}/images/blorm_icon.png" class="blormWidgetPlusLogoIconImg">
                            </div>
                        </div>
                        <div class="blormWidgetPowerText">
                            Origin: <a href="http://www.de">www.blog3-ist-ghile.de</a>
                        </div>`;

        this.ContainerDisplay = document.createElement("div");
        this.ContainerDisplay.classList.add("blormWidgetContainerDisplay");
        this.ContainerDisplay.innerHTML = markupContainerDisplay;

        /* put it all together */
        this.ContainerMenu.appendChild(this.Powerbar);
        this.ContainerMenu.appendChild(this.ContainerDisplay);

        /* a box to float the menue left or right */
        this.ContainerMenuBox = document.createElement("div");
        this.ContainerMenuBox.classList.add("AlignRight");

        this.ContainerMenuBox.appendChild(this.ContainerMenu);

        // prepare the widget
        this.blormWidget.appendChild(this.ContainerMenuBox);
        console.log(this.blormWidget);
    }

    GetWidget() {

        return this.blormWidget;
    }

    GetWidgetClassBoxed(ClassName) {

        this.setPosition(this.ContainerMenu);
        let ClassBox = document.createElement("div");
        ClassBox.className = ClassName;
        ClassBox.innerHTML = this.blormWidget.outerHTML;
        return ClassBox;
    }

    GetMenue() {
        return this.this.ContainerMenuBox;
    }

    GetMenueClassBoxed(ClassName) {
        this.setPosition(this.ContainerMenu);
        let ClassBox = document.createElement("div");
        ClassBox.className = ClassName;
        ClassBox.append(this.ContainerMenuBox);
        return ClassBox;
    }

    setPosition(element) {
        if (blormapp.postConfig.positionTop !== 0) {
            let x = 0 - blormapp.postConfig.positionTop;
            element.style.marginTop = x + "%";
        }
        if (blormapp.postConfig.positionRight !== 0) {
            let x = 0 - blormapp.postConfig.positionRight;
            element.style.marginRight = x + "%";
        }
        if (blormapp.postConfig.positionBottom !== 0) {
            let x = 0 - blormapp.postConfig.positionBottom;
            element.style.marginBottom = x + "%";
        }
        if (blormapp.postConfig.positionLeft !== 0) {
            let x = 0 - blormapp.postConfig.positionLeft;
            element.style.marginLeft = x + "%";
        }

    }

}; // end blorm class


function getPostById(id) {

    let post = {};

    if (typeof blormapp.reblogedPosts[id] !== 'undefined') {
        post = blormapp.reblogedPosts[id];
    }

    if (typeof blormapp.blormPosts[id] !== 'undefined') {
        post = blormapp.blormPosts[id];
    }

    return post;
}

var reblogged = 32;
var shared = 3;
var comments = 7;
document.addEventListener("DOMContentLoaded", function() {

    console.log("web-app init");

    // get all rebloged posts on the page
    /*var allReblogedPosts = document.getElementsByClassName("blorm-rebloged");

    Array.from(allReblogedPosts).forEach(function(ReblogedPost){
        console.log(ReblogedPost);
        let id = ReblogedPost.id.split("-")[1];
        blormMenuBar = new blorm_menue_bar(blormapp.reblogedPosts[id])


        // ReblogedPost.appendChild(blormMenuBar.GetWidgetClassBoxed("entry-content"));


        /* standard content elements "entry-content" */
        /*contentWraper = ReblogedPost.getElementsByClassName("blorm-reblog-post-data");
        contentWraper[0].parentNode.insertBefore(blormMenuBar.GetWidget(), contentWraper[0].nextSibling);

        headerBlock = ReblogedPost.getElementsByClassName("entry-header");
        headerBlock[0].parentNode.insertBefore(blormMenuBar.GetWidgetClassBoxed("entry-content"), headerBlock[0].nextSibling);

        /*contentBlock = ReblogedPost.getElementsByClassName("entry-content");
        console.log(contentBlock[0].innerHTML);
        temp = contentBlock[0].innerHTML;
        console.log(blormMenuBar.GetWidget().outerHTML);

        contentBlock[0].innerHTML = temp + blormMenuBar.GetWidget().outerHTML;
        //contentBlock[0].parentNode.insertBefore(blormMenuBar.GetWidget(), contentBlock[0].nextSibling);

        // footer block
        footerBlock = ReblogedPost.getElementsByClassName("entry-footer");
        footerBlock[0].parentNode.insertBefore(blormMenuBar.GetWidget(), footerBlock[0].nextSibling);

    });*/

    var allBlormWidgets = document.getElementsByClassName("blormWidget");

    Array.from(allBlormWidgets).forEach(function(BlormWidget){
        console.log(BlormWidget);

        let id = BlormWidget.dataset.postid;
        post = getPostById(id);

        if (Object.keys(post).length !== 0) {
            blormMenuBar = new blorm_menue_bar(post)
            //console.log(blormMenuBar);
            BlormWidget.appendChild(blormMenuBar.GetMenueClassBoxed("entry-content"));
        }
    });
});