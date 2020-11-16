@echo off
del /S /Q /F demo\output
mkdir demo\output
echo D | xcopy /S /C /Y img demo\output\img
