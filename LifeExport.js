/**
 * 用法: new LifeExport(
 * {
		embedId: "life1", // embed
		getDatas: function() {
			return {
				headers:[{key: "data", desc: "表头1"}, {key:"data2", desc: "表头2"}], 
				rows:[{data:12, data2:333}]
				};
		}
 * )
 * @param userConfig
 * @returns {LifeExport}
 */
function LifeExport(userConfig) {
	this.config = {
		embedId: "life1", // embedId
		getDatas: function() {
			return {
			};
		}
	};
	this.init(userConfig);
	return this;
}

LifeExport.prototype = {
	init: function (userConfig) {

		var that = this;

		$.extend(this.config, userConfig);

		var flash = new ZeroClipboard_TableTools.Client(this.config);

		flash.setHandCursor(true);
		
		flash.setAction('save');
		flash.setCharSet('UTF16LE');
		flash.setFileName("导出.csv");
		flash.setBomInc({}); // 必须，不然会有乱码

		// 这里，点击执行
		flash.addEventListener('mouseDown', function(client) {
			console.log("导出...");
			var data = that.config.getDatas();
			// console.log(data);
			if(!data) {
				flash.setAction('');
				return;
			} else {
				flash.setAction('save');
			}
			that.fnSetText(flash, that.getDatasStr(data));
		});

		flash.addEventListener('complete', function (client, text) {
			// console.log("导出成功");
		});
	},

	/**
	 * 组装数据成str
	 * @param  {[type]} datas [description]
	 * {
	 	headers: [{key: 'name', desc: '姓名'}, {}, {}],
	 	rows: [{name: 'life', age: 18}, {}, {}]
	 * }
	 * @return {[type]}       [description]
	 */
	getDatasStr: function(datas) {
		var str = "";
		var headers = datas.headers;
		var keys = [];
		var descs = [];
		var rows = datas.rows;
		for(var i in headers) {
			keys.push(headers[i].key);
			descs.push(headers[i].desc);
		}
		str += descs.join("	") + "\n";
		
		for(var i in rows) {
			var row = [];
			for(var j in keys) {
				row.push(rows[i][keys[j]]);
			}
			str += row.join("	") + "\n";
		}
		// console.log(str);
		return str;
	},

	fnSetText: function (clip, sData) {
		var asData = this.fnChunkData(sData, 8192);
		clip.clearText();
		for(var i=0, iLen = asData.length ; i < iLen ; i++) {
			clip.appendText( asData[i] );
		}
	},

	fnChunkData: function ( sData, iSize ) {
		var asReturn = [];
		var iStrlen = sData.length;
		
		for ( var i=0 ; i<iStrlen ; i+=iSize ) {
			if ( i+iSize < iStrlen ) {
				asReturn.push( sData.substring( i, i+iSize ) );
			}
			else {
				asReturn.push( sData.substring( i, iStrlen ) );
			}
		}
		
		return asReturn;
	}
}