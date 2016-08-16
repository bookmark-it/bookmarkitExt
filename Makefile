package_chrome:
	cd .. && cp -rf bookmarkitExt bookmarkitExtPkg
	cd ../bookmarkitExtPkg && rm -rf Makefile && rm -rf .git && rm -rf **/.DS_Store
	cd ../bookmarkitExtPkg && cp ~/Documents/Importants/keys/bookmarkExt.pem key.pem
	cd .. && zip -r -X bookmarkitExtChrome.zip bookmarkitExtPkg && rm -rf bookmarkitExtPkg

package_firefox:
	cd .. && cp -rf bookmarkitExt bookmarkitExtPkg
	cd ../bookmarkitExtPkg && rm -rf Makefile && rm -rf .git && rm -rf **/.DS_Store
	cd ../bookmarkitExtPkg && zip -r -X ../bookmarkitExtFirefox.zip *
	cd .. && rm -rf bookmarkitExtPkg
