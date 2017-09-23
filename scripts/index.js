var pts;
var ctxt;
var space_info;

function draw_scene () {
	if(!ctxt)
		return;
	if(!pts)
		return;
	stretch_canvas(window.innerWidth, window.innerHeight);
	draw_axes(ctxt, window.innerHeight);
	space_info = {
		"screen_length": window.innerHeight,
		"units": 1
	}
	let ptA = pts.get(0);
	let dist = (x,y) => {
		return Math.sqrt(Math.pow(x - ptA.get(0), 2) + Math.pow(y - ptA.get(1), 2));
	};
	let B_index = find_max(pts, (pt) => {
		return 1 / dist(pt.get(0),pt.get(1));
	});
	let C_index = find_max(pts, (pt) => {
		return dist(pt.get(0),pt.get(1));
	});
	draw_pt(ptA, "red");
	draw_pt(pts.get(B_index),"#00B3FF"); //blue
	draw_pt(pts.get(C_index),"#5EFF00"); //green
	draw_all_else(pts, B_index, C_index);
};

function find_max(vect, score_func) {
	let size = vect.size();
	let max = 1;
	for(i = 2; i < size; ++i)
		if(score_func(vect.get(max)) < score_func(vect.get(i)))
			max = i;
	return max;
}

function draw_all_else(pts, B_index, C_index) {
	let size = pts.size();
	for(i = 1; i < size; ++i)
		if(i != B_index && i != C_index)
			draw_pt(pts.get(i), "black");
}

function draw_pt(pt, color) {
	let point_options = {
		"fill": true,
		"color": color
	}
	draw_point(ctxt, pt.get(0), pt.get(1), space_info, point_options);
}

function init(_pts) {
	//Emscripten is a pathway to many abilities some would consider... unnatural.
	pts = new Module.PointList(_pts);
	ctxt = get_canvas_ctxt();
	if(!ctxt)
		return;
	draw_scene();
	window.addEventListener("resize", () => {
		draw_scene();
	});
}

Module["onRuntimeInitialized"] = () => {
	let initPtr = Runtime.addFunction(init);
	Module.load_points("http://www.ics.uci.edu/~wayne/research/students/ISSM/Data.csv", "./resources/Data.csv", initPtr);
};
