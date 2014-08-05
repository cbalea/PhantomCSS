@ECHO OFF

REM *** delete old screen captures, as they are not overwritten automatically
del failures\fail.png /s /f /q  >nul 2>&1
del screenshots\*.diff.png /s /f /q  >nul 2>&1
del last_screen.png /s /f /q  >nul 2>&1


set CASPER_PATH=%~dp0CasperJs
set CASPER_BIN=%CASPER_PATH%\bin\
set PHANTOMJS=%~dp0PhantomJs\phantomjs.exe
set ARGV=%*
call "%PHANTOMJS%" "%CASPER_BIN%bootstrap.js" --casper-path="%CASPER_PATH%" --cli %ARGV%