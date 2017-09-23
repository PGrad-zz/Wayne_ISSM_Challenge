#include <fstream>
#include <vector>
#include <string>
#include <tuple>
#include <iostream>
#include <emscripten.h>
#include <emscripten/bind.h>
using namespace std;

typedef vector<double> Point;
typedef vector<Point> PointList;

void load_points(string url, string filename, int initFunc) {
	emscripten_wget(url.c_str(), filename.c_str());
	ifstream input(filename);
	if(!input.is_open()) {
		EM_ASM( alert('File does not exist') );
		throw "File does not exist";
	}

	PointList pts;
	string pt1,
	       pt2;

	while(getline(input, pt1, ',') && getline(input,pt2))
		pts.push_back(Point({stod(pt1), stod(pt2)}));

	void (*init)(PointList) = reinterpret_cast<void (*)(PointList)>(initFunc);

	init(pts);
}

PointList * pointListFromIntPointer(uintptr_t vec) {
  return reinterpret_cast<PointList *>(vec);
}

EMSCRIPTEN_BINDINGS(stl_wrappers) {
	emscripten::register_vector<double>("Point");
	emscripten::register_vector<vector<double>>("PointList").constructor(&pointListFromIntPointer, emscripten::allow_raw_pointers());
}

EMSCRIPTEN_BINDINGS(module) {
	emscripten::function("load_points", &load_points);
}

