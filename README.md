JS-Export
=========

JS导出数据, 将[DataTables](http://www.datatables.net)的导出文件的代码抽出, 可以单独使用


用法:
注: 需要在服务器上运行, 单独不能运行.
JS:
	$(function() {
		new LifeExport({
			embedId: "lifeExportExcel", // embedId
			getDatas: function() {
				return {
					headers:[
						{key: "name", desc: "姓名"}, 
						{key: "hobby", desc: "爱好"}
					],
					rows:[
							{name: 'life', hobby: '睡觉'},
							{name: 'lealife', hobby: '写代码, 肯定不是'}
						]
				};
			}
		});
	});

</pre>

HTML:

	<a href="#" style="position: relative;">
		<span style="position: absolute; z-index: 0; width: 250px;">Click Here To Export Excel</span>
	
		<embed 
			style="position: absolute; left: 0px; top: 0px; width: 250px; height: 30px; z-index: 99;"
			id="lifeExportExcel"
			src="copy_csv_xls_pdf.swf"
			loop="false" menu="false" quality="best" 
			bgcolor="#ffffff" 
			width="50" height="30"
			align="middle" allowscriptaccess="always" 
			allowfullscreen="false" 
			type="application/x-shockwave-flash" 
			pluginspage="http://www.macromedia.com/go/getflashplayer"
			flashvars="id=1&amp;width=50&amp;height=30" wmode="transparent" />
	</a>
