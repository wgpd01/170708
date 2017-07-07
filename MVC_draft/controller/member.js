module.exports = function (req, res) {
    this.req = req;
    this.res = res;
	this.index = function () {
	    // this.res.send("member controller");
		res.render('member/index.html', {
		});
	}
}
