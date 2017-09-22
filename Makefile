all:
	emcc --bind -o ./scripts/load_file.gen.js --preload-file ./resources/Data.csv ./src/read.cpp && chmod 644 scripts/load_file.* && mv -f ./scripts/load_file.data .
