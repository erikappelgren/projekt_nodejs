var http = require('http');
var fs = require('fs');
var url = require('url');

class ListofSong {
    constructor(artist, songname, genre, link) {
        this.artist = artist;
        this.songname = songname;
        this.genre = genre;
        this.link = link;
    }
    
}
function addSong(res) {
    fs.readFile("addsong.html", function (err, data) {
        res.write(data);
        return res.end();
    })
}
function appendMain(res, query) {
    var artist = query.artist;
    var songname = query.songname;
    var genre = query.genre;
    var link = query.link;
    var rating = query.rating;
    var image = query.image;
    let newSong = new ListofSong(artist, songname, genre, link);
    fs.appendFileSync('songs.lis', artist + ", " + songname + ", " + genre + ", <a href='" + link + "'>Link to song</a>," + rating + ", " +
        "<img src='" + image + "' alt='test' width='100' height='100'>, \n");
}

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var path = q.pathname;
    if (path == '/') {
        fs.readFile("menupage.html", function (err, data) {
            res.write(data);
            
            let songs = fs.readFileSync('songs.lis');
            
            res.write("<div class='grid-container'>");
            res.write("<div class='grid-item title'>Artist</div>")
            res.write("<div class='grid-item title'>Song</div>")
            res.write("<div class='grid-item title'>Genre</div>")
            res.write("<div class='grid-item title'>Link</div>")
            res.write("<div class='grid-item title'>Rating</div>")
            res.write("<div class='grid-item title'>Image</div>")
            let lines = songs.toString().split(",");
            for (newSong of lines) {
                res.write("<div class='grid-item'>" + newSong + "</div>");
               
            }
            res.write("</div>");
                return res.end();
            });
    }
    if (path == '/addsong') {
        addSong(res);
    }
    if (path == '/append') {
        appendMain(res, q.query);
    }
    
}).listen(8080);