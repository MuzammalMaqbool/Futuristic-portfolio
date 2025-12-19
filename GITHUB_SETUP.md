# GitHub Repository Setup Guide

## GitHub Desktop se Repository Create karein

### Method 1: GitHub Desktop se (Easiest)

1. **GitHub Desktop kholen**
   - GitHub Desktop application open karein

2. **Repository Add karein**
   - File → Add Local Repository
   - Ya "Add" button click karein
   - Folder select karein: `C:\Users\Shaheen Computer\Desktop\Azam Malik`
   - "Add repository" click karein

3. **GitHub par Repository Create karein**
   - GitHub Desktop mein "Publish repository" button dikhega
   - Ya Repository → Publish repository
   - Repository name: `azam-malik-portfolio` (ya apna preferred name)
   - Description: "Futuristic portfolio website for Azam Malik"
   - "Keep this code private" uncheck karein (agar public chahiye)
   - "Publish repository" click karein

4. **Done!** 
   - Code automatically GitHub par push ho jayega

### Method 2: Terminal Commands se

Agar GitHub Desktop se nahi karna, toh ye commands run karein:

```bash
# Project folder mein jayein
cd "c:\Users\Shaheen Computer\Desktop\Azam Malik"

# GitHub repository URL add karein (apna username use karein)
git remote add origin https://github.com/YOUR_USERNAME/azam-malik-portfolio.git

# Branch name set karein
git branch -M main

# Code push karein
git push -u origin main
```

## Important Notes

- ✅ Git repository already initialized hai
- ✅ Initial commit already create ho chuka hai
- ✅ .gitignore file ready hai
- ✅ README.md file ready hai

## Next Steps

1. GitHub Desktop open karein
2. Local repository add karein
3. Publish repository button click karein
4. Repository name enter karein
5. Publish karein!

---

**Note:** Agar koi issue aaye ya help chahiye, bata dein!
