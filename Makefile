.PHONY: dev run push update-node_modules list

list:
	@echo dev run push update-node_modules

dev:
	npx webpack

run:
	servePage .

push:
	npx webpack
	cp -r dist/ ../settlersUI/dist/
	cp *.html *.css *.png ../settlersUI

	cd ../settlersUI && git add -A && git commit -m "idk" && git push

update-node_modules:
	cp -r node_modules ../settlersUI/node_modules
