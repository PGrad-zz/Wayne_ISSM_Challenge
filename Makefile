FLAGS=--bind -O3 -s ASYNCIFY=1 -s RESERVED_FUNCTION_POINTERS=1
all:
	em++ ${FLAGS} -o ./scripts/load_file.gen.js ./src/read.cpp && chmod 644 scripts/load_file.* && mv -f ./scripts/load_file.gen.js.mem .
clean:
	rm -f ./load_file.gen.js.mem ./scripts/load_file.gen.js
