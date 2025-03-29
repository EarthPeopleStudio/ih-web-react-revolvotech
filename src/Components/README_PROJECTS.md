# Projects Component Guide

This file contains instructions on how to update the Projects component with your real project data.

## Adding Your Projects

The Projects component displays project cards in a grid layout with filtering by category. To add your real projects:

1. Open `src/Components/Projects.jsx`
2. Locate the `projectsData` array (around line 200)
3. Replace the dummy projects with your actual project data

## Project Data Structure

Each project should follow this structure:

```javascript
{
  id: 1, // Unique identifier
  title: "Project Title",
  description: "A brief description of the project",
  imageUrl: "path/to/image.jpg", // Can be local or remote URL
  tags: ["Tag1", "Tag2", "Tag3"], // Keywords related to the project
  category: "Art" // Must match one of the tab categories: "Art", "Design", "Apps", "Games"
}
```

## Image Options

### Option 1: Local Images in Project

1. Place your images in `src/assets/projects/`
2. Import them at the top of the file:
   ```javascript
   import projectImage1 from '../assets/projects/project1.jpg';
   ```
3. Use the imported variable in your project data:
   ```javascript
   imageUrl: projectImage1
   ```

### Option 2: Images from S3 or Other Remote Source

1. Upload your images to Amazon S3 or any other hosting service
2. Use the complete URL in your project data:
   ```javascript
   imageUrl: "https://your-bucket.s3.amazonaws.com/path/to/image.jpg"
   ```

## Adding New Categories

To add a new category:

1. Add a new Tab component in the `TabsContainer`:
   ```jsx
   <Tab 
     active={activeTab === "NewCategory"} 
     onClick={() => handleTabClick("NewCategory")}
   >
     New Category
   </Tab>
   ```

2. Make sure your project data includes the new category:
   ```javascript
   category: "NewCategory"
   ```

## Project Detail View (Future Enhancement)

The current implementation includes a `handleProjectClick` function that logs the clicked project to the console. This can be extended to:

1. Open a modal with project details
2. Navigate to a dedicated project page
3. Show an expanded view with more information

To implement these features, modify the `handleProjectClick` function according to your needs. 