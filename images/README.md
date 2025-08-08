# Image Organization Structure

This directory contains all website images organized by category for better maintainability.

## Directory Structure

```
images/
├── backgrounds/     # Hero and background images
├── logos/          # Company and partner logos
├── team/           # Team member headshots
├── content/        # General content images
└── brand/          # WOW brand assets
```

## Image Categories

### `backgrounds/`
- Hero section background images
- Page background images
- Used in CSS `background-image` properties

### `logos/`
- Company partner logos (Goldman Sachs, PIMCO, etc.)
- Financial institution logos
- Used in network/partners section

### `team/`
- Team member headshots
- Leadership photos
- Used in leadership/about pages

### `content/`
- General content images
- Screenshots and documentation
- Event photos and general imagery

### `brand/`
- WOW logo variations
- Brand assets and graphics
- Used for branding and identity

## Benefits of This Structure

1. **Easy Navigation**: Images are logically grouped by purpose
2. **Quick Updates**: Find and replace images quickly
3. **Better Organization**: Clear separation of concerns
4. **Future-Proof**: Easy to add new images in appropriate categories
5. **Reduced File Size**: No duplicate nested directories

## Adding New Images

When adding new images:
1. Place them in the appropriate category directory
2. Use descriptive filenames
3. Optimize images for web (compress if needed)
4. Update HTML references to use the new path structure

## Migration Notes

- All old `uploads/1/4/9/1/149148346/` paths have been updated
- Original Weebly structure has been preserved in backups
- All functionality remains intact 