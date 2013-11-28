from gzip import _PaddedFile
import sys
import os
import re
import subprocess
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("currentPath", help="Path to dir with files")
parser.add_argument("compilerPath", help="Path to compiler")
parser.add_argument("compilationLevel", help="Compilation level")
parser.add_argument("fileName", help="Name to generated file")

args = parser.parse_args()

currentPath = args.currentPath
#currentPath = './modules'

compilerPath = args.compilerPath
#compilerPath = "./lib/Closure-compiler/compiler.jar"

compilationLevel = args.compilationLevel
#compilaionLevel = 'WHITESPACE_ONLY'
#compilaionLevel = 'SIMPLE_OPTIMIZATIONS'
#compilaionLevel = 'ADVANCED_OPTIMIZATIONS'

fileName = args.fileName
#fileName = 'armcontext.js'

print('Current path          = ' + currentPath)
print('Compiler              = ' + compilerPath)
print('Compilation level     = ' + compilationLevel)
print('File name             = ' + fileName)

print("Building...")

class File:
    """Класс описывающий список зависимостей в нужном порядке"""
    _dependes = []
    _path = ""

    def __init__(self, path, dependes):
        self._path = path
        self._dependes = dependes

    def GetPath(self):
        return self._path

    def GetDependes(self):
        return self._dependes

    def PathOfThis(self, path):
        if re.match('[a-z,A-Z,0-9,/,_,.]*' + path, self.GetPath()):
            return 1
        else:
            return 0

class FilesList:
    """Класс описывающий список зависимостей в нужном порядке"""
    _filesList = []

    def AddFile(self, file):
        if not(self.FileAdded(file)):
            if self.DependsOfFileResolved(file):
                self._filesList.append(file)

    def DependsOfFileResolved(self, file):
        dependsOfFileResolved = 0;

        if len(file.GetDependes()) == 0:
            return 1;

        for fileDepend in file.GetDependes():
            for addedFile in self._filesList:
                if (addedFile.PathOfThis(fileDepend)):
                    dependsOfFileResolved += 1

        if dependsOfFileResolved == len(file.GetDependes()):
            return 1
        else:
            return 0

    def FileAdded(self, file):
        if (self._filesList.count(file) != 0):
            return 1
        else:
            return 0

    def AddFiles(self, files):
        if len(files) == 0:
            return 0

        files.reverse();
        file = files.pop();
        files.reverse();
        self.AddFile(file)

        if(not(self.FileAdded(file))):
            files.insert(len(files), file)
            print('Dificulty with ' + file._path)

        if len(files) != 0:
            return self.AddFiles(files)

#Получаем список файлов
def getListOfFiles(dir, filesList):
    for fileName in os.listdir(dir):
        path = dir + '/' + fileName
        if os.path.isfile(path):
            f = open(path, 'r')
            dependes = re.findall("(?<=@requires\s)[a-z,A-Z,0-9,/,_]*.js", f.read())
            f.closed
            filesList.append(File(path,dependes))
        else:
            getListOfFiles(path,filesList)
    return filesList

filesList = getListOfFiles(currentPath, [])

filesWithoutDependes = []
filesWithDependes = []
for file in filesList:
    if len(file.GetDependes()) == 0:
        filesWithoutDependes.append(file)
    else:
        filesWithDependes.append(file)

#Обрабатывваем файлы
files = FilesList()
#Добавляем файлы без зависимостей
if len(filesWithoutDependes) != 0:
    files.AddFiles(filesWithoutDependes)

#Добавляем файлы с зависимостями
if len(filesWithDependes) != 0:
    files.AddFiles(filesWithDependes)

#Результат
for file in files._filesList:
    print(file.GetPath())

paramWithFilePaths = ''
for file in files._filesList:
    paramWithFilePaths += ' --js ' + file.GetPath()

cmd = 'java -jar ' + compilerPath + paramWithFilePaths +  ' --compilation_level ' + compilationLevel + ' --language_in ECMASCRIPT5 --js_output_file ' + fileName
print(cmd)
proc = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
out = proc.stdout.readlines()
print(out)