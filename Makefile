all:
	emcc --bind -o ./scripts/load_file.gen.js --preload-file ./resources ./src/read.cpp && chmod 644 scripts/load_file.* && mv -f ./scripts/load_file.gen.data .
clean:
	rm -f ./scripts/load_file.gen.js && rm -f ./load_file.gen.data
