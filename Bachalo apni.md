# 📁 JavaScript Filesystem Guide - Complete Tutorial

## Table of Contents
1. [Introduction to Filesystem in Node.js](#introduction)
2. [The `fs` Module](#fs-module)
3. [Reading Files](#reading-files)
4. [Writing Files](#writing-files)
5. [File Information & Stats](#file-stats)
6. [Working with Directories](#directories)
7. [File Operations](#file-operations)
8. [Streams for Large Files](#streams)
9. [Promises API (fs/promises)](#promises-api)
10. [Best Practices](#best-practices)

---

## Introduction to Filesystem in Node.js {#introduction}

The **filesystem (fs)** module in Node.js allows you to interact with the file system on your computer. You can:
- Read and write files
- Create, delete, and rename files/folders
- Watch for file changes
- Work with file streams

### Why Learn Filesystem?
- Build file-based applications (text editors, file managers)
- Process logs and data files
- Create backup systems
- Handle file uploads in web applications

---

## The `fs` Module {#fs-module}

### Importing the Module

```javascript
// CommonJS (traditional Node.js)
const fs = require('fs');

// ES6 Modules
import fs from 'fs';

// Promises-based API (recommended for modern code)
const fs = require('fs').promises;
// or
import { promises as fs } from 'fs';
```

### Three Flavors of fs

1. **Synchronous** - Blocks code execution (use sparingly)
2. **Asynchronous (Callback-based)** - Non-blocking, uses callbacks
3. **Promises-based** - Non-blocking, uses async/await (modern approach)

---

## Reading Files {#reading-files}

### 1. Synchronous Reading (Blocking)

```javascript
const fs = require('fs');

try {
    const data = fs.readFileSync('example.txt', 'utf8');
    console.log('File content:', data);
} catch (err) {
    console.error('Error reading file:', err);
}
```

**⚠️ Warning:** This blocks your entire program until the file is read!

### 2. Asynchronous Reading (Callback)

```javascript
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});

console.log('This runs before file is read!');
```

### 3. Promises-based Reading (Modern ✨)

```javascript
const fs = require('fs').promises;

async function readMyFile() {
    try {
        const data = await fs.readFile('example.txt', 'utf8');
        console.log('File content:', data);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

readMyFile();
```

### Reading Binary Files

```javascript
const fs = require('fs').promises;

async function readImage() {
    try {
        const buffer = await fs.readFile('image.png');
        console.log('File size:', buffer.length, 'bytes');
        // buffer contains raw binary data
    } catch (err) {
        console.error('Error:', err);
    }
}
```

---

## Writing Files {#writing-files}

### 1. Writing Text Files

```javascript
const fs = require('fs').promises;

async function writeFile() {
    try {
        await fs.writeFile('output.txt', 'Hello, World!', 'utf8');
        console.log('File written successfully!');
    } catch (err) {
        console.error('Error writing file:', err);
    }
}

writeFile();
```

### 2. Appending to Files

```javascript
const fs = require('fs').promises;

async function appendToFile() {
    try {
        await fs.appendFile('log.txt', '\nNew log entry', 'utf8');
        console.log('Content appended!');
    } catch (err) {
        console.error('Error:', err);
    }
}
```

### 3. Writing JSON Data

```javascript
const fs = require('fs').promises;

async function saveJSON() {
    const data = {
        name: 'John Doe',
        age: 30,
        hobbies: ['reading', 'coding', 'gaming']
    };

    try {
        await fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf8');
        console.log('JSON saved!');
    } catch (err) {
        console.error('Error:', err);
    }
}
```

### 4. Callback-based Writing

```javascript
const fs = require('fs');

fs.writeFile('test.txt', 'Content here', 'utf8', (err) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('File written!');
});
```

---

## File Information & Stats {#file-stats}

### Getting File Statistics

```javascript
const fs = require('fs').promises;

async function getFileInfo() {
    try {
        const stats = await fs.stat('example.txt');
        
        console.log('File Size:', stats.size, 'bytes');
        console.log('Is File:', stats.isFile());
        console.log('Is Directory:', stats.isDirectory());
        console.log('Created:', stats.birthtime);
        console.log('Modified:', stats.mtime);
        console.log('Accessed:', stats.atime);
    } catch (err) {
        console.error('Error:', err);
    }
}

getFileInfo();
```

### Checking if File Exists

```javascript
const fs = require('fs').promises;

async function fileExists(path) {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

// Usage
const exists = await fileExists('myfile.txt');
console.log('File exists:', exists);
```

---

## Working with Directories {#directories}

### 1. Creating Directories

```javascript
const fs = require('fs').promises;

async function createDirectory() {
    try {
        // Create single directory
        await fs.mkdir('myFolder');
        
        // Create nested directories
        await fs.mkdir('parent/child/grandchild', { recursive: true });
        
        console.log('Directories created!');
    } catch (err) {
        console.error('Error:', err);
    }
}
```

### 2. Reading Directory Contents

```javascript
const fs = require('fs').promises;

async function listFiles() {
    try {
        const files = await fs.readdir('.');
        console.log('Files in current directory:');
        files.forEach(file => console.log('  -', file));
    } catch (err) {
        console.error('Error:', err);
    }
}
```

### 3. Reading Directory with Details

```javascript
const fs = require('fs').promises;

async function listFilesDetailed() {
    try {
        const entries = await fs.readdir('.', { withFileTypes: true });
        
        for (const entry of entries) {
            const type = entry.isDirectory() ? 'DIR' : 'FILE';
            console.log(`[${type}] ${entry.name}`);
        }
    } catch (err) {
        console.error('Error:', err);
    }
}
```

### 4. Removing Directories

```javascript
const fs = require('fs').promises;

async function removeDirectory() {
    try {
        // Remove empty directory
        await fs.rmdir('emptyFolder');
        
        // Remove directory with contents (Node.js 14+)
        await fs.rm('folderWithFiles', { recursive: true, force: true });
        
        console.log('Directory removed!');
    } catch (err) {
        console.error('Error:', err);
    }
}
```

---

## File Operations {#file-operations}

### 1. Copying Files

```javascript
const fs = require('fs').promises;

async function copyFile() {
    try {
        await fs.copyFile('source.txt', 'destination.txt');
        console.log('File copied!');
    } catch (err) {
        console.error('Error:', err);
    }
}
```

### 2. Renaming/Moving Files

```javascript
const fs = require('fs').promises;

async function renameFile() {
    try {
        // Rename in same directory
        await fs.rename('oldname.txt', 'newname.txt');
        
        // Move to different directory
        await fs.rename('file.txt', 'folder/file.txt');
        
        console.log('File renamed/moved!');
    } catch (err) {
        console.error('Error:', err);
    }
}
```

### 3. Deleting Files

```javascript
const fs = require('fs').promises;

async function deleteFile() {
    try {
        await fs.unlink('unwanted.txt');
        console.log('File deleted!');
    } catch (err) {
        console.error('Error:', err);
    }
}
```

### 4. Watching Files for Changes

```javascript
const fs = require('fs');

// Watch a file
fs.watch('config.txt', (eventType, filename) => {
    console.log(`Event: ${eventType}`);
    console.log(`File: ${filename}`);
});

// Watch a directory
fs.watch('./myFolder', { recursive: true }, (eventType, filename) => {
    console.log(`${filename} was ${eventType}`);
});
```

---

## Streams for Large Files {#streams}

Streams are perfect for handling large files without loading everything into memory!

### 1. Reading with Streams

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('largefile.txt', 'utf8');

readStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk.length, 'bytes');
});

readStream.on('end', () => {
    console.log('Finished reading file!');
});

readStream.on('error', (err) => {
    console.error('Error:', err);
});
```

### 2. Writing with Streams

```javascript
const fs = require('fs');

const writeStream = fs.createWriteStream('output.txt', 'utf8');

writeStream.write('First line\n');
writeStream.write('Second line\n');
writeStream.write('Third line\n');

writeStream.end(() => {
    console.log('Finished writing!');
});
```

### 3. Piping Streams (Copy Large Files)

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('source.txt');
const writeStream = fs.createWriteStream('destination.txt');

// Pipe automatically handles backpressure
readStream.pipe(writeStream);

writeStream.on('finish', () => {
    console.log('File copied successfully!');
});
```

### 4. Transform Streams (Process Data)

```javascript
const fs = require('fs');
const { Transform } = require('stream');

// Create a transform stream that converts to uppercase
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

fs.createReadStream('input.txt')
    .pipe(upperCaseTransform)
    .pipe(fs.createWriteStream('output.txt'));
```

---

## Promises API (fs/promises) {#promises-api}

The modern way to work with filesystem using async/await!

### Complete Example

```javascript
const fs = require('fs').promises;
const path = require('path');

async function fileOperations() {
    try {
        // Create directory
        await fs.mkdir('testDir', { recursive: true });
        
        // Write file
        await fs.writeFile('testDir/data.txt', 'Hello World!');
        
        // Read file
        const content = await fs.readFile('testDir/data.txt', 'utf8');
        console.log('Content:', content);
        
        // Get file stats
        const stats = await fs.stat('testDir/data.txt');
        console.log('Size:', stats.size, 'bytes');
        
        // List directory
        const files = await fs.readdir('testDir');
        console.log('Files:', files);
        
        // Copy file
        await fs.copyFile('testDir/data.txt', 'testDir/backup.txt');
        
        // Rename file
        await fs.rename('testDir/backup.txt', 'testDir/backup-renamed.txt');
        
        // Delete file
        await fs.unlink('testDir/backup-renamed.txt');
        
        // Remove directory
        await fs.rmdir('testDir', { recursive: true });
        
        console.log('All operations completed!');
    } catch (err) {
        console.error('Error:', err);
    }
}

fileOperations();
```

---

## Best Practices {#best-practices}

### ✅ DO's

1. **Use Promises/Async-Await**
   ```javascript
   // ✅ Good
   const data = await fs.readFile('file.txt', 'utf8');
   
   // ❌ Avoid
   const data = fs.readFileSync('file.txt', 'utf8');
   ```

2. **Always Handle Errors**
   ```javascript
   try {
       await fs.readFile('file.txt', 'utf8');
   } catch (err) {
       console.error('Failed to read file:', err);
   }
   ```

3. **Use Path Module for Cross-Platform Compatibility**
   ```javascript
   const path = require('path');
   const filePath = path.join(__dirname, 'data', 'file.txt');
   ```

4. **Specify Encoding for Text Files**
   ```javascript
   await fs.readFile('file.txt', 'utf8'); // Returns string
   ```

5. **Use Streams for Large Files**
   ```javascript
   // For files > 100MB
   fs.createReadStream('large.log').pipe(writeStream);
   ```

### ❌ DON'Ts

1. **Don't Use Sync Methods in Production**
   - They block the entire event loop
   - Only use in CLI tools or startup scripts

2. **Don't Ignore Errors**
   ```javascript
   // ❌ Bad
   fs.readFile('file.txt', (err, data) => {
       console.log(data); // What if err exists?
   });
   ```

3. **Don't Hardcode Paths**
   ```javascript
   // ❌ Bad (Windows only)
   'C:\\Users\\file.txt'
   
   // ✅ Good (cross-platform)
   path.join(os.homedir(), 'file.txt')
   ```

### 🔒 Security Tips

1. **Validate User Input**
   ```javascript
   const path = require('path');
   
   function safeReadFile(userInput) {
       // Prevent directory traversal attacks
       const safePath = path.normalize(userInput).replace(/^(\.\.(\/|\\|$))+/, '');
       return fs.readFile(safePath, 'utf8');
   }
   ```

2. **Set Proper File Permissions**
   ```javascript
   await fs.writeFile('secret.txt', data, { mode: 0o600 }); // Owner only
   ```

3. **Don't Trust File Extensions**
   ```javascript
   // Verify file content, not just extension
   const fileType = await import('file-type');
   const type = await fileType.fromFile('upload.jpg');
   ```

---

## 🎯 Practical Examples

### Example 1: Simple Logger

```javascript
const fs = require('fs').promises;
const path = require('path');

class Logger {
    constructor(logFile) {
        this.logFile = logFile;
    }
    
    async log(message) {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${message}\n`;
        
        try {
            await fs.appendFile(this.logFile, logEntry, 'utf8');
        } catch (err) {
            console.error('Failed to write log:', err);
        }
    }
}

// Usage
const logger = new Logger('app.log');
await logger.log('Application started');
await logger.log('User logged in');
```

### Example 2: File Backup System

```javascript
const fs = require('fs').promises;
const path = require('path');

async function backupFile(filePath) {
    try {
        const timestamp = Date.now();
        const ext = path.extname(filePath);
        const base = path.basename(filePath, ext);
        const dir = path.dirname(filePath);
        
        const backupPath = path.join(dir, `${base}.${timestamp}${ext}`);
        
        await fs.copyFile(filePath, backupPath);
        console.log(`Backup created: ${backupPath}`);
    } catch (err) {
        console.error('Backup failed:', err);
    }
}

// Usage
await backupFile('important.txt');
```

### Example 3: Directory Tree

```javascript
const fs = require('fs').promises;
const path = require('path');

async function printTree(dir, prefix = '') {
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            const isLast = i === entries.length - 1;
            const connector = isLast ? '└── ' : '├── ';
            
            console.log(prefix + connector + entry.name);
            
            if (entry.isDirectory()) {
                const newPrefix = prefix + (isLast ? '    ' : '│   ');
                await printTree(path.join(dir, entry.name), newPrefix);
            }
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

// Usage
await printTree('.');
```

---

## 📚 Summary

| Operation | Sync | Async (Callback) | Async (Promise) |
|-----------|------|------------------|-----------------|
| Read File | `readFileSync()` | `readFile()` | `fs.promises.readFile()` |
| Write File | `writeFileSync()` | `writeFile()` | `fs.promises.writeFile()` |
| Append | `appendFileSync()` | `appendFile()` | `fs.promises.appendFile()` |
| Delete | `unlinkSync()` | `unlink()` | `fs.promises.unlink()` |
| Copy | `copyFileSync()` | `copyFile()` | `fs.promises.copyFile()` |
| Rename | `renameSync()` | `rename()` | `fs.promises.rename()` |
| Mkdir | `mkdirSync()` | `mkdir()` | `fs.promises.mkdir()` |
| Readdir | `readdirSync()` | `readdir()` | `fs.promises.readdir()` |
| Stats | `statSync()` | `stat()` | `fs.promises.stat()` |

---

## 🚀 Next Steps

1. Practice with small examples
2. Build a file-based TODO app
3. Create a log analyzer
4. Experiment with streams for large files
5. Learn about `path` module for better file path handling

---

**Happy Coding! 🎉**

Remember: The filesystem is powerful but also dangerous. Always validate inputs and handle errors properly!
