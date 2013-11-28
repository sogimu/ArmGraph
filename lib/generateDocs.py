from gzip import _PaddedFile
import sys
import os
import re
import subprocess
import argparse

__author__ = 'sogimu'

parser = argparse.ArgumentParser()
parser.add_argument("curPath", help="Path to dir with files")
parser.add_argument("docsPath", help="Path to docs")
parser.add_argument("jsDocPath", help="Path to jsDoc")

args = parser.parse_args()

currentPath = args.curPath
#currentPath = './modules'
docsPath = args.docsPath
#docsPath = './doc'
jsDocPath = args.jsDocPath
#jsDocPath = './lib/jsdoc/jsdoc.js'

print('Current path = ' + currentPath)
print('Docs path    = ' + docsPath)
print('jsDoc path   = ' + jsDocPath)

print("Building...")
#Получаем список файлов
def getListOfFiles(dir, filesList):
    for fileName in os.listdir(dir):
        path = dir + '/' + fileName
        if os.path.isfile(path):
            filesList.append(path)
        else:
            getListOfFiles(path, filesList)
    return filesList

filesList = getListOfFiles(currentPath, [])

#Обрабатывваем файлы
for file in filesList:
    print(file)

paramWithFilesPaths = ''
for file in filesList:
    paramWithFilesPaths += ' ' + file

cmd = jsDocPath + paramWithFilesPaths + ' -d ' + docsPath
print(cmd)
proc = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
out = proc.stdout.readlines()
print(out)