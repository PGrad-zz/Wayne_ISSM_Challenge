let OFFSET = 1 / 8;
let POINT_RADIUS = 5;
let EXTENT = 1 - 2 * OFFSET;

function get_canvas_ctxt() {
	let canvas = document.getElementById('point_display');
	return canvas.getContext('2d');
}

function stretch_canvas(width, height) {
	let canvas = document.getElementById('point_display');
	canvas.width = width;
	canvas.height = height;
}

function draw_axes(ctxt, length) {
	let origin = [left(length), right(length)];
	let top_left = [left(length), left(length)];
	let bottom_right = [right(length), right(length)];
	draw_line(ctxt, origin, top_left);
	draw_line(ctxt, origin, bottom_right);
	let unit_font_size = 15;
	draw_text(ctxt, unit_font_size, top_left, 3, '1.0');
	draw_text(ctxt, unit_font_size, bottom_right, 2, '1.0');
	let label_font_size = 20;
	let x_label = [origin[0] + (bottom_right[0] - origin[0]) / 2, origin[1]];
	let y_label = [origin[0], (origin[1] - top_left[1]) / 2 + top_left[1]];
	draw_text(ctxt, label_font_size, x_label, 4, 'x');
	draw_text(ctxt, label_font_size, y_label, 1, 'y');
}

function draw_text(ctxt, font_size, pt, quad, text) {
	ctxt.font = font_size + 'px serif';
	if(quad == 0)
		ctxt.fillText(text, pt[0], pt[1]);
	else if(quad < 3) {
		let text_offset = quad == 1 ? -font_size : font_size;
		ctxt.fillText(text, pt[0] + text_offset, pt[1]);
	} else {
		let text_offset = quad == 3 ? -font_size : font_size;
		ctxt.fillText(text, pt[0], pt[1] + text_offset);
	}
}

function draw_line(ctxt, begin, end) {
	ctxt.beginPath();
	ctxt.moveTo(begin[0], begin[1]);
	ctxt.lineTo(end[0], end[1]);
	ctxt.closePath();
	ctxt.stroke();
}

function draw_circle(ctr_x, ctr_y, radius, options) {
	ctxt.beginPath();
	ctxt.arc(ctr_x, ctr_y, radius, 0, Math.PI * 2);
	if(options.fill) {
		if(options.color)
			ctxt.fillStyle = options.color;
		ctxt.fill();
	} else {
		ctxt.closePath();
		ctxt.stroke();
	}
}

function draw_point(ctxt, pt_x, pt_y, space_info, point_options) {
	let screen_point = to_screen(pt_x, pt_y, space_info.screen_length, space_info.units);
	draw_circle(screen_point[0], screen_point[1], POINT_RADIUS, point_options);
}

function to_screen(pt_x, pt_y, screen_length, units) {
	let space_extent = EXTENT * screen_length;
	let space_offset = OFFSET * screen_length;
	let unit = space_extent / units;
	return [pt_x * unit + space_offset, pt_y * unit + space_offset];
}

function left(x) {
	return x * OFFSET;
}

function right(x) {
	return x * (1 - OFFSET);
}
