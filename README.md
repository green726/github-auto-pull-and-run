# github-auto-pull-and-run
### Description:
Automatically pull github code and run a file from it every time a change is made on github. 

#### Why would you use this?
This tool, combined with the github or vscode web editors, allows for no-cost browser development(when combined with something to host your code).
Example: You only have access to web browser, and have a website running off a node.js server on a computer, using this tool. You can use the github web editor to write code, push it to a github repository, and this tool will automatically pull your latest changes from the repository, and restart you node.js server. 

### Instructions:
1. Setup the tool in the config.json file
  Here you can put in the repository to clone, the language to run, as well as the file you wish to run
2. Sign into your github account through git(if not already done)
3. Install Node.js(if not already done) || __this is required regardless of what language you wish to run__
4. Install the run and/or compile tools for the language you wish to run(example: install python3 for python)
5. configure github for post requests to the port you specified(for github listening) in the config.json file
  If not already done, configure your router for port forwarding
6. Run the run.bat file to run your code
7. Done!

##### Thanks for using and/or contributing to this tool!

#### Current language support:
Only support for running js files with node.js exists

#### Planned language support:
Java |
C++ |
Python |
TypeScript |
C#

#### In progress:
Java |
Python |
C++ 
