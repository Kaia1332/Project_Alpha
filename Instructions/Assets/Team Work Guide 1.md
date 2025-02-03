# Team Work Guide

## Common Commands
* See branches: `git branch`
* See remote branches: `git branch -r`
* Create new branch: `git branch <branch-name>`
  * Note: You won’t be able to do this without content and a commit. 
* Switch branches: `git switch <branch-name>`
* Create and switch branches: `git switch -c <branch-name>`
* See changes: `git status` 

## On Local Repository
1. Change `master` to `main`: `git branch -m main`
2. Create `development` branch: 

## On GitHub
1. Create the repo on GitHub 
   * Either through the the **gh CLI** or create the remote on GitHub. 
2. Then online, in the settings section go to **collaborators** and add the project partners. 


## In Terminal
### FEATURE
1. Create a new feature branch to work on using the command:

`git branch <name-of-feature>`
Replace `<name-of-feature>` with the actual name of your feature.  This will copy over the code from development, and switch you to that branch. 

2. When you are finished working on your feature, add and commit your changes. 

### DEVELOPMENT
3. Switch to development using the command:
`git switch development`

**Possible scenario**
Pull from the development branch on GitHub to get any new changes from your group using:
`git pull origin development`

### FEATURE
4. Switch to your feature branch using:`git switch <name-of-feature>`

Merge any new code from development onto the feature branch using:
`git merge development`

Fix  any merge conflicts, test your code and add the commit again.

### DEVELOPMENT
5. Switch back to development using the command:

`git swtich development`
Merge your feature branch code onto development using:
`git merge <name-of-feature>`

**Possible scenario**
Delete the **feature branch if no longer needed**: `git branch -d <name-of-old-feature>`

6. Push your code to the development branch of GitHub using:
`git push origin development`

- - -
NOTE: From here you can start the process over from step 1. Or if you’ve finished your project continue to step 7.
- - -

### MAIN
7. Once you are ready to merge to main, the Git Main should switch to main using:

`git switch main`
And then merge the code from development by doing:
`git merge development`

8. From here you can push to GitHub:

`git push origin main`

#Git_&_GitHub/Collaboration/Team_Work_Guide