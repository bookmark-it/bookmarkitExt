package_chrome:
	cd .. && cp -rf webext webextPkg
	cd ../webextPkg && rm -rf Makefile && rm -rf .git && rm -rf **/.DS_Store
	cd ../webextPkg && cp ~/Documents/Importants/keys/bookmarkExt.pem key.pem
	cd .. && zip -r -X bookmarkitExtChrome.zip webextPkg && rm -rf webextPkg

package_firefox:
	cd .. && cp -rf webext webextPkg
	cd ../webextPkg && rm -rf Makefile && rm -rf .git && rm -rf **/.DS_Store
	cd ../webextPkg && zip -r -X ../bookmarkitExtFirefox.zip *
	cd .. && rm -rf webextPkg
