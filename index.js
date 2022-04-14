var _blogname = "blog-xhg78999";
    var _title = $("#Header1_HeaderTitle").text();
    var _subtitle = $("#blogTitle > h2").text();
    var _foot = $("#footer").html();
    var _username = $("#profile_block > a:nth-child(1)").text();
    var _headurl = "https://pic.cnblogs.com/avatar/1974585/20220323191955.png";
    var _thumb = "https://img2022.cnblogs.com/blog/1974585/202204/1974585-20220411094042227-436386299.png";
    function _dialog(title, content, button, callback) {
        mdui.dialog({
            title: title,
            content: content,
            buttons: [
                {
                    text: '取消'
                },
                {
                    text: button,
                    onClick: callback
                }
            ]
        });
    }
    function _pop(msg) {
        mdui.snackbar({
            message: msg,
            position: 'right-bottom',
        });
    }
    function _feed() {
        $.ajax({
            url: `https://www.cnblogs.com/${_blogname}/ajax/blogSubscription`,
            method: "GET",
            success: function (res) {
                var login = res.isAuthenticated;
                var status = res.isSubscribed;
                var owner = res.isBlogOwner;
                if (!login) {
                    _pop("请先登录账号");
                } else if (owner) {
                    _pop("不可以订阅自己的博客");
                } else if (!status) {
                    _dialog("订阅", "是否订阅？<br>订阅后您可以在博客园首页查看订阅。", "订阅", function () {
                        $.ajax({
                            url: `https://www.cnblogs.com/${_blogname}/ajax/blogSubscription`,
                            method: "POST",
                            success: function () {
                                _pop("订阅成功");
                            },
                            error: function () {
                                _pop("订阅失败，请检查网络");
                            }
                        });
                    });
                } else {
                    _dialog("取消订阅", "您已订阅该博客，是否取消订阅？", "取消订阅", function () {
                        $.ajax({
                            url: `https://www.cnblogs.com/${_blogname}/ajax/blogSubscription`,
                            method: "DELETE",
                            success: function () {
                                _pop("取消订阅成功");
                            },
                            error: function () {
                                _pop("取消订阅失败，请检查网络");
                            }
                        });
                    })
                }
            }
        });
    }
    function _saying() {
        $.ajax({
            url: "https://open.iciba.com/dsapi/",
            dataType: "JSONP",
            success: function (data) {
                $(".saying").text(data.note);
            },
            error: function (xhr, status, err) {
                $(".saying").text("噫，网似断矣！");
            }
        })
    }
    function _articles() {
        var posts = "";
        for (var j = 0; j < $(".day").length; j++) {
            var posttitle = $($(".postTitle")[j]).text();
            var postinfo = $($(".postDesc")[j]).text().replace("posted @ ", "").replace("(", "").replace(")", " ").replace(" 编辑", "");
            var postdescription = $($(".c_b_p_desc")[j]).text().replace("摘要：", "").replace(" 阅读全文", "");
            var postlink = $($(".c_b_p_desc_readmore")[j]).attr("href");
            posts += `<div class="mdui-card article">
                <div class="mdui-card-primary">
                    <div class="mdui-card-primary-title">${posttitle}</div>
                    <div class="mdui-card-primary-subtitle">${postinfo}</div>
                </div>
                <div class="mdui-card-content">${postdescription}</div>
                <div class="mdui-card-actions">
                    <a class="mdui-btn mdui-text-color-indigo mdui-ripple" href="${postlink}">阅读</a>
                </div>
            </div>
            <br>
            `;
        }
        return posts;
    }
    function _plist() {
        var posts = "";
        for (var j = 0; j < $(".PostList").length; j++) {
            var posttitle = $($(".postTitl2")[j]).text();
            var postinfo = $($(".postDesc2")[j]).text().replace("posted @ ", "").replace("(", "").replace(")", " ").replace(" 编辑", "");
            var postlink = $($(".vertical-middle")[j]).attr("href");
            posts += `<div class="mdui-card article">
                <div class="mdui-card-primary">
                    <div class="mdui-card-primary-title">${posttitle}</div>
                    <div class="mdui-card-primary-subtitle">${postinfo}</div>
                </div>
                <div class="mdui-card-actions">
                    <a class="mdui-btn mdui-text-color-indigo mdui-ripple" href="${postlink}">阅读</a>
                </div>
            </div>
            <br>
            `;
        }
        return posts;
    }
    function _post() {
        var arttitle = $("#cb_post_title_url > span").text();
        var artcontent = $("#cnblogs_post_body").html();
        return `
        <div class="mdui-typo">
            <h1>${arttitle}</h1>
            <hr>
            ${artcontent}
        </div>
        `;
    }
    function _content() {
        var path = location.pathname;
        if (path[path.length - 1] === "/") {
            path = path.slice(0, -1);
        }
        if (path === `/${_blogname}`) {
            return _articles();
        } else if (path === `/${_blogname}/p`) {
            return _plist();
        } else if (path.includes("p") || path.includes("articles")) {
            return _post();
        }
    }
    function _init() {
        var page = $(
            `<div id="mblog">
                <div class="mdui-appbar">
                    <div class="mdui-toolbar mdui-color-indigo">
                        <a href="javascript:_drawer.open();" class="mdui-btn mdui-btn-icon">
                            <i class="mdui-icon material-icons">menu</i>
                        </a>\
                        <a href="https://www.cnblogs.com/${_blogname}" class="mdui-typo-headline">${_title}</a>
                        <div class="mdui-toolbar-spacer"></div>
                        <a href="https://www.cnblogs.com/${_blogname}" class="mdui-btn mdui-btn-icon" mdui-tooltip="{content:'首页'}">
                            <i class="mdui-icon material-icons">home</i>
                        </a>
                        <a href="javascript:_feed();" class="mdui-btn mdui-btn-icon" mdui-tooltip="{content:'订阅'}">
                            <i class="mdui-icon material-icons">rss_feed</i>
                        </a>
                        <a href="javascript:;" class="mdui-btn mdui-btn-icon">
                            <i class="mdui-icon material-icons">search</i>
                        </a>
                        <a href="javascript:;" class="mdui-typo-headline search-father">
                            <form action="https://zzk.cnblogs.com/s" target="_blank">
                                <div class="mdui-textfield search-input">
                                    <input class="mdui-textfield-input search" type="text" name="w" placeholder="搜点你想要的..."/>
                                </div>
                            </form>
                        </a>
                    </div>
                </div>
                <div class="mdui-drawer mdui-drawer-close mdui-color-white mdui-container mdui-p-y-2 auto-nline drawer" id="content-info">
                    <img class="mdui-img-circle mdui-center head" src="${_headurl}"/>
                    <h2 class="mdui-typo-headline mdui-text-center head-title">${_username}</h2>
                    <p class="mdui-typo-body-2 mdui-text-center mdui-text-color-black-secondary auto-nline">${_subtitle}</p>
                    <hr>
                    <a class="mdui-btn mdui-btn-raised mdui-btn-block mdui-color-indigo mdui-ripple" href="https://home.cnblogs.com/u/${_blogname}">
                        <i class="mdui-icon material-icons">home</i> TA的主页
                    </a>
                </div>
                <button class="mdui-fab mdui-fab-fixed mdui-fab-hide mdui-ripple mdui-color-indigo">
                    <i class="mdui-icon material-icons">vertical_align_top</i>
                </button>
                <div class="thumb">
                    <img src="${_thumb}" width="100%">
                </div>
                <div class="mdui-container content">
                    <div class="mdui-row">
                        <div class="mdui-col-xs-9">
                            <div class="mdui-card">
                                <div class="mdui-card-content">
                                    ${_content()}
                                </div>
                            </div>
                        </div>
                        <div class="mdui-col-xs-3">
                            <div class="mdui-card">
                                <div class="mdui-card-content mdui-typo">
                                    <b class="mdui-text-color-indigo">每日一言</b>
                                    <hr>
                                    <p class="saying">loading...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mdui-color-indigo mdui-p-a-3 mdui-m-t-5">
                    ${_foot}
                </div>
            </div>
            `
        );
        $("body").append(page);
        var _drawer = new mdui.Drawer($("#content-info"), { overlay: true });
        _saying();
        $(window).scroll(function () {
            if (window.scrollY > 500) {
                $(".mdui-fab").removeClass(".mdui-fab-hide");
            } else {
                $(".mdui-fab").addClass(".mdui-fab-hide");
            }
        });
    }
    $(window).ready(_init);
