var box = new Vue({
	el: ".max",
	data: {
		message: "",
		musiclist: [],
		url: "",
		Imgurl: "",
		Commentdetail:[],
		isPlaying: false
	},
	methods: {
		getMusic: function() {
			var that = this;
			axios.get("https://autumnfish.cn/search?keywords=" + this.message)
				.then(function(response) {
					that.musiclist = response.data.result.songs
					console.log(response)
				}, function(err) {})
		},

		getSong: function(index) {
			var that = this;
			axios.get("https://autumnfish.cn/song/url?id=" + index)
				.then(function(response) {
					console.log(response)
					that.url = response.data.data[0].url
					axios.get("https://autumnfish.cn/song/detail?ids=" + index)
						.then(function(response) {
							console.log(response);
							console.log(response.data.songs[0].al.picUrl)
							console.log(response.data.songs[0].al.id)
							// var songId = response.data.songs[0].al.id
							that.Imgurl = response.data.songs[0].al.picUrl
							
							axios.get("https://autumnfish.cn/comment/hot?type=0&id="+index)
							.then(function(response){
								console.log(response)
								that.Commentdetail = response.data.hotComments
							},function(err){})
						}, function(err) {})
				}, function(err) {})
		},

		play:function(){
			console.log("play")
			this.isPlaying=true
		},
		
		pause:function(){
			console.log("pause")
			this.isPlaying=false;
		},


	}
})

