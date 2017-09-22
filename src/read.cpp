#include <fstream>
#include <vector>
#include <string>
#include <tuple>
#include <iostream>
#include <emscripten/bind.h>
using namespace std;

typedef vector<double> Point;
typedef vector<Point> PointList;

PointList load_points(string filename) {
	ifstream input(filename.c_str());
	if(!input.is_open())
		cout << "File " << filename << " does not exist.";
	PointList pts;
	string pt1,
	       pt2;
	while(getline(input, pt1, ',')) {
		getline(input,pt2);
		pts.push_back(Point({stod(pt1), stod(pt2)}));
	}
	return pts;
}

EMSCRIPTEN_BINDINGS(stl_wrappers) {
	emscripten::register_vector<double>("Point");
	emscripten::register_vector<vector<double>>("PointList");
}

EMSCRIPTEN_BINDINGS(module) {
	emscripten::function("load_points", &load_points);
}

