#!/usr/bin/env node
const { readFile, writeFile } = require('fs/promises');
const path = require('path');

const readFileAsync = (filePath) => {
  return new Promise((resolve, reject) => {
    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        if (err.code == "ENOENT") {
          reject("File doesn't exist.");
        } else {
          reject("Couldn't read the file.");
        }
        return;
      }
      resolve(data);
    });
  });
}

const writeFileAsync = (filePath, content) => {
  return new Promise((resolve, reject) => {
    writeFile(filePath, content, 'utf8', (err) => {
      if (err) {
        reject("Couldn't write on the file.");
        return;
      }
      resolve();
    });
  });
};

// const processFiles = async (filesList) => {
//   try {
//     const fileContents = await Promise.all(
//       filesList.map(path => {console.log(path);readFileAsync(path)})
//     );

//     const processContent = fileContents.map((content, index) => {
//       const inputPath = filesList[index];

//       const timeStamp = new Date().toLocaleString();
//       const modifiedContent = `----------- Modified Content -----------\nProcessed on: ${timeStamp}\n\n${content.toUpperCase()}`;

//       const outputPath = inputPath.replace(/(\.[\w\d_-]+)$/i, '.processed$1');
      
//       return writeFileAsync(outputPath, modifiedContent);
//     });

//     await Promise.all(processContent);
//     console.log("Finished writing on all the files. Have a nice day.");
//   } catch(error) {
//     console.error(error);
//   }
// };

const processFiles = async (relativePaths) => {
  console.log('\n--- Starting Batch File Processing ---');
  try {
    // 1. Create full, absolute paths for each file. This prevents pathing issues.
    const absolutePaths = relativePaths.map(p => path.resolve(__dirname, p));

    // 2. Read all files concurrently.
    // The imported `readFile` function directly returns a promise.
    // We pass 'utf8' to get the content as a string instead of a raw buffer.
    const fileReadPromises = absolutePaths.map(p => readFile(p, 'utf8'));
    const fileContents = await Promise.all(fileReadPromises);
    console.log('-> Successfully read all input files.');

    // 3. Manipulate the content and prepare write operations.
    const fileWritePromises = fileContents.map((content, index) => {
      const inputPath = absolutePaths[index];

      // Manipulation logic: Convert to uppercase and add a timestamp.
      const timestamp = new Date().toLocaleString();
      const modifiedContent = `--- MODIFIED CONTENT ---\nProcessed on: ${timestamp}\n\n${content.toUpperCase()}`;

      // Create a new output file name (e.g., 'example.txt' -> 'example.processed.txt').
      const outputPath = inputPath.replace(/(\.[\w\d_-]+)$/i, '.processed$1');

      // The imported `writeFile` also returns a promise.
      return writeFile(outputPath, modifiedContent);
    });

    // 4. Write all modified files concurrently.
    await Promise.all(fileWritePromises);

    console.log('-> Successfully wrote all processed files.');
    console.log('--- Batch File Processing Complete ---\n');

  } catch (error) {
    console.error('\n--- An error occurred during file processing ---');
    // Provide a more helpful error message for file-not-found errors.
    if (error.code === 'ENOENT') {
        console.error(`Error: File not found. Please ensure the path "${error.path}" is correct.`);
    } else {
        console.error(error);
    }
    console.error('------------------------------------------------');
  }
};


(async () => {
  const existingFiles = ['./files/tiny_document.txt', './files/short_story_draft.md', './files/project_analysis.txt', './files/data_log.csv', './files/test.txt'];
  await processFiles(existingFiles);

  const nonExistingFiles = ['./files/index.html', './files/styles.css', './files/app.js', './files/logo.svg', './files/README.md'];
  await processFiles(nonExistingFiles);
})();

// readFileAsync('test.txt')
//   .then( content => {
//     console.log(content);
//   })
//   .catch( error => {
//     console.error(error);
//   });

  // writeFileAsync('test.txt', "This is the second writing round.")
  //   .then(content => {
  //     console.log(content);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });