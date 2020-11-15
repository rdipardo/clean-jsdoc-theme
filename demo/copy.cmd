@echo off
del /S /Q /F demo/output
mkdir demo/output
xcopy /S /C img demo/output/img
