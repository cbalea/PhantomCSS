@ECHO OFF

for /r %%i in (shanghai\*.js) do casperjs.bat test %%i
